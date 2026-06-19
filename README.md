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
- **Data:** `content/data/*.json` (categories, states, partners, etc.)
- **Phases:** See [CONTENT_PHASES.md](./CONTENT_PHASES.md) for structure vs editorial workflow

## Phase 3 (editorial) — see [CONTENT_PHASES.md](./CONTENT_PHASES.md)

Phase 3 includes a **full rewrite** of all Phase 1 seed articles plus new shells, drafts, and hub copy. Phase 1 text was infrastructure seed content, not final editorial.

## Deployment

Deploy to Vercel. Set `NEXT_PUBLIC_SITE_URL=https://usinsuranceguide.com`.
