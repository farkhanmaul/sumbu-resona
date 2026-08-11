// GET /api/cards/:id/log — live scoring log for the card (public).
// POST /api/cards/:id/log — scorebot appends a line (SCORE_SECRET).

import { getCard, getLog, appendLog } from '../../../_shared/store.js'

export async function onRequestGet(context) {
  const { env, params } = context
  const card = await getCard(env, params.id)
  if (!card) {
    return Response.json({ error: 'Card not found' }, { status: 404 })
  }
  const log = await getLog(env, params.id)
  return Response.json({ id: params.id, status: card.status, log })
}

export async function onRequestPost(context) {
  const { env, params, request } = context
  const h = request.headers.get('authorization') || ''
  const expected = env.SCORE_SECRET
  if (!expected || h !== `Bearer ${expected}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  let body = {}
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }
  const line = String(body.line || '').slice(0, 200)
  if (!line) return Response.json({ ok: true })
  await appendLog(env, params.id, line)
  return Response.json({ ok: true })
}
