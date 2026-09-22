import Link from "next/link";
import type { Article } from "@/lib/schemas";
import { getHrefForArticleSlug } from "@/lib/content/seo-manifest";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { coverageVisualFromSlug, coverageTintClass, CoverageIcon } from "@/components/visual/CoverageIcon";

function categoryLabel(slug: string): string {
  const labels: Record<string, string> = {
    "auto-insurance": "Auto Insurance",
    "home-insurance": "Home Insurance",
    "renters-insurance": "Renters Insurance",
    "business-insurance": "Business Insurance",
    "umbrella-insurance": "Umbrella",
    "flood-insurance": "Flood Insurance",
    "life-insurance": "Life Insurance",
  };
  return labels[slug] ?? slug.replace(/-/g, " ");
}

interface ArticleCardProps {
  article: Article;
  className?: string;
  featured?: boolean;
}

export function ArticleCard({ article, className, featured = false }: ArticleCardProps) {
  const visual = coverageVisualFromSlug(article.category);

  return (
    <article className={cn(!featured && "h-full", className)}>
      <Link
        href={getHrefForArticleSlug(article.slug)}
        className={cn(
          "surface-card surface-card-interactive flex flex-col overflow-hidden",
          !featured && "h-full p-5 sm:p-6",
        )}
      >
        {featured && (
          <div className={cn("px-6 py-7 sm:px-8", coverageTintClass(visual))}>
            <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-navy-700">
              <CoverageIcon name={visual} className="h-5 w-5" />
              {categoryLabel(article.category)}
            </p>
            <CoverageIcon name={visual} className="mt-6 h-12 w-12 text-navy-700/80" />
          </div>
        )}
        <div className={cn("flex flex-1 flex-col", featured ? "p-6 sm:p-8" : undefined)}>
          {!featured && (
            <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-navy-700">
              <CoverageIcon name={visual} className="h-4 w-4" />
              {categoryLabel(article.category)}
            </p>
          )}
          <h3
            className={cn(
              "font-semibold tracking-tight text-ink",
              featured ? "text-2xl sm:text-[1.75rem]" : "mt-3 text-lg",
            )}
          >
            {article.title}
          </h3>
          <p className={cn("mt-2 leading-relaxed text-slate-600", featured ? "text-base" : "text-sm")}>
            {article.excerpt}
          </p>
          <p className="mt-auto flex items-center justify-between pt-5 text-xs text-slate-500">
            <span>
              <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
              {" · "}
              {article.readingTime} min read
            </span>
            <span className="link-arrow text-xs">
              <span data-arrow aria-hidden="true">
                →
              </span>
            </span>
          </p>
        </div>
      </Link>
    </article>
  );
}
