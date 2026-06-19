import type { Category, City } from "@/lib/schemas";
import { INDEX_STATE_CATEGORY_SHELLS } from "@/lib/constants";
import { getCategories } from "@/lib/content/data";

export function shouldIndexCategory(category: Category): boolean {
  return category.active && category.contentReady;
}

export function shouldIndexCity(city: City): boolean {
  return city.contentReady;
}

export function shouldIndexStateCategoryPage(): boolean {
  return INDEX_STATE_CATEGORY_SHELLS;
}

export function getActiveCategorySlugs(): string[] {
  return getCategories(true).map((c) => c.slug);
}
