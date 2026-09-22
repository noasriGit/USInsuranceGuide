import Link from "next/link";
import { ArticleCard } from "@/components/content/ArticleCard";
import { GuideNetwork } from "@/components/content/GuideNetwork";
import { PublicCaseStudySection } from "@/components/content/PublicCaseStudySection";
import { LeadCTA } from "@/components/leads/LeadCTA";
import { ContextualCTA } from "@/components/monetization/ContextualCTA";
import { AdSlot } from "@/components/monetization/AdSlot";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CoverageIcon, coverageVisualFromSlug } from "@/components/visual/CoverageIcon";
import type { Category, SeoPage } from "@/lib/schemas";
import {
  getArticlesForCategoryHub,
  getPublicCaseStudiesForPage,
} from "@/lib/content";
import {
  getNestedTopicGuides,
  getPublishedStateLandingsForCategory,
} from "@/lib/content/seo-manifest";
import { resolvePlacements } from "@/lib/monetization/placements";
import { inferLeadContextFromPath } from "@/lib/leads/context";
import { getStateBySlug } from "@/lib/content/data";

interface CategoryHubViewProps {
  category: Category;
  page: SeoPage;
}

export function CategoryHubView({ category, page }: CategoryHubViewProps) {
  const articles = getArticlesForCategoryHub(category);
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
  const context = inferLeadContextFromPath(page.path, page.kind);
  const caseStudies = getPublicCaseStudiesForPage({
    categorySlug: category.slug,
    limit: 1,
  });
  const ctaVariant = context.intent === "business" ? "business" : "end";

  return (
    <div className="grid gap-12 py-10 lg:grid-cols-12">
      <div className="space-y-12 lg:col-span-8">
        <p className="max-w-[46rem] text-base leading-relaxed text-slate-600">
          This {category.name.toLowerCase()} guide explains the concept, then
          connects it to the rules and coverage choices that apply in Maryland,
          Virginia, and Washington, D.C.
        </p>

        {category.interimNote && (
          <p className="max-w-[46rem] text-sm leading-relaxed text-slate-600">
            {category.interimNote}
          </p>
        )}

        {nestedGuides.length > 0 && (
          <section aria-labelledby="nested-guides-heading">
            <SectionHeading id="nested-guides-heading" title="Coverage Types" />
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {nestedGuides.map((guide) => (
                <li key={guide.path}>
                  <Link
                    href={guide.path}
                    className="surface-card surface-card-interactive flex items-center gap-3 px-4 py-4 text-sm font-medium text-navy-800"
                  >
                    <CoverageIcon
                      name={coverageVisualFromSlug(guide.categorySlug ?? guide.guideSlug)}
                      className="h-5 w-5"
                    />
                    {guide.navLabel ?? guide.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <LeadCTA context={context} variant={ctaVariant} />

        {articles.length > 0 && (
          <section aria-labelledby="category-guides-heading">
            <SectionHeading id="category-guides-heading" title={guidesHeading} />
            <div className="mt-6 grid gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          </section>
        )}

        <section aria-labelledby="explore-by-state-heading">
          <SectionHeading
            id="explore-by-state-heading"
            title="Maryland, Virginia & Washington, D.C."
            description={`State-specific ${category.name.toLowerCase()} rules and coverage considerations.`}
          />
          <ul className="mt-5 grid gap-3 sm:grid-cols-3">
            {stateLandings.map((landing) => {
              const state = landing.stateSlug
                ? getStateBySlug(landing.stateSlug)
                : undefined;
              const tint =
                landing.stateSlug === "virginia"
                  ? "tint-virginia"
                  : landing.stateSlug === "washington-dc"
                    ? "tint-dc"
                    : "tint-maryland";
              return (
                <li key={landing.path}>
                  <Link
                    href={landing.path}
                    className={`surface-card surface-card-interactive block px-4 py-5 ${tint}`}
                  >
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-navy-700">
                      {state?.name ?? landing.title}
                    </p>
                    <p className="link-arrow mt-3 text-sm">
                      {category.name} guide
                      <span data-arrow aria-hidden="true">
                        →
                      </span>
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {caseStudies.length > 0 && <PublicCaseStudySection studies={caseStudies} />}
        <GuideNetwork page={page} />
        <ContextualCTA partners={partners} />
      </div>

      <aside className="space-y-8 lg:col-span-4" aria-label="Category sidebar">
        <AdSlot slot="category-sidebar" />
        <div className="surface-card p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy-700">
            DMV Insurance Guides
          </h2>
          <ul className="mt-4 space-y-3">
            {["maryland", "virginia", "washington-dc"].map((slug) => {
              const state = getStateBySlug(slug);
              if (!state) return null;
              return (
                <li key={state.slug}>
                  <Link
                    href={`/states/${state.slug}/`}
                    className="text-sm font-medium text-navy-800 hover:underline"
                  >
                    {state.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
}
