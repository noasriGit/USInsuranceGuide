import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { ArticleCard } from "@/components/content/ArticleCard";
import { ContentPendingNotice } from "@/components/content/ContentPendingNotice";
import {
  GuideSectionShell,
  STATE_CATEGORY_BODY_SECTIONS,
  STATE_CATEGORY_GUIDE_SECTIONS,
  LOCAL_GUIDE_SECTIONS,
} from "@/components/content/GuideSectionShell";
import { Prose } from "@/components/content/Prose";
import { FAQSection } from "@/components/content/FAQSection";
import { SourcesList } from "@/components/content/SourcesList";
import { ArticleDisclaimer } from "@/components/compliance/ArticleDisclaimer";
import { LicensedProfessionalCTA } from "@/components/compliance/LicensedProfessionalCTA";
import { ContextualCTA } from "@/components/monetization/ContextualCTA";
import { SHOW_INSURANCE_DIRECTORY_NAV } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  shouldIndexCity,
  shouldIndexStateCategoryPage,
} from "@/lib/content/indexing";
import {
  getCategories,
  getCities,
  getStates,
  getStateBySlug,
  resolveSegmentSlug,
  getArticlesByCategory,
  getArticlesByState,
  getStateCategoryGuide,
} from "@/lib/content";
import { resolvePlacements } from "@/lib/monetization/placements";

interface PageProps {
  params: Promise<{ stateSlug: string; segmentSlug: string }>;
}

export async function generateStaticParams() {
  const states = getStates();
  const categories = getCategories(true);
  const params: { stateSlug: string; segmentSlug: string }[] = [];

  for (const state of states) {
    for (const category of categories) {
      params.push({ stateSlug: state.slug, segmentSlug: category.slug });
    }
    for (const city of getCities(state.slug)) {
      params.push({ stateSlug: state.slug, segmentSlug: city.slug });
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
    const guide = getStateCategoryGuide(stateSlug, segmentSlug);
    return buildMetadata({
      title: guide?.metaTitle ?? `${state.name} ${resolved.data.name} Guide`,
      description:
        guide?.metaDescription ??
        `Educational ${resolved.data.name.toLowerCase()} guide for ${state.name}. General information on coverage options and state considerations.`,
      path: `/states/${stateSlug}/${segmentSlug}/`,
      noindex: !shouldIndexStateCategoryPage(),
    });
  }

  return buildMetadata({
    title: resolved.data.metaTitle,
    description: resolved.data.metaDescription,
    path: `/states/${stateSlug}/${segmentSlug}/`,
    noindex: !shouldIndexCity(resolved.data),
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
          <ContentPendingNotice topic={`${city.name} local guide`} />

          {LOCAL_GUIDE_SECTIONS.map((section) => (
            <GuideSectionShell key={section} title={section} />
          ))}

          <section>
            <h2 className="text-xl font-bold text-slate-900">Related Category Guides</h2>
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
  const guide = getStateCategoryGuide(stateSlug, category.slug);
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
        description={
          guide?.metaDescription ??
          `Educational guide to ${category.name.toLowerCase()} in ${state.name}. General information on coverage options and factors to consider.`
        }
      />

      <div className="py-10 max-w-3xl space-y-8">
        {!guide && (
          <ContentPendingNotice
            topic={`${state.name} ${category.name.toLowerCase()} guide`}
          />
        )}

        {guide
          ? STATE_CATEGORY_BODY_SECTIONS.map((section) => (
              <GuideSectionShell key={section} title={section} pending={false}>
                <Prose content={guide.sections[section]} />
              </GuideSectionShell>
            ))
          : STATE_CATEGORY_GUIDE_SECTIONS.map((section) => (
              <GuideSectionShell key={section} title={section} />
            ))}

        {guide?.faq && guide.faq.length > 0 && (
          <FAQSection faqs={guide.faq} className="mt-0" />
        )}

        {guide?.sources && guide.sources.length > 0 && (
          <SourcesList sources={guide.sources} className="mt-0" />
        )}

        {(stateArticles.length > 0 || categoryArticles.length > 0) && (
          <section>
            <h2 className="text-xl font-bold text-slate-900">Related Published Guides</h2>
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

        {SHOW_INSURANCE_DIRECTORY_NAV && (
          <Link
            href={`/insurance-agencies/${stateSlug}/`}
            className="inline-flex text-sm font-medium text-navy-700 hover:text-navy-900"
          >
            Local insurance resources in {state.name} →
          </Link>
        )}

        <ContextualCTA partners={partners} />
        <LicensedProfessionalCTA />
        <ArticleDisclaimer />
      </div>
    </Container>
  );
}
