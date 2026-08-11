// GET /api/jobs — pending cards waiting to be scored (for the local scorebot).
// POST /api/jobs/:id/complete — scorebot posts the AI result back (SCORE_SECRET).

import { getCard, saveCard, cardView } from '../../_shared/store.js'

function auth(context) {
  const { request, env } = context
  const h = request.headers.get('authorization') || ''
  const expected = env.SCORE_SECRET
  return !!expected && h === `Bearer ${expected}`
}

export async function onRequestGet(context) {
  const { env } = context
  const list = await env.RSNX_CARDS.list({ prefix: 'cards:' })
  const keys = list.keys
  const cards = []
  for (const k of keys) {
    try {
      const card = JSON.parse(await env.RSNX_CARDS.get(k.name))
      if (card && card.status === 'pending') {
        cards.push({
          id: card.id,
          username: card.username,
          profile: card.profile,
          created_at: card.created_at,
        })
      }
    } catch {
      /* skip malformed */
    }
  }
  cards.sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
  return Response.json({ jobs: cards.slice(0, 50) })
}

export async function onRequestPost(context) {
  const { env, params } = context
  if (!auth(context)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const card = await getCard(env, params.id)
  if (!card) return Response.json({ error: 'Card not found' }, { status: 404 })

  let body = {}
  try {
    body = await context.request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  if (body.status === 'failed') {
    card.status = 'failed'
    card.error = String(body.error || 'Scoring failed').slice(0, 500)
  } else {
    const score = Math.max(0, Math.min(100, Math.round(Number(body.score) || 0)))
    card.status = 'ready'
    card.score = score
    card.tier = ['whale', 'builder', 'explorer', 'noise'].includes(body.tier)
      ? body.tier
      : undefined
    card.breakdown = {
      contribution: Number(body.breakdown?.contribution) || 0,
      community: Number(body.breakdown?.community) || 0,
      reputation: Number(body.breakdown?.reputation) || 0,
      diversity: Number(body.breakdown?.diversity) || 0,
      credibility: Number(body.breakdown?.credibility) || 0,
    }
    card.reasoning = String(body.reasoning || '').slice(0, 600)
    card.model = String(body.model || '').slice(0, 100)
    card.scored_at = new Date().toISOString()
  }
  await saveCard(env, card)
  return Response.json(cardView(card))
}
