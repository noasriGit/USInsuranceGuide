import "server-only";
import type { SeoPage } from "@/lib/schemas";
import { getArticleBySlug } from "@/lib/content/articles";
import { getStateCategoryGuide } from "@/lib/content/state-guides";
import { getCategoryBySlug } from "@/lib/content/data";

export function resolveSeoPageContent(page: SeoPage) {
  const source = page.contentSource;
  if (!source) return { type: "none" as const };

  if (source.type === "article" && source.slug) {
    const article = getArticleBySlug(source.slug);
    return article
      ? { type: "article" as const, article }
      : { type: "missing" as const };
  }

  if (source.type === "state-guide" && page.stateSlug && source.categorySlug) {
    const guide = getStateCategoryGuide(page.stateSlug, source.categorySlug);
    return guide
      ? { type: "state-guide" as const, guide }
      : { type: "missing" as const };
  }

  if (source.type === "hub" && source.categorySlug) {
    const category = getCategoryBySlug(source.categorySlug);
    return category
      ? { type: "hub" as const, category }
      : { type: "missing" as const };
  }

  return { type: "none" as const };
}
