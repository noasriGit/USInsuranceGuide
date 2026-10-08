import { CORE_CRAWL_PATHS } from "../lib/content/crawl-priority";

const baseUrl = process.env.CRAWL_BASE_URL ?? "http://localhost:3000";

interface LinkRecord {
  target: string;
  anchor: string;
}

interface PageRecord {
  links: LinkRecord[];
  allLinks: LinkRecord[];
  canonical?: string;
  noindex: boolean;
}

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  return `${pathname.replace(/\/$/, "")}/`;
}

function stripHtml(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&#x27;", "'")
    .replaceAll("&quot;", '"')
    .replace(/\s+/g, " ")
    .trim();
}

function internalPath(href: string, currentUrl: string): string | null {
  try {
    const url = new URL(href, currentUrl);
    const base = new URL(baseUrl);
    if (url.host !== base.host && url.hostname !== "usinsuranceguide.com") return null;
    return normalizePath(url.pathname);
  } catch {
    return null;
  }
}

function extractLinks(html: string, currentUrl: string, mainOnly = true): LinkRecord[] {
  const source = mainOnly
    ? html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? ""
    : html;
  const links: LinkRecord[] = [];
  for (const match of source.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const target = internalPath(match[1], currentUrl);
    if (target) links.push({ target, anchor: stripHtml(match[2]) });
  }
  return links;
}

async function main() {
  const sitemapResponse = await fetch(new URL("/sitemap.xml", baseUrl));
  if (!sitemapResponse.ok) throw new Error(`Unable to fetch sitemap: ${sitemapResponse.status}`);
  const sitemap = await sitemapResponse.text();
  const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) =>
    normalizePath(new URL(match[1]).pathname),
  );
  const pathSet = new Set(paths);
  const pages = new Map<string, PageRecord>();

  for (const path of paths) {
    const response = await fetch(new URL(path, baseUrl));
    if (!response.ok) throw new Error(`${path} returned ${response.status}`);
    const html = await response.text();
    pages.set(path, {
      links: extractLinks(html, new URL(path, baseUrl).toString()),
      allLinks: extractLinks(html, new URL(path, baseUrl).toString(), false),
      canonical: html.match(/<link rel="canonical" href="([^"]+)"/)?.[1],
      noindex: /<meta name="robots" content="[^"]*noindex/i.test(html),
    });
  }

  const inbound = new Map(paths.map((path) => [path, [] as Array<{ source: string; anchors: string[] }>]));
  for (const [source, page] of pages) {
    const grouped = new Map<string, Set<string>>();
    for (const link of page.links) {
      if (!pathSet.has(link.target)) continue;
      const anchors = grouped.get(link.target) ?? new Set<string>();
      anchors.add(link.anchor);
      grouped.set(link.target, anchors);
    }
    for (const [target, anchors] of grouped) {
      inbound.get(target)?.push({ source, anchors: [...anchors] });
    }
  }

  function calculateDepths(linkKey: "links" | "allLinks") {
    const depths = new Map<string, number>([["/", 0]]);
    const queue = ["/"];
    while (queue.length > 0) {
      const source = queue.shift() as string;
      for (const link of pages.get(source)?.[linkKey] ?? []) {
        if (!pathSet.has(link.target) || depths.has(link.target)) continue;
        depths.set(link.target, (depths.get(source) ?? 0) + 1);
        queue.push(link.target);
      }
    }
    return depths;
  }
  const contextualDepths = calculateDepths("links");
  const allDepths = calculateDepths("allLinks");

  const errors: string[] = [];
  if (paths.length !== 88) errors.push(`Expected 88 sitemap URLs, found ${paths.length}`);
  for (const path of paths) {
    const page = pages.get(path);
    if (!page) continue;
    if (!allDepths.has(path)) errors.push(`Orphaned sitemap URL: ${path}`);
    if (page.noindex) errors.push(`Unexpected noindex: ${path}`);
    const expectedCanonical = `https://usinsuranceguide.com${path}`;
    if (page.canonical !== expectedCanonical) {
      errors.push(`Canonical mismatch for ${path}: ${page.canonical ?? "missing"}`);
    }
  }
  for (const path of CORE_CRAWL_PATHS) {
    if ((contextualDepths.get(path) ?? Number.POSITIVE_INFINITY) > 2) {
      errors.push(`Core page exceeds contextual depth 2: ${path}`);
    }
  }

  const report = paths
    .map((path) => ({
      path,
      depth: allDepths.get(path) ?? null,
      contextualDepth: contextualDepths.get(path) ?? null,
      contextualInbound: inbound.get(path)?.length ?? 0,
      highLevelSources: (inbound.get(path) ?? [])
        .filter(({ source }) =>
          [
            "/",
            "/states/",
            "/auto-insurance/",
            "/states/maryland/",
            "/states/virginia/",
            "/states/washington-dc/",
          ].includes(source),
        )
        .map(({ source, anchors }) => ({ source, anchors })),
    }))
    .sort((a, b) => (a.depth ?? 99) - (b.depth ?? 99) || a.path.localeCompare(b.path));

  console.table(
    report.map(({ path, depth, contextualDepth, contextualInbound }) => ({
      path,
      depth,
      contextualDepth,
      contextualInbound,
    })),
  );
  console.log(JSON.stringify({ baseUrl, urlCount: paths.length, corePaths: report.filter((row) => CORE_CRAWL_PATHS.includes(row.path as never)) }, null, 2));

  if (errors.length > 0) {
    for (const error of errors) console.error(`error ${error}`);
    process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
