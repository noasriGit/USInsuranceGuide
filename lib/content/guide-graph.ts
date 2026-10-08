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
  if (page.crawlPriority === "core") return page.title;
  if (page.primaryKeyword) return page.primaryKeyword;
  return page.navLabel ?? page.title;
}

function linksFor(items: SeoPage[]) {
  return items.map((item) => ({
    href: item.path,
    label: descriptiveLabel(item),
  }));
}

function coreAutoGroups(page: SeoPage): GuideGraphGroup[] {
  const publicPages = getPublicSeoPages();
  const hub = getSeoPage("/auto-insurance/");
  const stateHub = page.stateSlug
    ? getSeoPage(`/states/${page.stateSlug}/`)
    : undefined;
  const parent = page.parentPath ? getSeoPage(page.parentPath) : undefined;
  const siblings = page.parentPath ? getPublishedChildren(page.parentPath) : [];
  const peers = publicPages.filter(
    (item) =>
      item.path !== page.path &&
      item.categorySlug === "auto-insurance" &&
      item.kind === page.kind &&
      item.childSlug === page.childSlug &&
      item.stateSlug !== page.stateSlug &&
      item.crawlPriority === "core",
  );

  if (page.kind === "state-guide") {
    const children = getPublishedChildren(page.path).filter(
      (item) => item.crawlPriority === "core",
    );
    const groups: GuideGraphGroup[] = [
      {
        id: "related-questions",
        title: "Requirements and cost",
        links: linksFor(children),
      },
      {
        id: "compare-jurisdictions",
        title: "DMV auto insurance network",
        links: linksFor(
          [hub, stateHub, ...peers].filter((item): item is SeoPage => Boolean(item)),
        ),
      },
    ];
    return groups.filter((group) => group.links.length > 0);
  }

  const sibling = siblings.find(
    (item) => item.path !== page.path && item.crawlPriority === "core",
  );
  const groups: GuideGraphGroup[] = [
    {
      id: "related-coverage",
      title: "Continue this state guide",
      links: linksFor(
        [parent, sibling, stateHub, hub].filter((item): item is SeoPage => Boolean(item)),
      ),
    },
    {
      id: "compare-jurisdictions",
      title: "Compare jurisdictions",
      links: linksFor(peers),
    },
  ];
  return groups.filter((group) => group.links.length > 0);
}

function capGroups(groups: GuideGraphGroup[], limit: number): GuideGraphGroup[] {
  let remaining = limit;
  return groups
    .map((group) => {
      const links = group.links.slice(0, remaining);
      remaining -= links.length;
      return { ...group, links };
    })
    .filter((group) => group.links.length > 0);
}

export function getGuideGraphGroups(page: SeoPage): GuideGraphGroup[] {
  if (page.crawlPriority === "core" && page.categorySlug === "auto-insurance") {
    return capGroups(coreAutoGroups(page), 6);
  }

  if (page.crawlPriority === "low") {
    const upward = [
      page.categorySlug ? getTopicHubForCategory(page.categorySlug) : undefined,
      page.stateSlug ? getSeoPage(`/states/${page.stateSlug}/`) : undefined,
    ].filter((item): item is SeoPage => Boolean(item && item.path !== page.path));
    return upward.length > 0
      ? [
          {
            id: "related-coverage",
            title: "Explore broader guides",
            links: linksFor(upward),
          },
        ]
      : [];
  }

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

  const populated = groups.filter((group) => group.links.length > 0);
  return page.crawlPriority === "core" ? capGroups(populated, 6) : populated;
}
