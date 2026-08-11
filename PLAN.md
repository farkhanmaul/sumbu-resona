# Prompt (Revisi — Technical Specification v0.1)

## Project Metadata
- **Project Name:** Sumbu Resona
- **Ticker Symbol:** `$RSNX`
- **Release Milestone:** MVP v0.1 (public-facing landing page)
- **Deployment Target:** Cloudflare Pages (free tier, `*.pages.dev` subdomain)

## Objective
Deliver a production-ready, statically-generated single-page application (SPA) that serves as the first public-facing landing page for the project. The build must prioritize **time-to-deploy** and **runtime performance** over feature completeness. This is an explicitly scoped v0.1 release — architecture should remain minimal and easily extensible for future iterations, not gold-plated upfront.

## Tech Stack
| Layer | Choice |
|---|---|
| UI Library | React 18+ (functional components, hooks only) |
| Build Tool | Vite |
| Styling | styled-components (CSS-in-JS) |
| Hosting/CDN | Cloudflare Pages |
| VCS | GitHub (public repo) |
| Package Manager | npm (or pnpm if preferred — specify) |

## Architecture Constraints
- **Static frontend only** — no SSR, no edge functions, no serverless.
- **No backend services**, no API layer.
- **No database or persistence layer.**
- **No authentication/authorization flows.**
- **No Web3 wallet connectors** (no wagmi/ethers/web3modal) — this is a marketing/info page, not a dApp.
- **Zero unnecessary dependencies** — audit `package.json` before finalizing; every dependency must justify its bundle-size cost.
- **No custom domain configuration** — ship on the default `*.pages.dev` assigned domain.

## Non-Functional Requirements
- **Responsiveness:** Mobile-first CSS strategy, fluid breakpoints, tested at minimum on 375px, 768px, and 1440px viewports.
- **Performance budget:** Target Lighthouse Performance score ≥ 90 on mobile; minimize JS bundle size, avoid render-blocking assets, lazy-load non-critical images if any.
- **Transport security:** HTTPS enforced automatically via Cloudflare Pages (no manual TLS config needed).
- **Infrastructure cost:** Free-tier only across all services used (Cloudflare Pages free plan, GitHub public repo).

## Visual/Design Direction
- **Palette:** Dark theme, purple/cyan accent gradient as primary brand identity.
- **Aesthetic:** Clean, modern, minimal — Web3-adjacent but not cluttered with generic crypto tropes (no stock rocket/moon iconography, no excessive glow effects).
- **Typography:** System font stack or a single lightweight web font (avoid multiple font-weight imports that bloat load time).

## SEO & Metadata
- Standard HTML meta tags: `title`, `description`, `viewport`, `charset`.
- Open Graph tags: `og:title`, `og:description`, `og:image` (placeholder acceptable), `og:type`, `og:url`.
- Twitter/X card metadata (optional but recommended: `twitter:card`, `twitter:title`, `twitter:description`).
- Favicon placeholder.

## Information Architecture / Page Sections
1. **Hero** — project name, ticker, one-line value proposition, primary CTA (if applicable).
2. **About/Overview** — concise explanation of what Sumbu Resona / $RSNX is.
3. **Vision/Ecosystem** — high-level narrative of intended ecosystem direction.
4. **Roadmap (optional, minimal)** — only include if there is real substance to show; a 2–4 phase outline is sufficient, no fabricated dates/milestones.
5. **Official Links** — social/community channels (use placeholder `#` or `TBD` for any not yet live).
6. **Footer/Disclaimer** — standard risk disclaimer, copyright line, no unsubstantiated claims.

## Content Integrity Rules (Critical)
- **Do not fabricate** contract addresses, exchange listings, partnerships, user/community statistics, tokenomics figures, audit results, or any other unverified factual claims.
- Where real data is unavailable, explicitly use `TBD` or a clearly marked placeholder — never a plausible-sounding invented value.
- Content should be **concise and scannable**, not padded for length.
- Clarity and accuracy take priority over marketing volume.

## Guiding Engineering Principles
```
LIVE      > PERFECT
SIMPLE    > COMPLEX
FAST      > FEATURE-RICH
ITERATE   > OVERBUILD
```
Do not introduce speculative features, premature abstractions, or scaffolding for functionality not required in v0.1 (e.g., no i18n setup, no CMS integration, no analytics SDKs unless explicitly requested).

## Pre-Delivery Verification Checklist
1. ✅ Confirm `npm install` (or equivalent) completes without errors or peer-dependency conflicts.
2. ✅ Confirm `npm run build` completes successfully and outputs a valid `dist/` (or configured output) directory.
3. ✅ Verify the production build renders correctly when served locally (e.g., `npm run preview` or `vite preview`).
4. ✅ Confirm the repository/output structure is compatible with Cloudflare Pages' build configuration (build command + output directory correctly documented).
5. ✅ Ensure the repository is clean and safe for a **public** GitHub repo — no secrets, API keys, `.env` files, or internal notes committed.
6. ✅ Provide a final summary including:
   - What was built (file/component structure overview)
   - Exact local dev/build/preview commands
   - Exact Cloudflare Pages deployment configuration (build command, output directory, connected GitHub repo steps)

## Explicit Scope Boundary
Do not add functionality beyond what is required for a v0.1 static landing page. Any enhancement ideas should be noted separately as "future iteration candidates," not implemented now.