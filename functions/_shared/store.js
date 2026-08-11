// Storage helpers — Cloudflare KV binding: RSNX_CARDS
// Keys: cards:{id} -> card record, card:{handle} -> id, meta:count -> int

const CARD_KEY = (id) => `cards:${id}`
const HANDLE_KEY = (handle) => `card:${handle}`

export function makeId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

export async function saveCard(env, card) {
  await env.RSNX_CARDS.put(CARD_KEY(card.id), JSON.stringify(card))
  if (card.handle) await env.RSNX_CARDS.put(HANDLE_KEY(card.handle.toLowerCase()), card.id)
}

export async function getCard(env, id) {
  const raw = await env.RSNX_CARDS.get(CARD_KEY(id))
  return raw ? JSON.parse(raw) : null
}

export async function getIdByHandle(env, handle) {
  return env.RSNX_CARDS.get(HANDLE_KEY(handle.toLowerCase()))
}

export async function getCardByHandle(env, handle) {
  const id = await getIdByHandle(env, handle)
  if (!id) return null
  return getCard(env, id)
}

export async function bumpCount(env) {
  try {
    const raw = (await env.RSNX_CARDS.get('meta:count')) || '0'
    await env.RSNX_CARDS.put('meta:count', String(parseInt(raw, 10) + 1))
  } catch {
    /* best effort */
  }
}

// Append a live log line to a card's progress log (KV: cards:{id}:log).
export async function appendLog(env, id, line) {
  try {
    const key = `cards:${id}:log`
    const prev = (await env.RSNX_CARDS.get(key)) || ''
    const next = (prev + line + '\n').slice(-4000) // keep bounded
    await env.RSNX_CARDS.put(key, next)
  } catch {
    /* best effort */
  }
}

export async function getLog(env, id) {
  const key = `cards:${id}:log`
  const raw = (await env.RSNX_CARDS.get(key)) || ''
  return raw.split('\n').filter(Boolean)
}

export function cardView(card) {
  if (!card) return null
  return {
    id: card.id,
    handle: card.handle,
    status: card.status,
    username: card.username,
    name: card.name,
    avatar_url: card.avatar_url,
    score: card.score ?? null,
    tier: card.tier ?? null,
    level: card.level ?? null,
    breakdown: card.breakdown ?? null,
    reasoning: card.reasoning ?? null,
    model: card.model ?? null,
    error: card.error ?? null,
    createdAt: card.created_at,
  }
}
