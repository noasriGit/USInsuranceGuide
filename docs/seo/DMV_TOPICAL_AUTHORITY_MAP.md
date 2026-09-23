# DMV Topical Authority Map

Last inventoried: 2026-09-22.

US Insurance Guide is a Maryland, Virginia, and Washington, D.C. insurance publication. This map is the site graph that crawlers, people, and LLM systems should be able to walk:

jurisdiction → coverage → requirement → cost → problem → related coverage → local context → licensed-professional lead path.

It documents the graph as implemented after Wave 1. It does not replace `lib/content/seo-manifest.ts`, which remains the URL source of truth.

## Safeguards

- One canonical URL per intent.
- Trailing slashes on every public path.
- `published && indexable` is the only sitemap / GuideNetwork public rule.
- `lastModified` changes only when substance changes. Unchanged pages keep `2025-06-19`. Wave 1 pages use `2026-09-22`.
- Blog explainers stay on `/blog/{slug}/` unless they were already migrated.
- Internal links must point at the final canonical URL, not a `redirectsFrom` source.
- Local pages reuse `/states/{state}/{citySlug}/`. There is no parallel local taxonomy.
- `/states/washington-dc/washington-dc/` stays unpublished. The District hub is the D.C. local page.
- Life insurance remains published but deprioritized.
- Contractors insurance, cyber, industry clusters, and extra locals stay planned until they can be source-backed and distinct.

## Route families

| Family | Pattern | Renderer |
|---|---|---|
| Home / indexes | `/`, `/blog/`, `/states/` | App routes |
| Topic hub | `/{category}/` | `CategoryHubView` |
| Nested topic guide | `/{parent}/{child}/` | Article body when `contentSource` is an article; otherwise hub |
| State hub | `/states/{state}/` | State directory + local list |
| State guide | `/states/{state}/{coverage}/` | `StateGuideView` or `GuideArticleView` |
| State child | `/states/{state}/{coverage}/{child}/` | Article or state-guide |
| Local guide | `/states/{state}/{city}/` | `GuideArticleView` |
| Remaining blog explainers | `/blog/{slug}/` | Article |
| Lead | `/get-insurance-help/` | Lead form |
| Public case files | `/public-case-studies/{slug}/` | Case study |
| Legal / static | `/about/`, `/editorial-policy/`, etc. | Static |

City slugs are resolved after category slugs. Wave 1 city slugs do not collide with coverage slugs.

## Authority clusters

### Auto

Head-term landings, not duplicate keyword URLs:

- `/states/maryland/auto-insurance/` satisfies Maryland auto / car insurance Maryland / auto insurance Maryland.
- `/states/virginia/auto-insurance/` satisfies Virginia car / auto insurance.
- `/states/washington-dc/auto-insurance/` satisfies Washington DC car insurance.

Children and locals:

- Requirements: MD, VA, DC published.
- Cost: Maryland published as a factor/comparison page. VA and DC cost remain planned until an official average can be cited.
- Locals: Alexandria auto, Rockville auto, Bethesda auto.

Supporting blog (canonical): `/blog/why-did-my-car-insurance-go-up/`.

### Home

- `/states/maryland/homeowners-insurance/`
- `/states/virginia/homeowners-insurance/`
- `/states/washington-dc/homeowners-insurance/`
- Cost children: MD and VA published. Laws children remain planned (intent overlaps the landings).
- `/home-insurance/condo-insurance/` is the HO-6 topic guide.
- Flood, landlord, and umbrella reinforce home/auto. They are not a fifth primary cluster.

### Renters

Treated as a primary cluster, not a home footnote.

- `/states/maryland/renters-insurance/`
- `/states/virginia/renters-insurance/`
- `/states/washington-dc/renters-insurance/`
- Requirements children: MD and VA published. D.C. landing already answers the requirement question.
- Locals: Arlington, Fairfax, Silver Spring.
- VA renters cost remains planned. No invented average.

### Business

Commercial lead engine. Head landings stay on the state business URLs.

- `/states/maryland/business-insurance/`
- `/states/virginia/business-insurance/`
- `/states/washington-dc/business-insurance/`
- Nested: general liability, workers' compensation, commercial auto (existing).
- New: `/business-insurance/professional-liability/`.
- Planned: `/business-insurance/contractors-insurance/`.
- Industry clusters (HVAC, electricians, trucking, restaurants) are Wave 2+ and only when multiple distinct pages can be sourced.

## Local engine

Intended route, reused: `/states/{stateSlug}/{citySlug}/`.

| Location | Status | Wave 1 focus | Why this first |
|---|---|---|---|
| Arlington, VA | Published | Renters | Volume + renter density + D.C. adjacency |
| Alexandria, VA | Published | Auto | Volume + independent-city commuting |
| Fairfax, VA | Published | Renters | Volume + City vs County distinction |
| Rockville, MD | Published | Auto | Volume + I-270 / Red Line |
| Bethesda, MD | Published | Auto | Volume + close-in Montgomery contrast with Rockville |
| Silver Spring, MD | Published | Renters | Avoid a third Maryland auto local; renter demand |
| Loudoun County | `contentReady: false` | — | After the first group proves out |
| Prince William County | `contentReady: false` | — | After the first group proves out |
| Washington, D.C. city row | `contentReady: false` | — | Would duplicate `/states/washington-dc/` |

Additional researched markets (McLean, Tysons, Vienna, Reston, Montgomery County, Prince George's County, and others) stay off the sitemap until demand and distinct source-backed copy both exist.

## Internal knowledge graph

`GuideNetwork` now renders `RelatedGraph` groups when they have links:

- Related questions: requirements / cost / laws children
- Related coverage: topic hub, parent, `relatedPaths`
- In your state: other primary state guides
- Compare jurisdictions: same guide/child across MD / VA / DC

Anchors use `primaryKeyword` when present.

Markdown must link the canonical destination. Blog explainer URLs that were never migrated (`/blog/general-liability-insurance-explained/`, `/blog/home-insurance-vs-flood-insurance/`, `/blog/why-did-my-car-insurance-go-up/`, and the other remaining explainers) stay valid.

## Indexing and robots

- `app/sitemap.ts` emits public SEO pages, remaining blog articles, and public case studies.
- Planned, draft, and `contentReady: false` locals are excluded.
- `shouldIndexCity` requires both `city.contentReady` and a public manifest path.
- `app/robots.ts` is unchanged: allow public site, honor sitemap.
- Permanent redirects come from `redirectsFrom` via `getPermanentRedirects()`.

## Lead path

`inferLeadContextFromPage` maps `categorySlug` when the URL has no coverage segment (local city slugs). Coverage types now include professional liability and condo. Sticky mobile CTA stays off regulatory/legal pages and on for local, cost, business, and state guides.

## Wave boundaries

- Wave 1 (this pass): canonical link audit, four core landings, PL and condo topic guides, selected cost/requirements children, six locals, citability components, validation.
- Wave 2: more property/renters support, WC/GL/commercial-auto state depth, contractors, first industry clusters, additional locals.
- Wave 3: public-data assets, remaining locals, specialty clusters, case-file expansion, refresh cadence.
