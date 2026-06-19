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

## Adding content

1. Copy an existing article in `content/articles/`
2. Update frontmatter (title, slug via filename, category, states, etc.)
3. Run `npm run dev` to preview

## Deployment

Deploy to Vercel. Set `NEXT_PUBLIC_SITE_URL=https://usinsuranceguide.com`.
