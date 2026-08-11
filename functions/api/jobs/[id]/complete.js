// POST /api/jobs/:id/complete — scorebot posts the AI result back (SCORE_SECRET).

import { getCard, saveCard, cardView } from '../../../_shared/store.js'

function auth(context) {
  const { request, env } = context
  const h = request.headers.get('authorization') || ''
  const expected = env.SCORE_SECRET
  return !!expected && h === `Bearer ${expected}`
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
    card.level = ['pro', 'intermediate', 'mid', 'beginner'].includes(body.level)
      ? body.level
      : body.tier && ['pro', 'intermediate', 'mid', 'beginner'].includes(body.tier)
        ? body.tier
        : undefined
    card.tier = card.level
    card.breakdown = {
      contribution: Number(body.breakdown?.contribution) || 0,
      community: Number(body.breakdown?.community) || 0,
      reputation: Number(body.breakdown?.reputation) || 0,
      diversity: Number(body.breakdown?.diversity) || 0,
      credibility: Number(body.breakdown?.credibility) || 0,
    }
    card.reasoning = String(body.reason || body.reasoning || '').slice(0, 400)
    card.model = String(body.model || '').slice(0, 100)
    card.scored_at = new Date().toISOString()
  }
  await saveCard(env, card)
  return Response.json(cardView(card))
}
