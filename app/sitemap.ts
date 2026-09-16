import type { MetadataRoute } from "next";
import { SITE_URL, SHOW_INSURANCE_DIRECTORY_NAV } from "@/lib/constants";
import { getBlogArticles, getPublicSeoPages } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  for (const page of getPublicSeoPages()) {
    seen.add(page.path);
    entries.push({
      url: `${SITE_URL}${page.path}`,
      lastModified: new Date(page.lastModified),
      changeFrequency: page.changeFrequency ?? "monthly",
      priority: page.priority ?? 0.5,
    });
  }

  if (SHOW_INSURANCE_DIRECTORY_NAV) {
    entries.push({
      url: `${SITE_URL}/insurance-agencies/`,
      lastModified: new Date("2026-06-19"),
      changeFrequency: "monthly",
      priority: 0.4,
    });
  }

  for (const article of getBlogArticles()) {
    const path = `/blog/${article.slug}/`;
    if (seen.has(path)) continue;
    entries.push({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
