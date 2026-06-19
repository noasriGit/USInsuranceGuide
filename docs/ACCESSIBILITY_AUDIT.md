# Accessibility Baseline Audit Report

**Site:** US Insurance Guide (usinsuranceguide.com)  
**Audit date:** June 19, 2025  
**Standard:** WCAG 2.2 Level AA (target conformance)  
**Scope:** Public marketing and editorial site — homepage, category hubs, state guides, blog articles, policy pages, navigation, footer  
**Out of scope:** Third-party partner websites, external PDF documents, future display-ad iframes

---

## Executive Summary

A baseline accessibility review was conducted prior to launch. Critical automated-scan targets (skip navigation, visible focus indicators, contrast on footer metadata, external-link labeling, header keyboard support, public accessibility statement) were remediated in engineering. The site uses semantic HTML landmarks, single H1 per page, labeled navigation regions, and structured FAQ markup.

**Residual risk:** Full WCAG 2.2 AA conformance across all future content and third-party embeds requires ongoing manual audit cycles. This report documents good-faith remediation at launch; it is not a certification of legal compliance.

---

## Methodology

| Method | Tools / approach |
|--------|------------------|
| Automated scan | Lighthouse accessibility audit, axe DevTools patterns |
| Manual keyboard | Tab-only navigation through header, main content, footer |
| Code review | React/Next.js components, global CSS, ARIA usage |
| Content review | Heading hierarchy, link purpose, alt text policy for markdown images |

Automated tools detect approximately 30–40% of WCAG issues; manual testing is required for complete assessment.

---

## Findings Remediated (Launch)

| Issue | WCAG | Resolution |
|-------|------|------------|
| No skip link | 2.4.1 Bypass Blocks | Added skip-to-main-content link in root layout |
| No visible focus styles | 2.4.7 Focus Visible | Global `:focus-visible` outline in `app/globals.css` |
| Mobile menu missing `aria-expanded` | 4.1.2 Name, Role, Value | Added to mobile toggle; `aria-controls` on panel |
| State Guides dropdown incomplete ARIA | 4.1.2, 2.1.1 | `aria-haspopup`, `aria-controls`, Escape to close, click-outside dismiss |
| Low contrast footer copyright (`slate-400`) | 1.4.3 Contrast | Updated to `slate-500` |
| Low contrast source accessed dates | 1.4.3 Contrast | Updated metadata to `slate-500` |
| External links open new tab without warning | 3.2.2, 2.4.4 | `aria-label` suffix “(opens in new tab)” on external anchors |
| Breadcrumb current page not indicated | 2.4.8 Location | `aria-current="page"` on final crumb |
| No public accessibility statement | Good-faith defense | Published `/accessibility/` with accommodation channel |
| City placeholder pages with empty heading shells | 2.4.6 Headings | Removed redundant empty H2 sections |
| Markdown images without alt policy | 1.1.1 Non-text Content | `Prose` component enforces `alt` attribute (empty allowed for decorative) |
| No reduced-motion support | 2.3.3 Animation | `prefers-reduced-motion` CSS guard |

---

## Known Limitations (Post-Launch)

1. **Category hub shells (6 categories):** Placeholder sections until Batch F rewrites; content pending notices used where applicable.
2. **City guides (Batch E):** Not yet published; pages show pending notice only.
3. **No HTML forms:** Contact is email-only; when forms are added they must include programmatic labels (not placeholder-only).
4. **Third-party PDFs and partner sites:** Linked from sources; accessibility varies by publisher.
5. **Independent screen-reader audit:** Recommended next step with NVDA/JAWS on primary user flows.

---

## Recommended Ongoing Cadence

- **Quarterly:** Automated Lighthouse/axe scan on top 20 URLs
- **After major releases:** Manual keyboard + screen-reader spot check
- **Content:** Require alt text on all new images; verify heading order in new articles
- **Annual:** Third-party accessibility audit or consultant review

---

## Accommodation Contact

**Email:** contact@usinsuranceguide.com (use subject line "Accessibility Request")  
**Response target:** Acknowledge within 3 business days; resolve or propose alternative within 10 business days

---

## Sign-Off

| Role | Status |
|------|--------|
| Engineering remediation | Complete — June 19, 2025 |
| Public accessibility statement | Published at `/accessibility/` |
| Internal accessibility policy | See `docs/ACCESSIBILITY_POLICY.md` |

*This document is maintained in the project repository as part of US Insurance Guide's accessibility compliance record.*
