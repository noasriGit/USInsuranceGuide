# Content Phases — DMV-First Architecture

US Insurance Guide publishes **Maryland, Virginia, and Washington, D.C. insurance guides only**. We are not rolling out a 50-state matrix or city-page explosion.

The SEO model is:

```text
Insurance Topic
        ↓
DMV Coverage / Concept Guide
        ↓
Maryland / Virginia / Washington, D.C.
        ↓
Requirements / Cost / Laws / Specialty Pages
```

## Source of truth

Every URL lives in `lib/content/seo-manifest.ts` with:

| Field | Purpose |
|------|---------|
| `status` | `planned` · `draft` · `review` · `published` |
| `indexable` | Canonical indexing flag |
| `lastModified` | Real content date — never deploy time |
| `contentSource` | `article`, `state-guide`, `hub`, or `static` |
| `redirectsFrom` | Permanent redirects from retired URLs |

**Public rule:** only `published && indexable` pages get a sitemap entry, internal links, and indexable canonicals. Incomplete shells are not generated.

City pages are deferred until Search Console shows meaningful local query demand.

---

## Phase 0 — Technical cleanup (current)

- [x] Replace blanket `INDEX_STATE_CATEGORY_SHELLS`
- [x] Remove incomplete shells from the sitemap
- [x] Use real content modification dates
- [x] Explicit SEO/content manifest
- [x] Restructure state/category relationships
- [x] Redirect map for retired blog and state URLs
- [x] Update navigation and homepage for DMV positioning
- [x] Strengthen Maryland, Virginia, and D.C. hubs

---

## Phase 1 — Highest-value DMV landing pages

Publish and expand these as full editorial guides (immediate answers, official sources, last reviewed dates):

### Maryland

1. Maryland Auto Insurance
2. Maryland Renters Insurance
3. Maryland Homeowners Insurance
4. Maryland Auto Requirements
5. Maryland Auto Cost *(planned — do not invent averages)*
6. Maryland Homeowners Cost *(planned)*
7. Maryland Homeowners Laws *(planned)*
8. Maryland Renters Requirements *(planned)*

### Virginia

9. Virginia Auto Insurance
10. Virginia Homeowners Insurance
11. Virginia Renters Insurance
12. Virginia Auto Requirements *(migrated from the existing requirements article)*
13. Virginia Auto Cost *(planned)*
14. Virginia Homeowners Cost *(planned)*
15. Virginia Homeowners Laws *(planned)*
16. Virginia Renters Requirements *(planned)*

### Washington, D.C.

17. D.C. Auto Insurance
18. D.C. Auto Requirements
19. D.C. Homeowners Insurance
20. D.C. Renters Insurance

Do **not** write unsupported “best company” rankings.

---

## Phase 2 — Business authority

Expand:

- Maryland / Virginia business insurance, general liability, workers’ compensation, commercial auto
- D.C. business pages when SERP quality justifies further investment

Concept hubs:

- `/business-insurance/general-liability/`
- `/business-insurance/workers-compensation/`
- `/business-insurance/commercial-auto/`
- `/business-insurance/business-owners-policy/` *(planned)*

---

## Phase 3 — Specialty coverage

Add or upgrade only where demand or internal-link value justifies it:

- Landlord insurance (Virginia already has meaningful demand)
- Flood insurance (harder SERPs — do not prioritize over KD 0–10 clusters)
- Umbrella pages only when useful

---

## Phase 4 — Search Console expansion

County and city pages (Fairfax, Loudoun, Arlington, Montgomery County, Bethesda, Rockville, Silver Spring, etc.) are **not** created from a template matrix. Build them only after impression data shows real local queries.

---

## Editorial rules

- Answer the question in the first paragraph. Do not open with filler.
- State/legal facts must cite official sources (MIA/MVA, VA SCC/DMV, DC DISB/DMV, statutes, workers’ compensation commissions).
- Store `lastUpdated`, `lastReviewed`, `effectiveDate`, `officialSources`, and `reviewer` on regulatory guides.
- Never invent premiums, limits, or legal rules from model memory.
- Life insurance remains technically supported but is not a publishing priority.

## Indexing flags

| Flag | Use |
|------|-----|
| Page `status` + `indexable` in the SEO manifest | Controls sitemap, canonicals, and internal links |
| `SHOW_INSURANCE_DIRECTORY_NAV` | Set `true` when partner listings are ready |
