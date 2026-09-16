# US Insurance Guide

Educational insurance publication built with Next.js, TypeScript, Tailwind CSS, and file-based content.

**Domain:** [usinsuranceguide.com](https://usinsuranceguide.com)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Content

- **Articles:** `content/articles/*.md` (gray-matter frontmatter)
- **State guides:** `content/state-guides/*.md`
- **Data:** `content/data/*.json` (categories, states, partners, etc.)
- **Public case files:** `content/data/public-case-studies.ts`
- **SEO manifest:** `lib/content/seo-manifest.ts` — publication status, canonical URLs, redirects, and last-modified dates
- **Phases:** See [CONTENT_PHASES.md](./CONTENT_PHASES.md) for the DMV-first publishing plan

US Insurance Guide covers **Maryland, Virginia, and Washington, D.C. only**.

## Phase 3 (editorial) — see [CONTENT_PHASES.md](./CONTENT_PHASES.md)

Phase 3 includes a **full rewrite** of all Phase 1 seed articles plus new shells, drafts, and hub copy. Phase 1 text was infrastructure seed content, not final editorial.

## Deployment

Deploy to Vercel. Set `NEXT_PUBLIC_SITE_URL=https://usinsuranceguide.com`.

Lead delivery is configured with server-only environment variables:

```bash
LEAD_DELIVERY_WEBHOOK_URL=
LEAD_DELIVERY_SECRET=
```

Do not prefix those variables with `NEXT_PUBLIC_`. If no webhook is configured in production, form submissions fail visibly instead of being discarded. For local production-mode testing only, `LEAD_ALLOW_UNCONFIGURED=true` accepts a lead without delivering it.
