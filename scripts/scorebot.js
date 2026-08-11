// scorebot.js — local worker that scores pending RSNX cards using the
// Command Code CLI in headless mode (cmdc -p). Polls the Cloudflare API,
// spawns the CLI with the free laguna-s-2.1-free model, posts results back.
//
// Requires env:
//   RSNX_BASE   — e.g. https://sumbu-resona.pages.dev
//   SCORE_SECRET — same value as the Cloudflare secret
//   CMDC        — optional path to cmdc (default: "cmdc" on PATH)
//   MODEL       — optional model override (default laguna-s-2.1-free)
//
// Usage: node scripts/scorebot.js   (runs forever, polls every 20s)

import { spawn } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { SCORING_SYSTEM, userMessage, extractJson, normalize, fallbackScore } from '../functions/_shared/scoring.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

const BASE = process.env.RSNX_BASE || 'http://127.0.0.1:8788'
const SECRET = process.env.SCORE_SECRET
// Use npx with the local install (shell:true handles the .cmd shim on Windows).
const CMDC = process.env.CMDC || 'npx command-code'
const MODEL = process.env.MODEL || 'laguna-s-2.1-free'
const POLL_MS = parseInt(process.env.POLL_MS || '20000', 10)
const MAX_TURNS = parseInt(process.env.MAX_TURNS || '2', 10)

if (!SECRET) {
  console.error('SCORE_SECRET env required')
  process.exit(1)
}

function authHeaders() {
  return { Authorization: `Bearer ${SECRET}`, 'Content-Type': 'application/json' }
}

async function fetchJobs() {
  const res = await fetch(`${BASE}/api/jobs`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`GET /api/jobs ${res.status}`)
  const data = await res.json()
  return data.jobs || []
}

async function postResult(id, payload) {
  const res = await fetch(`${BASE}/api/jobs/${id}/complete`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`POST complete ${res.status}`)
}

// Serial log queue — avoids firing hundreds of parallel fetch calls.
let logQueue = Promise.resolve()
async function postLog(id, line) {
  logQueue = logQueue.then(async () => {
    try {
      await fetch(`${BASE}/api/cards/${id}/log`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ line }),
      })
    } catch {
      /* log is best-effort */
    }
  })
  return logQueue
}

// Run the CLI headless with the prompt piped via stdin (immune to shell quoting).
// Streams each NDJSON event line to the card log as it arrives.
function runCmd(promptText, onLine) {
  return new Promise((resolve) => {
    const args = ['-p', '--skip-onboarding', '--no-session', '-m', MODEL, '--max-turns', String(MAX_TURNS), '--output-format', 'json']
    const isWin = process.platform === 'win32'
    // On Windows, route through cmd so npx/command-code.cmd resolves; the
    // prompt arrives over stdin so no argument quoting is ever involved.
    const child = isWin
      ? spawn('cmd', ['/c', `${CMDC} ${args.join(' ')}`], {
          cwd: root,
          env: { ...process.env },
          stdio: ['pipe', 'pipe', 'pipe'],
        })
      : spawn(CMDC, args, {
          cwd: root,
          env: { ...process.env },
          stdio: ['pipe', 'pipe', 'pipe'],
        })
    let out = ''
    let errOut = ''
    let buf = ''
    child.stdout.on('data', (d) => {
      out += d
      buf += d.toString()
      const lines = buf.split('\n')
      buf = lines.pop() || ''
      for (const line of lines) {
        if (line.trim() && onLine) onLine(line.trim())
      }
    })
    child.stderr.on('data', (d) => (errOut += d))
    child.on('error', (e) => {
      console.error('[cmdc spawn error]', e.message)
      resolve(null)
    })
    child.on('close', (code) => {
      if (code !== 0) {
        console.error(`[cmdc exited ${code}]`, errOut.slice(-500))
        resolve(null)
        return
      }
      // NDJSON: last line is the result
      const lines = out.split('\n').filter(Boolean)
      const last = lines[lines.length - 1]
      try {
        const parsed = JSON.parse(last)
        resolve(parsed.finalText || '')
      } catch {
        resolve(out)
      }
    })
    child.stdin.write(promptText)
    child.stdin.end()
  })
}

async function processJob(job) {
  await postLog(job.id, `Scoring @${job.username} with ${MODEL}…`)
  const prompt = `You are the RSNX profile rater.\n\nSYSTEM:\n${SCORING_SYSTEM}\n\nUSER:\n${userMessage(job.profile)}\n\nRespond with the JSON result only.`
  // Replace double quotes so the prompt survives Windows shell quoting.
  const safePrompt = prompt.replace(/"/g, "'")
  let deltaBuf = ''
  const text = await runCmd(safePrompt, (line) => {
    // Stream model thinking/status to the card log so the UI stays alive.
    try {
      const ev = JSON.parse(line)
      const t = ev.event?.type || ev.type
      if (t === 'model_request_start') postLog(job.id, `Model started: ${ev.event?.model || ''}`)
      else if (t === 'text_delta') deltaBuf += ev.event?.delta || ''
      else if (t === 'message_end') {
        if (deltaBuf.trim()) {
          postLog(job.id, `→ ${deltaBuf.trim().slice(0, 400)}`)
          deltaBuf = ''
        }
      } else if (ev.type === 'result') postLog(job.id, `Done in ${ev.durationMs ? Math.round(ev.durationMs / 1000) + 's' : ''}`)
    } catch {
      /* not JSON — skip */
    }
  })
  if (!text) {
    await postResult(job.id, { status: 'failed', error: 'cmdc returned nothing' })
    return
  }
  const parsed = extractJson(text)
  if (!parsed) {
    // CLI may return prose — try fallback rather than failing the user's card.
    const fb = fallbackScore(job.profile)
    await postLog(job.id, `LLM returned no JSON — using heuristic fallback.`)
    await postResult(job.id, { ...fb, model: 'heuristic' })
    return
  }
  const result = normalize(parsed, job.profile)
  await postResult(job.id, { ...result, model: MODEL })
  console.log(`[score] ${job.username} -> ${result.score}/100 (${result.tier})`)
}

async function tick() {
  try {
    const jobs = await fetchJobs()
    for (const job of jobs) {
      await processJob(job)
    }
  } catch (e) {
    console.error('[scorebot error]', e.message)
  }
}

async function main() {
  console.log(`RSNX scorebot started — ${BASE} · model ${MODEL} · poll ${POLL_MS}ms`)
  if (process.env.ONCE) {
    await tick()
    return
  }
  // eslint-disable-next-line no-constant-condition
  while (true) {
    await tick()
    await new Promise((r) => setTimeout(r, POLL_MS))
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
