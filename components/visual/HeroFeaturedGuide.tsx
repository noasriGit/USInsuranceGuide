import Link from "next/link";
import type { Article } from "@/lib/schemas";
import { getHrefForArticleSlug } from "@/lib/content/seo-manifest";
import { formatDate } from "@/lib/utils";
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

interface HeroFeaturedGuideProps {
  article: Article;
  className?: string;
}

export function HeroFeaturedGuide({ article, className }: HeroFeaturedGuideProps) {
  const visual = coverageVisualFromSlug(article.category);

  return (
    <article className={className}>
      <Link
        href={getHrefForArticleSlug(article.slug)}
        className="group flex min-h-[22rem] flex-col rounded-[var(--radius-card)] border border-white/15 bg-white/8 p-6 no-underline backdrop-blur-sm transition-[background-color,border-color] duration-200 ease-out hover:border-white/25 hover:bg-white/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:p-8"
      >
        <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/75">
          <CoverageIcon name={visual} className="h-4 w-4 text-white/80" />
          {categoryLabel(article.category)}
        </p>
        <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-[1.75rem]">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-base leading-relaxed text-slate-200">
          {article.excerpt}
        </p>
        <p className="mt-auto flex items-center justify-between pt-8 text-xs text-white/60">
          <span>
            <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
            {" · "}
            {article.readingTime} min read
          </span>
          <span className="inline-flex items-center gap-[0.35rem] text-sm font-semibold text-white">
            Read guide
            <span
              aria-hidden="true"
              className="transition-transform duration-200 ease-out group-hover:translate-x-0.5"
            >
              →
            </span>
          </span>
        </p>
      </Link>
    </article>
  );
}
