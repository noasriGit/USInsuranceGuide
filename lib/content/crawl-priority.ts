import type { CrawlPriority, SeoPage } from "@/lib/schemas";

export const CORE_CRAWL_PATHS = [
  "/",
  "/states/",
  "/auto-insurance/",
  "/states/virginia/",
  "/states/maryland/",
  "/states/washington-dc/",
  "/states/virginia/auto-insurance/",
  "/states/maryland/auto-insurance/",
  "/states/washington-dc/auto-insurance/",
  "/states/virginia/auto-insurance/requirements/",
  "/states/maryland/auto-insurance/requirements/",
  "/states/washington-dc/auto-insurance/requirements/",
  "/states/virginia/auto-insurance/cost/",
  "/states/maryland/auto-insurance/cost/",
  "/states/washington-dc/renters-insurance/",
] as const;

export const MANUAL_INDEXING_PATHS = [
  "/auto-insurance/",
  "/states/virginia/",
  "/states/maryland/",
  "/states/washington-dc/",
  "/states/virginia/auto-insurance/",
  "/states/maryland/auto-insurance/",
  "/states/washington-dc/auto-insurance/",
  "/states/virginia/auto-insurance/requirements/",
  "/states/maryland/auto-insurance/requirements/",
  "/states/washington-dc/auto-insurance/requirements/",
  "/states/virginia/auto-insurance/cost/",
  "/states/maryland/auto-insurance/cost/",
] as const;

const corePaths = new Set<string>(CORE_CRAWL_PATHS);

const lowExactPaths = new Set([
  "/life-insurance/",
  "/landlord-insurance/",
]);

const lowStateGuideSlugs = new Set([
  "life-insurance",
  "umbrella-insurance",
  "landlord-insurance",
  "flood-insurance",
]);

const lowStateChildSlugs = new Set(["general-liability", "commercial-auto"]);

export function getCrawlPriorityForPage(
  page: Pick<SeoPage, "path" | "kind" | "guideSlug" | "childSlug">,
): CrawlPriority {
  if (corePaths.has(page.path)) return "core";
  if (lowExactPaths.has(page.path)) return "low";
  if (page.kind === "state-guide" && lowStateGuideSlugs.has(page.guideSlug ?? "")) {
    return "low";
  }
  if (page.kind === "state-child" && lowStateChildSlugs.has(page.childSlug ?? "")) {
    return "low";
  }
  return "supporting";
}

export function getCoreSeoPages(pages: readonly SeoPage[]): SeoPage[] {
  return pages.filter((page) => page.crawlPriority === "core");
}

export function getPromotedPagesForState(
  pages: readonly SeoPage[],
  stateSlug: string,
): SeoPage[] {
  return pages.filter(
    (page) => page.stateSlug === stateSlug && page.crawlPriority !== "low",
  );
}

export function getAutoClusterForState(
  pages: readonly SeoPage[],
  stateSlug: string,
): SeoPage[] {
  const order = new Map<string | undefined, number>([
    [undefined, 0],
    ["requirements", 1],
    ["cost", 2],
  ]);

  return pages
    .filter(
      (page) =>
        page.stateSlug === stateSlug &&
        page.categorySlug === "auto-insurance" &&
        page.guideSlug === "auto-insurance" &&
        (page.kind === "state-guide" || page.kind === "state-child") &&
        page.crawlPriority === "core",
    )
    .sort((a, b) => (order.get(a.childSlug) ?? 99) - (order.get(b.childSlug) ?? 99));
}
