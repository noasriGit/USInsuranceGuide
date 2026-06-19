import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { ArticleCard } from "@/components/content/ArticleCard";
import { StateCard } from "@/components/content/StateCard";
import { ContentPendingNotice } from "@/components/content/ContentPendingNotice";
import {
  GuideSectionShell,
  CATEGORY_HUB_SECTIONS,
} from "@/components/content/GuideSectionShell";
import { ContextualCTA } from "@/components/monetization/ContextualCTA";
import { AdSlot } from "@/components/monetization/AdSlot";
import { buildMetadata } from "@/lib/seo/metadata";
import { shouldIndexCategory } from "@/lib/content/indexing";
import {
  getCategories,
  getCategoryBySlug,
  getArticlesByCategory,
  getStates,
  isCategorySlug,
} from "@/lib/content";
import { resolvePlacements } from "@/lib/monetization/placements";
import { RESERVED_SLUGS } from "@/lib/constants";

interface PageProps {
  params: Promise<{ categorySlug: string }>;
}

export async function generateStaticParams() {
  return getCategories(true).map((c) => ({ categorySlug: c.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category?.active) return {};

  return buildMetadata({
    title: category.metaTitle,
    description: category.metaDescription,
    path: `/${categorySlug}/`,
    noindex: !shouldIndexCategory(category),
  });
}

export default async function CategoryHubPage({ params }: PageProps) {
  const { categorySlug } = await params;

  if (RESERVED_SLUGS.has(categorySlug) || !isCategorySlug(categorySlug)) {
    notFound();
  }

  const category = getCategoryBySlug(categorySlug);
  if (!category?.active) notFound();

  const articles = getArticlesByCategory(categorySlug);
  const states = getStates();
  const partners = resolvePlacements({
    slot: "category-mid",
    categorySlug,
  });
  const isShell = !category.contentReady;

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: category.name },
        ]}
      />
      <PageHero
        title={category.name}
        description={category.shortDescription}
      />

      {isShell && (
        <div className="mt-6">
          <ContentPendingNotice topic={`${category.name} hub`} />
        </div>
      )}

      <div className="grid gap-10 py-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          {isShell ? (
            CATEGORY_HUB_SECTIONS.filter((s) => s !== "Explore by State").map(
              (section) => (
                <GuideSectionShell key={section} title={section} />
              ),
            )
          ) : null}

          <section>
            <h2 className="text-xl font-bold text-slate-900">Explore by State</h2>
            <p className="mt-2 text-sm text-slate-600">
              State-specific {category.name.toLowerCase()} guides and resources.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {states.map((state) => (
                <Link
                  key={state.slug}
                  href={`/states/${state.slug}/${categorySlug}/`}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:border-navy-200 hover:text-navy-800 transition-colors"
                >
                  {state.name} {category.name}
                </Link>
              ))}
            </div>
          </section>

          {articles.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900">Related Guides</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </section>
          )}

          <ContextualCTA partners={partners} />
        </div>

        <aside className="space-y-6">
          <AdSlot slot="category-sidebar" />
          <div>
            <h3 className="text-sm font-semibold text-slate-900">State Guides</h3>
            <div className="mt-3 space-y-3">
              {states.map((state) => (
                <StateCard key={state.slug} state={state} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
