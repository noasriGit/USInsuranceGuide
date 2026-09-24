import Link from "next/link";
import type { Article } from "@/lib/schemas";
import { getHrefForArticleSlug } from "@/lib/content/seo-manifest";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { coverageVisualFromSlug, CoverageIcon } from "@/components/visual/CoverageIcon";

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
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  const visual = coverageVisualFromSlug(article.category);

  return (
    <article className={cn("h-full", className)}>
      <Link
        href={getHrefForArticleSlug(article.slug)}
        className="surface-card surface-card-interactive flex h-full flex-col overflow-hidden p-5 sm:p-6"
      >
        <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-navy-700">
          <CoverageIcon name={visual} className="h-4 w-4" />
          {categoryLabel(article.category)}
        </p>
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-ink">{article.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{article.excerpt}</p>
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
      </Link>
    </article>
  );
}
