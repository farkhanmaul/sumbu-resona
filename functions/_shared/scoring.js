// Shared scoring logic: prompt + normalization + heuristic fallback.
// Used by both the CLI scorebot (scripts/scorebot.js) and any server path.

export const SCORING_SYSTEM = `You are a quick profile rater for Sumbu Resona (RSNX), an open ecosystem project.

Look at this GitHub profile and rate the developer's overall level, simply:
- pro: clearly professional/expert — major projects, huge reach, long track record
- intermediate: solid experience — real projects, steady activity, some reach
- mid: getting there — some projects or activity, building experience
- beginner: early stage — few signals, just starting out

Be honest: only use what is in the profile. If something is missing, do not assume it is zero. Never invent numbers.

Return JSON only:
{
  "level": "pro" | "intermediate" | "mid" | "beginner",
  "score": <0-100>,
  "reason": "<one short sentence>"
}`

export function userMessage(profile) {
  return `Rate this GitHub profile:\n\n${JSON.stringify(compactProfile(profile), null, 2)}`
}

// Keep the prompt small — long JSON eats the free model's continuation budget.
export function compactProfile(p) {
  return {
    username: p.username,
    name: p.name,
    bio: p.bio,
    location: p.location,
    blog: p.blog,
    followers: p.followers,
    following: p.following,
    public_repos: p.public_repos,
    created_at: p.created_at,
    total_stars: p.total_stars,
    languages: (p.languages || []).slice(0, 8),
    recent_repos: (p.recent_repos || []).slice(0, 5).map((r) => ({
      name: r.name,
      description: (r.description || '').slice(0, 120),
      language: r.language,
      stars: r.stars,
      pushed_at: r.pushed_at,
      archived: r.archived,
    })),
  }
}

export function tierFor(score) {
  if (score >= 85) return 'pro'
  if (score >= 65) return 'intermediate'
  if (score >= 40) return 'mid'
  return 'beginner'
}

const LEVEL_SCORE = { pro: 90, intermediate: 72, mid: 50, beginner: 25 }

export function fallbackScore(profile) {
  const repos = (profile.recent_repos || []).filter((r) => !r.archived).length
  const followers = profile.followers || 0
  const stars = profile.total_stars || 0
  const langs = (profile.languages || []).length

  let score = 0
  score += Math.min(30, repos * 3)
  score += Math.min(25, followers / 2000)
  score += Math.min(25, stars / 500)
  score += Math.min(10, langs * 2)
  if (profile.bio) score += 5
  if (profile.created_at) score += 5
  score = Math.round(Math.min(100, score))

  return {
    score,
    tier: tierFor(score),
    breakdown: {
      contribution: Math.min(20, Math.round(repos * 1.5)),
      community: Math.min(20, Math.round(followers / 2500)),
      reputation: Math.min(20, Math.round(stars / 700)),
      diversity: Math.min(20, Math.round(langs * 2.5)),
      credibility: Math.min(20, (profile.bio ? 10 : 0) + (profile.location ? 6 : 0) + (profile.blog ? 4 : 0)),
    },
    reasoning: 'Fallback heuristic scoring (LLM unavailable).',
    fallback: true,
  }
}

export function extractJson(content) {
  if (!content) return null
  const cleaned = String(content).replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '')
  const first = cleaned.indexOf('{')
  const last = cleaned.lastIndexOf('}')
  if (first === -1 || last <= first) return null
  try {
    return JSON.parse(cleaned.slice(first, last + 1))
  } catch {
    return null
  }
}

export function normalize(result, profile) {
  // New format: { level, score, reason }. Old format: { score, tier, reasoning, breakdown }.
  let score = Math.max(0, Math.min(100, Math.round(Number(result.score) || 0)))
  let tier = result.tier
  let reasoning = typeof result.reasoning === 'string' ? result.reasoning : result.reason
  const breakdown = {
    contribution: Number(result.breakdown?.contribution) || 0,
    community: Number(result.breakdown?.community) || 0,
    reputation: Number(result.breakdown?.reputation) || 0,
    diversity: Number(result.breakdown?.diversity) || 0,
    credibility: Number(result.breakdown?.credibility) || 0,
  }

  if (['pro', 'intermediate', 'mid', 'beginner'].includes(result.level)) {
    tier = result.level
    if (!score) score = LEVEL_SCORE[tier]
  }
  if (!tier) tier = tierFor(score)
  if (!score) score = LEVEL_SCORE[tier] || 50
  if (Object.values(breakdown).every((v) => !v)) {
    const fb = fallbackScore(profile)
    Object.assign(breakdown, fb.breakdown)
  }
  reasoning = typeof reasoning === 'string' ? reasoning.slice(0, 300) : ''
  return { score, tier, breakdown, reasoning }
}
