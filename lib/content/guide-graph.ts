import type { SeoPage } from "@/lib/schemas";
import {
  getGuideNetwork,
  getPublishedChildren,
  getPublishedStateGuides,
  getPublicSeoPages,
  getSeoPage,
  getTopicHubForCategory,
} from "@/lib/content/seo-manifest";

export interface GuideGraphGroup {
  id: "related-questions" | "related-coverage" | "in-your-state" | "compare-jurisdictions";
  title: string;
  links: Array<{ href: string; label: string }>;
}

function descriptiveLabel(page: SeoPage): string {
  if (page.primaryKeyword) return page.primaryKeyword;
  return page.navLabel ?? page.title;
}

export function getGuideGraphGroups(page: SeoPage): GuideGraphGroup[] {
  const network = getGuideNetwork(page);
  const children = getPublishedChildren(page.path);
  const relatedQuestions = children.filter((item) =>
    ["requirements", "cost", "laws"].includes(item.childSlug ?? ""),
  );
  const inYourState =
    page.stateSlug && page.kind !== "state-hub"
      ? getPublishedStateGuides(page.stateSlug, "primary").filter(
          (item) => item.path !== page.path,
        )
      : [];
  const compareJurisdictions = getPublicSeoPages().filter(
    (item) =>
      item.path !== page.path &&
      item.guideSlug === page.guideSlug &&
      item.childSlug === page.childSlug &&
      item.kind === page.kind &&
      Boolean(item.stateSlug) &&
      item.stateSlug !== page.stateSlug,
  );
  const relatedCoverage: SeoPage[] = [];
  if (page.categorySlug) {
    const hub = getTopicHubForCategory(page.categorySlug);
    if (hub) relatedCoverage.push(hub);
  }
  if (page.parentPath) {
    const parent = getSeoPage(page.parentPath);
    if (parent && parent.kind !== "state-hub") relatedCoverage.push(parent);
  }
  for (const extra of page.relatedPaths ?? []) {
    const related = getSeoPage(extra);
    if (related) relatedCoverage.push(related);
  }

  const used = new Set<string>([page.path]);
  const take = (items: SeoPage[]) => {
    const unique: SeoPage[] = [];
    for (const item of items) {
      if (used.has(item.path)) continue;
      used.add(item.path);
      unique.push(item);
    }
    return unique;
  };

  const groups: GuideGraphGroup[] = [
    {
      id: "related-questions",
      title: "Related questions",
      links: take(relatedQuestions).map((item) => ({
        href: item.path,
        label: descriptiveLabel(item),
      })),
    },
    {
      id: "related-coverage",
      title: "Related coverage",
      links: take(relatedCoverage).map((item) => ({
        href: item.path,
        label: descriptiveLabel(item),
      })),
    },
    {
      id: "in-your-state",
      title: "In your state",
      links: take(inYourState).map((item) => ({
        href: item.path,
        label: descriptiveLabel(item),
      })),
    },
    {
      id: "compare-jurisdictions",
      title: "Compare jurisdictions",
      links: take(compareJurisdictions).map((item) => ({
        href: item.path,
        label: descriptiveLabel(item),
      })),
    },
  ];

  const leftover = network.filter((item) => !used.has(item.path));
  if (leftover.length > 0) {
    groups[1].links.push(
      ...leftover.map((item) => ({
        href: item.path,
        label: descriptiveLabel(item),
      })),
    );
  }

  return groups.filter((group) => group.links.length > 0);
}
