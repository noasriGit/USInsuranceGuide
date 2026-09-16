import Link from "next/link";
import { ArticleCard } from "@/components/content/ArticleCard";
import { StateCard } from "@/components/content/StateCard";
import { GuideNetwork } from "@/components/content/GuideNetwork";
import { ContextualCTA } from "@/components/monetization/ContextualCTA";
import { AdSlot } from "@/components/monetization/AdSlot";
import type { Category, SeoPage } from "@/lib/schemas";
import {
  getArticlesForCategoryHub,
  getStates,
  getStateBySlug,
} from "@/lib/content";
import {
  getNestedTopicGuides,
  getPublishedStateLandingsForCategory,
} from "@/lib/content/seo-manifest";
import { resolvePlacements } from "@/lib/monetization/placements";

interface CategoryHubViewProps {
  category: Category;
  page: SeoPage;
}

export function CategoryHubView({ category, page }: CategoryHubViewProps) {
  const articles = getArticlesForCategoryHub(category);
  const states = getStates();
  const stateLandings = getPublishedStateLandingsForCategory(category.slug);
  const nestedGuides = getNestedTopicGuides(page.path);
  const partners = resolvePlacements({
    slot: "category-mid",
    categorySlug: category.slug,
  });
  const hasFeatured = (category.featuredArticleSlugs?.length ?? 0) > 0;
  const guidesHeading =
    hasFeatured && articles.length <= (category.featuredArticleSlugs?.length ?? 0)
      ? "Featured Guide"
      : "Related Guides";

  return (
    <div className="grid gap-10 py-10 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-10">
        <p className="max-w-3xl text-base leading-relaxed text-slate-600">
          This {category.name.toLowerCase()} guide explains the concept, then
          connects it to the rules and coverage choices that apply in Maryland,
          Virginia, and Washington, D.C.
        </p>

        {category.interimNote && (
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
            {category.interimNote}
          </p>
        )}

        {nestedGuides.length > 0 && (
          <section aria-labelledby="nested-guides-heading">
            <h2 id="nested-guides-heading" className="text-xl font-bold text-slate-900">
              Coverage Types
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {nestedGuides.map((guide) => (
                <Link
                  key={guide.path}
                  href={guide.path}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 underline-offset-2 hover:border-navy-200 hover:text-navy-800 hover:underline transition-colors"
                >
                  {guide.navLabel ?? guide.title}
                </Link>
              ))}
            </div>
          </section>
        )}

        {articles.length > 0 && (
          <section aria-labelledby="category-guides-heading">
            <h2 id="category-guides-heading" className="text-xl font-bold text-slate-900">
              {guidesHeading}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="explore-by-state-heading">
          <h2 id="explore-by-state-heading" className="text-xl font-bold text-slate-900">
            Maryland, Virginia & Washington, D.C.
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            State-specific {category.name.toLowerCase()} rules and coverage
            considerations.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {stateLandings.map((landing) => {
              const state = landing.stateSlug
                ? getStateBySlug(landing.stateSlug)
                : undefined;
              return (
                <Link
                  key={landing.path}
                  href={landing.path}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 underline-offset-2 hover:border-navy-200 hover:text-navy-800 hover:underline transition-colors"
                >
                  {landing.navLabel
                    ? `${state?.name ?? landing.title}`
                    : landing.title}
                </Link>
              );
            })}
          </div>
        </section>

        <GuideNetwork page={page} />
        <ContextualCTA partners={partners} />
      </div>

      <aside className="space-y-6" aria-label="Category sidebar">
        <AdSlot slot="category-sidebar" />
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            DMV Insurance Guides
          </h3>
          <div className="mt-3 space-y-3">
            {states.map((state) => (
              <StateCard key={state.slug} state={state} />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
