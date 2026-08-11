// GET /card/:handle — public card page (SSR, shareable, OG meta).
// Renders a static HTML page with the card data so social links work.

import { getCardByHandle, cardView } from '../_shared/store.js'

export async function onRequestGet(context) {
  const { env, params } = context
  const card = await getCardByHandle(env, params.handle)
  const data = cardView(card)

  const ogTitle = data
    ? `@${data.handle} — RSNX Card (${(data.tier || 'pending').toUpperCase()})`
    : 'RSNX Cards — Sumbu Resona'
  const ogDesc = data?.reasoning
    ? `AI-scored by Command Code on the Sumbu Resona ecosystem. ${data.reasoning}`
    : 'AI community cards for the Sumbu Resona ecosystem, scored by Command Code.'
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${ogTitle}</title>
<meta name="description" content="${ogDesc}" />
<meta property="og:title" content="${ogTitle}" />
<meta property="og:description" content="${ogDesc}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://sumbu-resona.pages.dev/card/${params.handle}" />
<meta name="theme-color" content="#0aa8c7" />
<style>
  body { margin:0; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; background:#fff; color:#0e1a1d; display:flex; align-items:center; justify-content:center; min-height:100vh; }
  .card { width:400px; max-width:92vw; border-radius:20px; padding:28px; background:linear-gradient(135deg,#0aa8c7 0%,#087f97 100%); color:#fff; box-shadow:0 24px 60px -24px rgba(8,127,151,.45); }
  .head { display:flex; align-items:center; gap:14px; margin-bottom:22px; }
  .avatar { width:56px; height:56px; border-radius:50%; background:rgba(255,255,255,.2); }
  .name { font-weight:800; font-size:22px; }
  .handle { opacity:.85; font-size:13px; }
  .tier { display:inline-block; margin-top:10px; background:#0e1a1d; color:#7fe3f4; padding:6px 14px; border-radius:999px; font-size:12px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; }
  .score { font-size:52px; font-weight:800; line-height:1; }
  .dim { margin-top:20px; }
  .dim-row { display:flex; justify-content:space-between; font-size:13px; margin-top:8px; opacity:.9; }
  .bar { height:6px; border-radius:3px; background:rgba(255,255,255,.25); margin-top:4px; overflow:hidden; }
  .bar i { display:block; height:100%; background:#7fe3f4; border-radius:3px; }
  .reason { margin-top:22px; font-size:13px; line-height:1.6; opacity:.85; }
  .foot { margin-top:22px; font-size:11px; opacity:.7; border-top:1px solid rgba(255,255,255,.2); padding-top:14px; }
</style>
</head>
<body>
  <div class="card">
    <div class="head">
      ${data?.avatar_url ? `<img class="avatar" src="${data.avatar_url}" alt="" />` : '<div class="avatar"></div>'}
      <div>
        <div class="name">${data?.name || data?.username || '@unknown'}</div>
        <div class="handle">@${data?.handle || params.handle} · RSNX</div>
      </div>
    </div>
    ${data && data.score != null ? `
      <div>
        <div class="score">${data.score}</div>
        <div class="tier">${data.tier} · AI-scored</div>
      </div>
      <div class="dim">
        ${Object.entries(data.breakdown || {}).map(([k, v]) => `
          <div class="dim-row"><span>${k}</span><span>${v}/20</span></div>
          <div class="bar"><i style="width:${(v / 20) * 100}%"></i></div>
        `).join('')}
      </div>
      <div class="reason">${data.reasoning}</div>
      <div class="foot">Scored by Command Code · sumbu-resona.pages.dev</div>
    ` : `
      <div style="font-size:16px;opacity:.9">This card is being scored.</div>
    `}
  </div>
</body>
</html>`
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}
