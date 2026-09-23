import type { Category, City } from "@/lib/schemas";
import { getSeoPage, isPublicPage } from "@/lib/content/seo-manifest";

export function shouldIndexCategory(category: Category): boolean {
  const path = getCategoryCanonicalPath(category);
  const page = getSeoPage(path);
  return Boolean(page && isPublicPage(page) && category.active && category.contentReady);
}

export function shouldIndexCity(city: City): boolean {
  if (!city.contentReady) return false;
  return shouldIndexPath(`/states/${city.stateSlug}/${city.slug}/`);
}

export function shouldIndexPath(path: string): boolean {
  const page = getSeoPage(path);
  return Boolean(page && isPublicPage(page));
}

export function getCategoryCanonicalPath(category: Category): string {
  return category.canonicalPath ?? `/${category.slug}/`;
}
