import type { MetadataRoute } from "next";
import { SITE_URL, SHOW_INSURANCE_DIRECTORY_NAV } from "@/lib/constants";
import { getArticles, getCategories, getStates, getCities } from "@/lib/content";
import {
  shouldIndexCategory,
  shouldIndexCity,
  shouldIndexStateCategoryPage,
} from "@/lib/content/indexing";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blog/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/states/`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/editorial-policy/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/advertising-disclosure/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/insurance-disclaimer/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/contact/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/corrections/`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  if (SHOW_INSURANCE_DIRECTORY_NAV) {
    entries.push({
      url: `${SITE_URL}/insurance-agencies/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const category of getCategories(true)) {
    if (!shouldIndexCategory(category)) continue;
    entries.push({
      url: `${SITE_URL}/${category.slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
  }

  for (const state of getStates()) {
    entries.push({
      url: `${SITE_URL}/states/${state.slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });

    if (SHOW_INSURANCE_DIRECTORY_NAV) {
      entries.push({
        url: `${SITE_URL}/insurance-agencies/${state.slug}/`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    if (shouldIndexStateCategoryPage()) {
      for (const categorySlug of state.featuredCategories) {
        entries.push({
          url: `${SITE_URL}/states/${state.slug}/${categorySlug}/`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
    }

    for (const city of getCities(state.slug)) {
      if (!shouldIndexCity(city)) continue;
      entries.push({
        url: `${SITE_URL}/states/${state.slug}/${city.slug}/`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  for (const article of getArticles()) {
    entries.push({
      url: `${SITE_URL}/blog/${article.slug}/`,
      lastModified: new Date(article.updatedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  return entries;
}
