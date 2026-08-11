// GitHub public profile fetching (no OAuth required)

const GH_BASE = 'https://api.github.com'

function ghHeaders(env = {}) {
  const h = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'rsnx-homepage',
  }
  if (env.GITHUB_TOKEN) h.Authorization = `Bearer ${env.GITHUB_TOKEN}`
  return h
}

export async function fetchGitHubProfile(username, env = {}) {
  const res = await fetch(`${GH_BASE}/users/${encodeURIComponent(username)}`, {
    headers: ghHeaders(env),
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`GitHub user fetch failed: ${res.status}`)
  const u = await res.json()

  const reposRes = await fetch(
    `${GH_BASE}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
    { headers: ghHeaders(env) },
  )
  const repos = reposRes.ok ? await reposRes.json() : []

  const langs = {}
  let totalStars = 0
  const recentRepos = []
  for (const r of repos) {
    if (r.language) langs[r.language] = (langs[r.language] || 0) + 1
    totalStars += r.stargazers_count || 0
    if (!r.fork) {
      recentRepos.push({
        name: r.name,
        description: r.description,
        language: r.language,
        stars: r.stargazers_count || 0,
        topics: r.topics || [],
        pushed_at: r.pushed_at,
        fork: !!r.fork,
        archived: !!r.archived,
      })
    }
  }

  return {
    username: u.login,
    name: u.name,
    bio: u.bio,
    location: u.location,
    blog: u.blog,
    avatar_url: u.avatar_url,
    followers: u.followers,
    following: u.following,
    public_repos: u.public_repos,
    created_at: u.created_at,
    total_stars: totalStars,
    languages: Object.keys(langs).sort((a, b) => langs[b] - langs[a]),
    recent_repos: recentRepos.slice(0, 10),
  }
}
