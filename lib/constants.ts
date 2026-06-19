export const SITE_NAME = "US Insurance Guide";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://usinsuranceguide.com";
export const SITE_TAGLINE =
  "Clear insurance guides, state-by-state resources, and practical coverage information for consumers and businesses.";
export const SITE_DESCRIPTION =
  "Educational insurance guides covering auto, home, renters, business, and life insurance. State-specific resources for Virginia, Maryland, and Washington, D.C.";

export const LAUNCH_CATEGORY_SLUGS = [
  "auto-insurance",
  "home-insurance",
  "renters-insurance",
  "business-insurance",
  "life-insurance",
] as const;

export const LAUNCH_STATE_SLUGS = [
  "virginia",
  "maryland",
  "washington-dc",
] as const;

export const RESERVED_SLUGS = new Set([
  "about",
  "blog",
  "contact",
  "corrections",
  "editorial-policy",
  "advertising-disclosure",
  "insurance-disclaimer",
  "privacy-policy",
  "terms",
  "states",
  "insurance-agencies",
  "api",
]);
