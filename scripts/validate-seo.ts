import fs from "node:fs";
import path from "node:path";
import {
  SEO_PAGES,
  getHrefForArticleSlug,
  getPermanentRedirects,
  getPublicSeoPages,
  getTopicHubForCategory,
  isPublicPage,
} from "../lib/content/seo-manifest";
import {
  CORE_CRAWL_PATHS,
  MANUAL_INDEXING_PATHS,
  getAutoClusterForState,
} from "../lib/content/crawl-priority";
import { getGuideGraphGroups } from "../lib/content/guide-graph";

const ROOT = path.join(__dirname, "..");
const errors: string[] = [];

function fail(message: string) {
  errors.push(message);
}

function normalizePath(href: string): string | null {
  if (!href.startsWith("/") || href.startsWith("//")) return null;
  const [pathname] = href.split(/[?#]/);
  if (!pathname || pathname.includes("${") || pathname.includes("[") || pathname.endsWith("...")) {
    return null;
  }
  if (pathname.startsWith("/images/") || pathname.startsWith("/icons/")) return null;
  return pathname.endsWith("/") || pathname.includes(".") ? pathname : `${pathname}/`;
}

function walkFiles(dir: string, extensions: string[]): string[] {
  if (!fs.existsSync(dir)) return [];
  const results: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (["node_modules", ".next", "dist"].includes(entry.name)) continue;
      results.push(...walkFiles(full, extensions));
    } else if (extensions.includes(path.extname(entry.name))) {
      results.push(full);
    }
  }
  return results;
}

function extractInternalHrefs(filePath: string): string[] {
  const text = fs.readFileSync(filePath, "utf8");
  const matches = [
    ...text.matchAll(/\]\((\/[^)\s]+)\)/g),
    ...text.matchAll(/href=["'`](\/[^"'`]+)["'`]/g),
    ...text.matchAll(/url:\s*["'`]https:\/\/usinsuranceguide\.com(\/[^"'`]+)["'`]/g),
  ];
  return matches
    .map((match) => normalizePath(match[1] ?? ""))
    .filter((href): href is string => Boolean(href));
}

const articleSlugs = fs
  .readdirSync(path.join(ROOT, "content/articles"))
  .filter((name) => name.endsWith(".md"))
  .map((name) => name.replace(/\.md$/, ""));

const caseStudySlugs = fs
  .readFileSync(path.join(ROOT, "content/data/public-case-studies.ts"), "utf8")
  .matchAll(/slug:\s*"([^"]+)"/g);

const extraValidPaths = new Set<string>([
  "/insurance-agencies/",
  "/public-case-studies/",
]);
for (const match of caseStudySlugs) {
  extraValidPaths.add(`/public-case-studies/${match[1]}/`);
}
for (const slug of articleSlugs) {
  extraValidPaths.add(getHrefForArticleSlug(slug));
}

const pagesByPath = new Map(SEO_PAGES.map((page) => [page.path, page]));
const publicPages = getPublicSeoPages();
const publicPageByPath = new Map(publicPages.map((page) => [page.path, page]));
const redirectSources = new Map(
  getPermanentRedirects().map((item) => [
    item.source.endsWith("/") ? item.source : `${item.source}/`,
    item.destination.endsWith("/") ? item.destination : `${item.destination}/`,
  ]),
);

const inbound = new Map<string, Set<string>>();
function addInbound(from: string, to: string) {
  if (from === to) return;
  const set = inbound.get(to) ?? new Set<string>();
  set.add(from);
  inbound.set(to, set);
}

for (const page of SEO_PAGES) {
  if (page.parentPath) addInbound(page.parentPath, page.path);
  if (page.categorySlug) {
    const hub = getTopicHubForCategory(page.categorySlug);
    if (hub) addInbound(page.path, hub.path);
  }
  for (const related of page.relatedPaths ?? []) {
    addInbound(page.path, related);
  }
}

if (publicPages.filter((page) => page.crawlPriority === "core").length !== CORE_CRAWL_PATHS.length) {
  fail(`Expected exactly ${CORE_CRAWL_PATHS.length} core crawl-priority pages`);
}

for (const path of CORE_CRAWL_PATHS) {
  const page = publicPageByPath.get(path);
  if (!page) {
    fail(`Core crawl-priority path is not public: ${path}`);
  } else if (page.crawlPriority !== "core") {
    fail(`Core crawl-priority path is misclassified: ${path}`);
  } else {
    const relatedCount = getGuideGraphGroups(page).reduce(
      (total, group) => total + group.links.length,
      0,
    );
    if (relatedCount > 6) {
      fail(`Core page has more than six guide-network links: ${path}`);
    }
  }
}

for (const page of publicPages.filter((item) => item.crawlPriority === "low")) {
  const crossLinkedLowPage = getGuideGraphGroups(page)
    .flatMap((group) => group.links)
    .map((link) => publicPageByPath.get(link.href))
    .find(
      (linked) =>
        linked?.crawlPriority === "low" &&
        Boolean(page.stateSlug) &&
        Boolean(linked.stateSlug) &&
        linked.stateSlug !== page.stateSlug,
    );
  if (crossLinkedLowPage) {
    fail(`Low-priority page cross-links another low-priority page: ${page.path} -> ${crossLinkedLowPage.path}`);
  }
}

for (const path of MANUAL_INDEXING_PATHS) {
  if (publicPageByPath.get(path)?.crawlPriority !== "core") {
    fail(`Manual-indexing path is not a public core page: ${path}`);
  }
}

for (const stateSlug of ["maryland", "virginia", "washington-dc"]) {
  const cluster = getAutoClusterForState(publicPages, stateSlug);
  const expectedChildren = stateSlug === "washington-dc" ? ["requirements"] : ["requirements", "cost"];
  if (cluster[0]?.kind !== "state-guide") {
    fail(`Auto cluster for ${stateSlug} does not start with its state guide`);
  }
  for (const childSlug of expectedChildren) {
    if (!cluster.some((page) => page.childSlug === childSlug)) {
      fail(`Auto cluster for ${stateSlug} is missing ${childSlug}`);
    }
  }
}

const earliestPublicationDate = "2026-06-19";
for (const file of [
  ...walkFiles(path.join(ROOT, "content", "articles"), [".md"]),
  ...walkFiles(path.join(ROOT, "content", "state-guides"), [".md"]),
]) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(/^(publishedAt|updatedAt):\s*["'](\d{4}-\d{2}-\d{2})["']/gm)) {
    if (match[2] < earliestPublicationDate) {
      fail(`${path.relative(ROOT, file)} has ${match[1]} before repository publication: ${match[2]}`);
    }
  }
}

const scannedFiles = [
  ...walkFiles(path.join(ROOT, "content"), [".md"]),
  ...walkFiles(path.join(ROOT, "app"), [".ts", ".tsx"]),
  ...walkFiles(path.join(ROOT, "components"), [".ts", ".tsx"]),
  ...walkFiles(path.join(ROOT, "lib"), [".ts", ".tsx"]),
];

for (const file of scannedFiles) {
  const rel = path.relative(ROOT, file).replaceAll("\\", "/");
  for (const href of extractInternalHrefs(file)) {
    if (href.includes(".")) continue;
    const redirectTo = redirectSources.get(href);
    if (redirectTo) {
      fail(`${rel} links to redirected URL ${href} instead of ${redirectTo}`);
      continue;
    }
    const dest = pagesByPath.get(href);
    if (dest) {
      if (!isPublicPage(dest) && dest.status !== "published") {
        fail(`${rel} links to unpublished URL ${href} (${dest.status})`);
      }
      addInbound(rel, href);
      continue;
    }
    if (extraValidPaths.has(href)) {
      addInbound(rel, href);
      continue;
    }
    fail(`${rel} links to nonexistent route ${href}`);
  }
}

const neverOrphan = new Set(["/", "/blog/", "/states/", "/get-insurance-help/", "/public-case-studies/"]);
for (const page of publicPages) {
  if (neverOrphan.has(page.path)) continue;
  if (page.kind === "static") continue;
  const links = inbound.get(page.path);
  if (!links || links.size === 0) {
    fail(`Orphaned public SEO page: ${page.path}`);
  }
  if (page.status === "published" && page.indexable === false) {
    fail(`Published page marked noindex: ${page.path}`);
  }
}

for (const page of SEO_PAGES) {
  if (page.status !== "published" && page.indexable) {
    fail(`Non-published page is indexable: ${page.path}`);
  }
}

const keywordOwners = new Map<string, string[]>();
for (const page of publicPages) {
  if (!page.primaryKeyword) continue;
  const key = page.primaryKeyword.toLowerCase();
  const list = keywordOwners.get(key) ?? [];
  list.push(page.path);
  keywordOwners.set(key, list);
}
for (const [keyword, paths] of keywordOwners) {
  if (paths.length > 1) {
    fail(`Duplicate primary intent "${keyword}": ${paths.join(", ")}`);
  }
}

const sitemapPaths = new Set(publicPages.map((page) => page.path));
for (const page of publicPages) {
  if (!sitemapPaths.has(page.path)) {
    fail(`Public page missing from sitemap set: ${page.path}`);
  }
}
for (const page of SEO_PAGES) {
  if (!isPublicPage(page) && page.status !== "published") {
    if (page.indexable) fail(`Draft/planned page would be sitemap-eligible: ${page.path}`);
  }
}

const missingArticleSources = publicPages.filter((page) => {
  if (page.contentSource?.type !== "article" || !page.contentSource.slug) return false;
  return !articleSlugs.includes(page.contentSource.slug);
});
for (const page of missingArticleSources) {
  fail(
    `${page.path} points at missing article ${page.contentSource?.slug}`,
  );
}

if (errors.length) {
  console.error(`SEO validation failed (${errors.length})`);
  for (const error of errors) console.error(`  error ${error}`);
  process.exit(1);
}

console.log(
  `SEO validation passed. ${publicPages.length} public pages, ${SEO_PAGES.length} manifest entries, ${scannedFiles.length} files scanned.`,
);
