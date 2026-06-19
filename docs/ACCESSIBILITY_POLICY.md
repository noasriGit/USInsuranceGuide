# Internal Accessibility Policy

**Effective date:** June 19, 2025  
**Owner:** Editorial & Engineering  
**Standard:** WCAG 2.2 Level AA  
**Applies to:** usinsuranceguide.com and all future US Insurance Guide web properties

---

## 1. Purpose

This policy establishes operational procedures so US Insurance Guide maintains accessible digital content for people with disabilities, supports a good-faith compliance posture, and reduces exposure to accessibility-related legal demand.

---

## 2. Scope

This policy covers:

- Website layout, navigation, and interactive components
- Editorial content (articles, state guides, static pages)
- New features, forms, and monetization placements

This policy does **not** cover third-party websites, partner portals, or government PDF documents linked as references.

---

## 3. Roles and Responsibilities

| Role | Responsibilities |
|------|------------------|
| **Engineering** | Semantic HTML, keyboard support, focus indicators, ARIA where needed, form labels, contrast in UI components, fix audit findings |
| **Content / Editorial** | Plain language, logical heading order (one H1), descriptive link text, alt text on images, accurate metadata |
| **Design** | Color contrast ≥ 4.5:1 for body text, non-color-only cues for links and states, visible focus states |
| **Review** | Periodic accessibility scans before major releases |

---

## 4. Content Standards

### 4.1 Text and structure

- Each page has exactly one `<h1>`.
- Headings follow logical order (no skipped levels without reason).
- Link text must describe destination or purpose out of context where feasible.

### 4.2 Images

- Informative images require descriptive `alt` text in markdown or components.
- Decorative images use `alt=""`.
- Do not publish images of text when real text can be used.

### 4.3 Forms (when introduced)

- Every input must have a visible, programmatic `<label>` associated via `htmlFor` / `id`.
- Placeholder text alone is **not** a label.
- Error messages must be associated with fields (`aria-describedby`, `aria-invalid`).
- Required fields must be indicated accessibly.

### 4.4 Multimedia

- Video or audio requires captions/transcripts before publication.

---

## 5. Engineering Standards

### 5.1 Keyboard access (Priority)

- All functionality available via keyboard unless technically impossible.
- No keyboard traps in menus or modals.
- Escape closes dropdown menus and mobile navigation.
- Skip link to main content on every page.

### 5.2 Focus

- Visible `:focus-visible` indicator on all interactive elements.
- Do not remove focus outlines without an equivalent replacement.

### 5.3 External links

- Links opening a new tab must inform users via visible text or `aria-label` (“opens in new tab”).

### 5.4 Motion

- Respect `prefers-reduced-motion` for animations and transitions.

---

## 6. Testing Protocol

### Before each major release

1. Run Lighthouse accessibility audit on homepage, one article, one state guide, one category hub.
2. Keyboard-only pass: header → main → footer without mouse.
3. Verify skip link targets `#main-content`.
4. Spot-check color contrast on new UI.

### Quarterly

- Re-run automated scans on top traffic URLs.
- Update `docs/ACCESSIBILITY_AUDIT.md` with findings and remediation status.

### After accessibility feedback

- Log request in accessibility inbox.
- Acknowledge within 3 business days.
- Assign remediation or alternative format within 10 business days where feasible.
- Document resolution in audit log.

---

## 7. Public-Facing Commitments

- Maintain an [Accessibility Statement](/accessibility/) linked from the site footer.
- Provide **contact@usinsuranceguide.com** (subject line: "Accessibility Request") for accommodation requests.

---

## 8. Exceptions

Temporary exceptions require documented justification, an remediation timeline, and disclosure on the accessibility statement if user-facing impact is material.

---

## 9. Policy Review

This policy is reviewed at least annually or when significant site architecture changes occur.

---

## 10. Related Documents

- `docs/ACCESSIBILITY_AUDIT.md` — baseline audit and remediation log
- `/accessibility/` — public accessibility statement
- `lib/compliance/language.ts` — prohibited marketing phrases (separate from a11y)
