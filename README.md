# Sumbu Resona ($RSNX) — Homepage

The official public home of the **RSNX / Sumbu Resona** ecosystem.

Live site: **https://sumbu-resona.pages.dev**

Source: **https://github.com/farkhanmaul/sumbu-resona**

## Features

- Landing page: hero, about, vision, roadmap, official links
- **RSNX Cards** (`#/cards`): enter a GitHub username, an RSNX agent (Command
  Code CLI, headless) rates the public profile into a level + score, streams
  its live thinking into the page, and a shareable 3D card is minted at
  `/card/:handle`.

## Architecture

Everything public runs on Cloudflare's free tier:

- **Cloudflare Pages** — React frontend
- **Cloudflare Pages Functions** — API (`/api/cards`, `/api/jobs`, ...) +
  KV storage (`RSNX_CARDS`)
- **Local scorebot** (`scripts/scorebot.js`) — polls `/api/jobs`, runs the
  Command Code CLI headless (`-p`) with the free `laguna-s-2.1-free` model on
  your Go plan, streams its output to the card log, then posts the result back.

The scorebot is the only non-Cloudflare piece: it must run on a machine with
the Command Code CLI installed (this dev machine, or a small always-on box).
Cloudflare Functions never calls the LLM itself.

## Development

```bash
npm install
npm run dev          # frontend only
```

To run the Functions locally with KV, use:

```bash
npx wrangler pages dev dist --binding RSNX_CARDS=<id>
```

Local env for the scorebot lives in `.wrangler/scorebot.env` (gitignored):

```
SCORE_SECRET=your-score-secret
```

## Scorebot

```bash
# one-shot (processes currently pending cards)
RSNX_BASE=https://sumbu-resona.pages.dev SCORE_SECRET=... ONCE=1 node scripts/scorebot.js

# continuous (poll every 20s)
RSNX_BASE=https://sumbu-resona.pages.dev SCORE_SECRET=... node scripts/scorebot.js
```

Env vars:

- `RSNX_BASE` — API base URL (default `http://127.0.0.1:8788`)
- `SCORE_SECRET` — required; must match the Cloudflare secret of the same name
- `MODEL` — CLI model (default `laguna-s-2.1-free`, free on every plan)
- `CMDC` — command override (default `npx command-code`)
- `POLL_MS` — poll interval (default 20000)
- `ONCE` — exit after processing the current batch

## Build

```bash
npm run build
```

Output is written to `dist/` (frontend) plus `functions/` (Pages Functions).

## Deploy to Cloudflare Pages

```bash
npm run build
npx wrangler pages deploy dist --project-name sumbu-resona
```

Secrets are set in the Cloudflare dashboard (Workers & Pages → sumbu-resona →
Settings → Variables and Secrets):

- `SCORE_SECRET` — required, must match the scorebot's local value
- `GITHUB_TOKEN` — optional, raises GitHub API rate limits

## AI Scoring

Scoring uses the Command Code CLI in headless mode on the free
`laguna-s-2.1-free` model (available on every plan including Go). The prompt
rates a GitHub profile into one of four levels — `pro`, `intermediate`,
`mid`, `beginner` — with a 0-100 score and a one-sentence reason. A data
honesty rule prevents fabricated claims: absent fields are never reported as
zero. If the LLM fails, a deterministic heuristic fills in.

## Notes

- No backend VM, no database server — the public API runs on Cloudflare's free tier.
- No OAuth required: GitHub data is read from the public API.
- Cards are stored in KV: `cards:{id}`, `card:{handle}`, and `cards:{id}:log`.
