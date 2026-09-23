# DMV Content Manifest

Last inventoried: 2026-09-22. Ahrefs volumes are directional (same date). Status values: `published`, `planned`, `draft`.

Lead value is editorial, not a traffic forecast. Implementation priority:

- **P0** — graph integrity (redirects, orphans, sitemap, duplicate intent)
- **P1** — first authority wave (this pass)
- **P2** — expansion
- **P3** — long-term coverage

`lib/content/seo-manifest.ts` is authoritative for URL, kind, parent, relatedPaths, indexability, and lastModified. This file adds intent, demand, lead value, sources, and queue position.

## P0 — fix immediately

| URL | Type | Status | Notes |
|---|---|---|---|
| Internal markdown `/blog/.../` links that already have a topic-guide canonical | link | monitored | Wave 1 audit found no stale migrated blog links. Remaining `/blog/` URLs are still canonical explainers. |
| `scripts/validate-seo.ts` | test | published | Fails on redirect links, missing routes, orphans, unpublished targets, missing article sources, duplicate primary keywords, and indexable drafts. |

No current ranking URL was changed for prettier slugs.

## P1 — first authority wave

### Auto

| URL | Type | Jur. | Primary keyword | Secondary | Intent | Vol | KD | Lead | Status | Parent | Children / locals | Sources | Content | Index | Pri |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/states/maryland/auto-insurance/` | state-guide | MD | car insurance Maryland | maryland auto insurance; auto insurance maryland; car insurance in maryland | informational / commercial | 2,800–4,600 | 0–10 | high | published | `/states/maryland/` | requirements, cost; Rockville; Bethesda | MIA; MVA | deepened 2026-09-22 | index | P1 |
| `/states/maryland/auto-insurance/requirements/` | state-child | MD | Maryland auto insurance requirements | PIP; UM/UIM; lapse | regulatory | — | — | medium | published | MD auto | — | MIA; MVA; MD Code | existing | index | P1 |
| `/states/maryland/auto-insurance/cost/` | state-child | MD | Maryland car insurance rates | cheap auto insurance maryland | commercial | 900–1,300 | 4–6 | high | published | MD auto | — | MIA; MVA | new 2026-09-22 | index | P1 |
| `/states/virginia/auto-insurance/` | state-guide | VA | car insurance Virginia | virginia car insurance; auto insurance Virginia | informational / commercial | 1,700–2,600 | 0–5 | high | published | `/states/virginia/` | requirements; Alexandria | SCC; VA DMV | deepened 2026-09-22 | index | P1 |
| `/states/virginia/auto-insurance/requirements/` | state-child | VA | Virginia auto insurance requirements | 50/100/25; UM/UIM | regulatory | — | — | medium | published | VA auto | — | SCC; VA DMV | existing | index | P1 |
| `/states/virginia/auto-insurance/cost/` | state-child | VA | average car insurance cost Virginia | — | commercial | — | — | high | planned | VA auto | — | need official average | deferred | noindex | P2 |
| `/states/washington-dc/auto-insurance/` | state-guide | DC | car insurance Washington DC | — | informational / commercial | 900 | 1 | high | published | `/states/washington-dc/` | requirements | DISB; DC DMV | deepened 2026-09-22 | index | P1 |
| `/states/washington-dc/auto-insurance/requirements/` | state-child | DC | Washington DC auto insurance requirements | 25/50/10; PIP election | regulatory | — | — | medium | published | DC auto | — | DISB; DC DMV | existing | index | P1 |
| `/states/washington-dc/auto-insurance/cost/` | state-child | DC | average car insurance cost Washington DC | — | commercial | — | — | high | planned | DC auto | — | need official average | deferred | noindex | P2 |
| `/states/virginia/alexandria/` | local-guide | VA | car insurance Alexandria VA | — | local commercial | 150 | 1 | high | published | `/states/virginia/` | — | SCC; VA DMV; City of Alexandria | new 2026-09-22 | index | P1 |
| `/states/maryland/rockville/` | local-guide | MD | car insurance Rockville MD | — | local commercial | 90 | — | high | published | `/states/maryland/` | — | MIA; MVA; City of Rockville | new 2026-09-22 | index | P1 |
| `/states/maryland/bethesda/` | local-guide | MD | Bethesda MD car insurance | Bethesda MD car insurance quotes | local commercial | 70 | 0 | high | published | `/states/maryland/` | — | MIA; MVA | new 2026-09-22 | index | P1 |

IN/OUT for auto landings: hub + children + peer jurisdictions + why-rates-rise blog + selected locals. Lead CTA: standard on landings, subtle on requirements, cost variant on cost pages.

### Home

| URL | Type | Jur. | Primary keyword | Secondary | Intent | Vol | KD | Lead | Status | Parent | Children | Sources | Content | Index | Pri |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/home-insurance/` | topic-hub | DMV | home insurance | — | informational | — | — | medium | published | `/` | condo; state landings | MIA; SCC; DISB; FEMA | existing hub | index | P1 |
| `/home-insurance/condo-insurance/` | topic-guide | DMV | Maryland condo insurance | HO-6; loss assessment | informational / commercial | 200 | 0 | high | published | `/home-insurance/` | — | MIA condo pages; SCC; DISB; FEMA | new 2026-09-22 | index | P1 |
| `/states/maryland/homeowners-insurance/` | state-guide | MD | homeowners insurance Maryland | Maryland home insurance; home insurance Maryland | informational / commercial | 600–1,000 | 0–2 | high | published | `/states/maryland/` | cost; laws planned | MIA; FEMA | links + date 2026-09-22 | index | P1 |
| `/states/maryland/homeowners-insurance/cost/` | state-child | MD | homeowners insurance cost Maryland | cheapest home insurance Maryland | commercial | 300–350 | 1–2 | high | published | MD home | — | MIA; FEMA | new 2026-09-22 | index | P1 |
| `/states/maryland/homeowners-insurance/laws/` | state-child | MD | Maryland homeowners insurance laws | — | regulatory | — | — | low | planned | MD home | — | overlaps landing | deferred | noindex | P2 |
| `/states/virginia/homeowners-insurance/` | state-guide | VA | homeowners insurance Virginia | home insurance Virginia | informational / commercial | 900–1,200 | 0–11 | high | published | `/states/virginia/` | cost; laws planned | SCC; FEMA | links + date 2026-09-22 | index | P1 |
| `/states/virginia/homeowners-insurance/cost/` | state-child | VA | homeowners insurance rates Virginia | cheapest home insurance Virginia | commercial | 300–400 | 2–5 | high | published | VA home | — | SCC; FEMA | new 2026-09-22 | index | P1 |
| `/states/washington-dc/homeowners-insurance/` | state-guide | DC | homeowners insurance Washington DC | Washington DC home insurance | informational | 90–200 | — | medium | published | `/states/washington-dc/` | — | DISB; FEMA | deepened 2026-09-22 | index | P1 |

### Renters

| URL | Type | Jur. | Primary keyword | Secondary | Intent | Vol | KD | Lead | Status | Parent | Children / locals | Sources | Content | Index | Pri |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/renters-insurance/` | topic-hub | DMV | renters insurance | — | informational | — | — | medium | published | `/` | state landings | MIA; SCC; DISB | existing hub | index | P1 |
| `/states/maryland/renters-insurance/` | state-guide | MD | renters insurance Maryland | — | informational / commercial | 2,100 | 0 | high | published | `/states/maryland/` | requirements; Silver Spring | MIA | deepened 2026-09-22 | index | P1 |
| `/states/maryland/renters-insurance/requirements/` | state-child | MD | is renters insurance required in Maryland | — | regulatory | 200 | 1 | medium | published | MD renters | — | MIA | new 2026-09-22 | index | P1 |
| `/states/virginia/renters-insurance/` | state-guide | VA | renters insurance Virginia | — | informational / commercial | 1,000 | 4 | high | published | `/states/virginia/` | requirements; Arlington; Fairfax | SCC | deepened 2026-09-22 | index | P1 |
| `/states/virginia/renters-insurance/requirements/` | state-child | VA | is renters insurance required in Virginia | — | regulatory | — | — | medium | published | VA renters | — | SCC | new 2026-09-22 | index | P1 |
| `/states/virginia/renters-insurance/cost/` | state-child | VA | average cost of renters insurance in Virginia | — | commercial | — | — | medium | planned | VA renters | — | need official average | deferred | noindex | P2 |
| `/states/washington-dc/renters-insurance/` | state-guide | DC | renters insurance Washington DC | — | informational / commercial | 450 | 34 | high | published | `/states/washington-dc/` | — | DISB; FEMA | links + date 2026-09-22 | index | P1 |
| `/states/virginia/arlington/` | local-guide | VA | renters insurance Arlington VA | — | local commercial | 200 | 0 | high | published | `/states/virginia/` | — | SCC; Arlington; FEMA | new 2026-09-22 | index | P1 |
| `/states/virginia/fairfax/` | local-guide | VA | Fairfax VA renters insurance | Fairfax VA renters insurance quotes | local commercial | 70–80 | 0 | high | published | `/states/virginia/` | — | SCC; City of Fairfax | new 2026-09-22 | index | P1 |
| `/states/maryland/silver-spring/` | local-guide | MD | Silver Spring MD renters insurance | Silver Spring MD auto quotes (not targeted) | local commercial | 60 | 0 | high | published | `/states/maryland/` | — | MIA; Montgomery County | new 2026-09-22 | index | P1 |

Silver Spring auto quotes (~80) were not given a second Maryland auto local. The renter page can mention auto only as adjacent coverage.

### Business

| URL | Type | Jur. | Primary keyword | Secondary | Intent | Vol | KD | Lead | Status | Parent | Children | Sources | Content | Index | Pri |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| `/business-insurance/` | topic-hub | DMV | business insurance | — | commercial | — | — | high | published | `/` | GL, WC, commercial auto, PL | MIA; SCC; DISB; WCC | existing hub | index | P1 |
| `/business-insurance/professional-liability/` | topic-guide | DMV | professional liability insurance Maryland | professional liability insurance Virginia; E&O | commercial | 200 / 200 | 1–2 | high | published | `/business-insurance/` | — | DISB liability page; MIA; SCC | new 2026-09-22 | index | P1 |
| `/states/maryland/business-insurance/` | state-guide | MD | business insurance Maryland | Maryland business insurance; small business insurance Maryland | commercial | 200–350 | 1 | high | published | `/states/maryland/` | GL, WC, commercial auto | WCC; MIA | PL links 2026-09-22 | index | P1 |
| `/states/virginia/business-insurance/` | state-guide | VA | Virginia business insurance | business insurance Virginia | commercial | 250–300 | 1–2 | high | published | `/states/virginia/` | GL, WC, commercial auto | SCC; VA WCC | PL links 2026-09-22 | index | P1 |
| `/states/washington-dc/business-insurance/` | state-guide | DC | business insurance Washington DC | — | commercial | 200 | 38 | high | published | `/states/washington-dc/` | GL, WC, commercial auto | DISB | PL links 2026-09-22 | index | P1 |
| `/business-insurance/contractors-insurance/` | topic-guide | DMV | contractor insurance Maryland | HVAC contractor insurance Virginia | commercial | 50–80 | — | high | planned | `/business-insurance/` | — | need trade-specific DMV sources | deferred | noindex | P2 |

Existing published GL / WC / commercial-auto state children stay as-is (Wave 2 depth). Blog explainers for those three remain canonical `/blog/` URLs.

## P2 — expansion

- Virginia and D.C. auto cost pages, only with citeable figures.
- Homeowners laws children, only if they can be more than a restatement of the landing.
- Virginia renters cost.
- Workers' compensation, general liability, and commercial auto state depth.
- Contractors insurance topic guide, then state pages only where rules differ.
- First industry clusters: general contractors, HVAC, electricians, plumbers, landscapers, excavation, trucking, real estate, professional services. Restaurants only if demand and distinct coverage needs are documented.
- Evaluate cyber, commercial property, inland marine, tools, surety only where insurance intent is clear.
- Additional locals after the first six prove structurally sound: Loudoun, Prince William, then McLean, Tysons, Vienna, Reston, Herndon, Falls Church, Ashburn, Leesburg, Sterling, Manassas, Woodbridge, Montgomery County, Gaithersburg, Germantown, Potomac, Chevy Chase, Wheaton, Prince George's County, Bowie, College Park, Laurel.
- Planned auto topic children already in the manifest (`/auto-insurance/liability-coverage/`, collision, comprehensive, deductibles, UM/UIM). Create only when they add more than the state landings already say.

## P3 — long-term coverage

- Public-data / linkable assets: DMV minimum-limits table, renters-requirement comparison, WC threshold comparison, regulator complaint process, flood resource comparison, terminology glossary, yearly rule-change tracker. Each needs a cited public source.
- Additional public case files.
- Remaining specialty and life-insurance work only if search or lead data later justifies it.
- Systematic refresh of `lastModified` on pages whose statutes or regulator publications change.

## Already published, not in Wave 1 rewrite

State hubs, category hubs, flood / landlord / umbrella / life state guides, remaining blog explainers, legal pages, lead form, and public case studies stay live. They keep their current dates unless a later pass edits substance.

Life insurance: published, deprioritized, not expanded.

## Required sources by jurisdiction

- Maryland: Maryland Insurance Administration, Maryland MVA, Maryland Workers' Compensation Commission, Maryland Business Express where relevant.
- Virginia: SCC Bureau of Insurance, Virginia DMV, Virginia Workers' Compensation Commission.
- District: DISB, DC DMV, other District government sources as needed.
- Federal: FEMA / NFIP, SBA, DOL only when the topic requires them.

Do not invent rates, reviewer credentials, or carrier superlatives.
