import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { ArticleDisclaimer } from "@/components/compliance/ArticleDisclaimer";
import { LicensedProfessionalCTA } from "@/components/compliance/LicensedProfessionalCTA";
import { ContextualCTA } from "@/components/monetization/ContextualCTA";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  getStates,
  getStateBySlug,
  resolveSegmentSlug,
  getArticlesByCategory,
  getArticlesByState,
} from "@/lib/content";
import { resolvePlacements } from "@/lib/monetization/placements";

interface PageProps {
  params: Promise<{ stateSlug: string; segmentSlug: string }>;
}

export async function generateStaticParams() {
  const states = getStates();
  const params: { stateSlug: string; segmentSlug: string }[] = [];

  for (const state of states) {
    for (const categorySlug of state.featuredCategories) {
      params.push({ stateSlug: state.slug, segmentSlug: categorySlug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps) {
  const { stateSlug, segmentSlug } = await params;
  const state = getStateBySlug(stateSlug);
  const resolved = state ? resolveSegmentSlug(stateSlug, segmentSlug) : null;
  if (!state || !resolved) return {};

  if (resolved.type === "category") {
    return buildMetadata({
      title: `${state.name} ${resolved.data.name} Guide`,
      description: `Educational ${resolved.data.name.toLowerCase()} guide for ${state.name}. General information on coverage options and state considerations.`,
      path: `/states/${stateSlug}/${segmentSlug}/`,
    });
  }

  return buildMetadata({
    title: resolved.data.metaTitle,
    description: resolved.data.metaDescription,
    path: `/states/${stateSlug}/${segmentSlug}/`,
  });
}

export default async function StateSegmentPage({ params }: PageProps) {
  const { stateSlug, segmentSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) notFound();

  const resolved = resolveSegmentSlug(stateSlug, segmentSlug);
  if (!resolved) notFound();

  const partners = resolvePlacements({
    slot: "state-hub-card",
    stateSlug,
    categorySlug: resolved.type === "category" ? segmentSlug : undefined,
  });

  if (resolved.type === "city") {
    const city = resolved.data;
    return (
      <Container className="py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "State Guides", href: "/states/" },
            { label: state.name, href: `/states/${stateSlug}/` },
            { label: city.name },
          ]}
        />
        <PageHero
          title={`${city.name} Insurance Guide`}
          description={city.metaDescription}
        />
        <div className="py-10 max-w-3xl space-y-8">
          <section>
            <h2 className="text-xl font-bold text-slate-900">Coverage Considerations</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
              {city.coverageConsiderations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900">Related Guides</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {city.relatedCategories.map((catSlug) => (
                <Link
                  key={catSlug}
                  href={`/states/${stateSlug}/${catSlug}/`}
                  className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-navy-700 hover:bg-slate-50"
                >
                  {catSlug.replace(/-/g, " ")}
                </Link>
              ))}
            </div>
          </section>
          <LicensedProfessionalCTA />
          <ArticleDisclaimer />
        </div>
      </Container>
    );
  }

  const category = resolved.data;
  const stateArticles = getArticlesByState(stateSlug).filter(
    (a) => a.category === category.slug,
  );
  const categoryArticles = getArticlesByCategory(category.slug).slice(0, 4);

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: category.name, href: `/${category.slug}/` },
          { label: "State Guides", href: "/states/" },
          { label: state.name, href: `/states/${stateSlug}/` },
          { label: `${state.name} ${category.name}` },
        ]}
      />
      <PageHero
        title={`${state.name} ${category.name}`}
        description={`Educational guide to ${category.name.toLowerCase()} in ${state.name}. General information on coverage options and factors to consider.`}
      />

      <div className="py-10 max-w-3xl space-y-8">
        <p className="text-slate-600 leading-relaxed">
          {category.name} requirements and options in {state.name} may differ from other states.
          This page provides general educational information. Speak with a licensed insurance
          professional in {state.name} for guidance specific to your situation.
        </p>

        {(stateArticles.length > 0 || categoryArticles.length > 0) && (
          <section>
            <h2 className="text-xl font-bold text-slate-900">Related Guides</h2>
            <ul className="mt-4 space-y-2">
              {[...stateArticles, ...categoryArticles]
                .filter(
                  (a, i, arr) => arr.findIndex((b) => b.slug === a.slug) === i,
                )
                .slice(0, 6)
                .map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/blog/${article.slug}/`}
                      className="text-navy-700 underline hover:text-navy-900"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        )}

        <Link
          href={`/insurance-agencies/${stateSlug}/`}
          className="inline-flex text-sm font-medium text-navy-700 hover:text-navy-900"
        >
          Local insurance resources in {state.name} →
        </Link>

        <ContextualCTA partners={partners} />
        <LicensedProfessionalCTA />
        <ArticleDisclaimer />
      </div>
    </Container>
  );
}
