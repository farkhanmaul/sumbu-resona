// GET /api/cards/:id — polling endpoint; returns card state.

import { getCard, cardView } from '../../_shared/store.js'

export async function onRequestGet(context) {
  const { env, params } = context
  const card = await getCard(env, params.id)
  if (!card) {
    return Response.json({ error: 'Card not found' }, { status: 404 })
  }
  return Response.json(cardView(card))
}
