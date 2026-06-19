# Content Phases

## Phase 2 (structure) — current

Pages and routes exist with section shells and safe placeholder notices. **Shell pages are not indexed** until editorial content is approved.

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

## Phase 3 (editorial)

1. Fill section shells on state+category and local pages
2. Complete draft articles in `content/articles/`
3. Add FAQ, sources, and reviewer sign-off per page
4. Run prohibited-language check (`lib/compliance/language.ts`)
5. Flip indexing flags and `contentReady` fields
6. Redeploy
