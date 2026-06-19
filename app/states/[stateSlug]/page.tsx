import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { ArticleCard } from "@/components/content/ArticleCard";
import { ContextualCTA } from "@/components/monetization/ContextualCTA";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  getStates,
  getStateBySlug,
  getArticlesByState,
  getCategories,
  getCities,
} from "@/lib/content";
import { resolvePlacements } from "@/lib/monetization/placements";

interface PageProps {
  params: Promise<{ stateSlug: string }>;
}

export async function generateStaticParams() {
  return getStates().map((s) => ({ stateSlug: s.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) return {};

  return buildMetadata({
    title: state.metaTitle,
    description: state.metaDescription,
    path: `/states/${stateSlug}/`,
  });
}

export default async function StateHubPage({ params }: PageProps) {
  const { stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) notFound();

  const articles = getArticlesByState(stateSlug);
  const categories = getCategories(true).filter((c) =>
    state.featuredCategories.includes(c.slug),
  );
  const cities = getCities(stateSlug);
  const partners = resolvePlacements({
    slot: "state-hub-card",
    stateSlug,
  });

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "State Guides", href: "/states/" },
          { label: state.name },
        ]}
      />
      <PageHero title={`${state.name} Insurance Guides`} description={state.overview} />

      <div className="grid gap-10 py-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="text-xl font-bold text-slate-900">Insurance Categories</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/states/${stateSlug}/${category.slug}/`}
                  className="rounded-lg border border-slate-200 bg-white p-4 hover:border-navy-200 hover:shadow-sm transition-all"
                >
                  <h3 className="font-semibold text-slate-900">{category.name}</h3>
                  <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                    {category.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {articles.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900">{state.name} Guides</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </section>
          )}

          {cities.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900">Local Guides</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/states/${stateSlug}/${city.slug}/`}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 hover:border-navy-200"
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section>
            <Link
              href={`/insurance-agencies/${stateSlug}/`}
              className="inline-flex items-center text-sm font-medium text-navy-700 hover:text-navy-900"
            >
              Find insurance professionals in {state.name} →
            </Link>
          </section>

          <ContextualCTA partners={partners} />
        </div>

        <aside>
          {state.externalSources && state.externalSources.length > 0 && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-sm font-semibold text-slate-900">Official Resources</h3>
              <ul className="mt-3 space-y-2">
                {state.externalSources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-navy-700 underline hover:text-navy-900"
                    >
                      {source.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </Container>
  );
}
