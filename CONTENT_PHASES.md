# Content Phases

## Phase 2 (structure) — complete

Pages and routes exist with section shells and safe placeholder notices. **Shell pages are not indexed** until editorial content is approved in Phase 3.

### Indexing flags (`lib/constants.ts`)

| Flag | Phase 3 action |
|------|----------------|
| `INDEX_STATE_CATEGORY_SHELLS` | Set `true` after state+category copy is reviewed |
| `SHOW_INSURANCE_DIRECTORY_NAV` | Set `true` when partner listings are ready |

### Per-entity flags (`content/data/`)

| Field | Location | Phase 3 action |
|-------|----------|----------------|
| `contentReady` | `categories.json` | Set `true` on each category hub when copy is complete |
| `contentReady` | `cities.json` | Set `true` on each local guide when copy is complete |
| `draft` | article frontmatter | Remove or set `false` when article is ready to publish |

---

## Phase 3 (editorial) — full content pass

Phase 3 is **not** only new shells and drafts. It includes a **complete editorial rewrite and SEO review of all Phase 1 published content**, which was seeded for infrastructure testing — not as final, accuracy-reviewed copy.

### Editorial goals

- **Accuracy:** Verify claims against official state sources (.gov, state insurance departments)
- **SEO:** Strong meta titles/descriptions, natural keyword use, internal links, FAQ schema where appropriate
- **Reading flow:** Clear headings, scannable structure, plain-English tone — not thin or repetitive
- **Compliance:** No prohibited language; disclaimers, sources, and reviewer bylines where appropriate
- **E-E-A-T:** Last updated dates, citations, correction path visible

### Phase 3 content inventory

#### Priority 1 — Published articles (rewrite, not patch)

These 10 articles are live today and **must be fully rewritten** in Phase 3:

| Slug | Notes |
|------|-------|
| `virginia-auto-insurance-requirements` | High YMYL — verify VA SCC sources |
| `maryland-auto-insurance-requirements` | High YMYL — verify MIA sources |
| `washington-dc-auto-insurance-requirements` | High YMYL — verify DISB sources |
| `business-insurance-in-virginia` | State-specific business coverage |
| `general-liability-insurance-explained` | Evergreen explainer |
| `commercial-auto-insurance-explained` | Evergreen explainer |
| `workers-compensation-insurance-explained` | Evergreen explainer |
| `home-insurance-vs-flood-insurance` | Comparison guide |
| `why-did-my-car-insurance-go-up` | Blog-style educational |
| `what-insurance-does-a-small-business-need` | Blog-style educational |

For each article, Phase 3 deliverables:

- [ ] Rewritten body copy (reading flow + accuracy)
- [ ] Optimized `metaTitle`, `metaDescription`, `excerpt`
- [ ] FAQ section (where appropriate) + FAQ schema
- [ ] Sources & references (authoritative links)
- [ ] Reviewer byline on YMYL topics
- [ ] Updated `updatedAt` date
- [ ] Prohibited-language check
- [ ] Internal links to relevant category/state pages

#### Priority 2 — Draft articles (write from scratch)

| Slug | Status |
|------|--------|
| `business-insurance-in-maryland` | `draft: true` |
| `business-insurance-in-washington-dc` | `draft: true` |
| `homeowners-insurance-in-virginia` | `draft: true` |
| `homeowners-insurance-in-maryland` | `draft: true` |
| `renters-insurance-in-washington-dc` | `draft: true` |
| `umbrella-insurance-explained` | `draft: true` |

#### Priority 3 — Category hub copy (`content/data/categories.json`)

All 11 categories — review and rewrite where needed:

- [ ] **Phase 1 hubs (5):** `shortDescription`, `metaTitle`, `metaDescription` — optimize even though `contentReady: true` today
- [ ] **Phase 2 hubs (6):** Full hub intro copy on page + set `contentReady: true` when done

#### Priority 4 — State hub copy (`content/data/states.json`)

- [ ] Rewrite `overview` for Virginia, Maryland, Washington D.C.
- [ ] Review `metaTitle` / `metaDescription` for each state

#### Priority 5 — State + category guide pages (33 routes)

Fill all `GuideSectionShell` sections defined in `STATE_CATEGORY_GUIDE_SECTIONS`:

- Overview
- Coverage Options to Consider
- State Requirements & Regulations
- Factors That May Affect Your Premium
- Frequently Asked Questions
- Sources & References

Then set `INDEX_STATE_CATEGORY_SHELLS = true`.

#### Priority 6 — Local city guides (9 routes)

Fill all `LOCAL_GUIDE_SECTIONS` shells in `content/data/cities.json` pages, then set `contentReady: true` per city.

#### Priority 7 — Static / trust pages (review pass)

Light review or rewrite as needed — legal tone, accuracy, no overclaims:

- About, Editorial Policy, Advertising Disclosure, Insurance Disclaimer
- Privacy Policy, Terms of Use, Contact, Corrections

Homepage hero and section intro copy (`app/page.tsx`) — review for SEO and clarity.

### Suggested Phase 3 batch order

1. **Batch A:** VA / MD / DC auto requirements (highest regulatory sensitivity)
2. **Batch B:** Remaining published articles (explainers + blog posts)
3. **Batch C:** Draft articles + homeowners/renters state guides
4. **Batch D:** State+category pages (by state: VA → MD → DC)
5. **Batch E:** Local city guides
6. **Batch F:** Category hub meta + new hub body copy; static page review

### Phase 3 completion checklist

- [ ] All 10 Phase 1 articles rewritten and re-reviewed
- [ ] All 6 draft articles published (`draft: false`)
- [ ] All category hubs `contentReady: true` with optimized metadata
- [ ] All local guides `contentReady: true`
- [ ] `INDEX_STATE_CATEGORY_SHELLS = true`
- [ ] Sitemap reflects all indexable pages
- [ ] Internal linking audit complete
- [ ] Optional: licensed professional or legal review on requirement pages

---

## After Phase 3

- Phase 4 (polish): GA4, Search Console, Lighthouse, domain fine-tuning
- Partner directory: enable when listings exist (`SHOW_INSURANCE_DIRECTORY_NAV`)
