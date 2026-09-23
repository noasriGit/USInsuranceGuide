export const SITE_NAME = "US Insurance Guide";
export const BRAND_SHIELD_PATH = "/brand/usinsuranceguide-shield.png";
export const BRAND_WORDMARK_PATH = "/brand/usinsuranceguide-wordmark.png";
export const HERO_BANNER_PATH = "/herobanner.png";
export const MARYLAND_BANNER_PATH = "/marylandbanner.png";
export const VIRGINIA_BANNER_PATH = "/virginiabanner.png";

export function getStateBannerPath(stateSlug: string): string | undefined {
  if (stateSlug === "maryland") return MARYLAND_BANNER_PATH;
  if (stateSlug === "virginia") return VIRGINIA_BANNER_PATH;
  if (stateSlug === "washington-dc") return HERO_BANNER_PATH;
  return undefined;
}
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://usinsuranceguide.com";
export const SITE_TAGLINE =
  "Insurance guides for Maryland, Virginia, and Washington, D.C.";
export const SITE_DESCRIPTION =
  "Educational insurance guides for Maryland, Virginia, and Washington, D.C. covering auto, homeowners, renters, and business insurance requirements, costs, and coverage rules.";

export const LAUNCH_CATEGORY_SLUGS = [
  "auto-insurance",
  "home-insurance",
  "renters-insurance",
  "business-insurance",
  "landlord-insurance",
  "flood-insurance",
  "umbrella-insurance",
] as const;

export const LAUNCH_STATE_SLUGS = [
  "maryland",
  "virginia",
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
  "accessibility",
  "api",
  "get-insurance-help",
  "public-case-studies",
  "case-studies",
]);

export const LEAD_PATH = "/get-insurance-help/";
export const PUBLIC_CASE_STUDIES_PATH = "/public-case-studies/";

/** Set true when directory has partner listings worth promoting in nav. */
export const SHOW_INSURANCE_DIRECTORY_NAV = false;

export const PRIMARY_TOPIC_SLUGS = [
  "auto-insurance",
  "home-insurance",
  "renters-insurance",
  "business-insurance",
] as const;
