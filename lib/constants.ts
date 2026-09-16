export const SITE_NAME = "US Insurance Guide";
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
