# Sumbu Resona ($RSNX) — Homepage

The official public home of the **RSNX / Sumbu Resona** ecosystem.

Live site: **https://sumbu-resona.pages.dev**

Source: **https://github.com/farkhanmaul/sumbu-resona**

## Stack

- React 18
- styled-components
- Vite

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is written to `dist/`.

## Deploy to Cloudflare Pages

```bash
npm run build
npx wrangler pages deploy dist --project-name sumbu-resona
```

## Notes

- No backend, no database, no authentication — static site only.
- Cloudflare-provided `*.pages.dev` URL for now; custom domain can be added later.
- Auto-deploy from GitHub (connecting Pages to the repo) is a future step.
