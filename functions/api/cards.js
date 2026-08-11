// POST /api/cards — create a card for a GitHub username
// Fetches the public profile, saves a pending card. A local scorebot
// (CLI Command Code) picks it up from /api/jobs and posts the score back.

import { fetchGitHubProfile } from '../_shared/github.js'
import { saveCard, makeId, bumpCount, cardView } from '../_shared/store.js'

export async function onRequestPost(context) {
  const { request, env } = context

  let body = {}
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const raw = String(body.username || '').trim().replace(/^@/, '')
  if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37})$/.test(raw)) {
    return Response.json({ error: 'Invalid GitHub username' }, { status: 400 })
  }
  const username = raw.toLowerCase()

  // Reuse an existing card for the same handle if present.
  const existingId = await env.RSNX_CARDS.get(`card:${username}`)
  if (existingId) {
    const existing = await env.RSNX_CARDS.get(`cards:${existingId}`)
    if (existing) {
      const card = JSON.parse(existing)
      return Response.json({ id: card.id, status: card.status, existing: true })
    }
  }

  let profile
  try {
    profile = await fetchGitHubProfile(username, env)
  } catch (err) {
    return Response.json({ error: `GitHub fetch failed: ${err.message}` }, { status: 502 })
  }
  if (!profile) {
    return Response.json({ error: 'GitHub user not found' }, { status: 404 })
  }

  const id = makeId()
  const card = {
    id,
    handle: username,
    username: profile.username,
    name: profile.name,
    avatar_url: profile.avatar_url,
    profile,
    status: 'pending',
    score: null,
    tier: null,
    breakdown: null,
    reasoning: null,
    model: null,
    created_at: new Date().toISOString(),
  }
  await saveCard(env, card)
  await bumpCount(env)

  return Response.json(cardView(card))
}
