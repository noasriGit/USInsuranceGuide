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
