import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { ArticleCard } from "@/components/content/ArticleCard";
import { GuideNetwork } from "@/components/content/GuideNetwork";
import { PublicCaseStudySection } from "@/components/content/PublicCaseStudySection";
import { SourceTrustCallout } from "@/components/content/SourceTrustCallout";
import { LeadCTA } from "@/components/leads/LeadCTA";
import { ContextualCTA } from "@/components/monetization/ContextualCTA";
import { ReviewMeta } from "@/components/ui/ReviewMeta";
import { StatBlock } from "@/components/ui/StatBlock";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { newTabAriaLabel } from "@/lib/a11y/external-link";
import { SHOW_INSURANCE_DIRECTORY_NAV } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  getStates,
  getStateBySlug,
  getSupportingArticlesByState,
  getSeoPage,
  getPublishedStateGuides,
  getPublishedChildren,
  getPublicCaseStudiesForPage,
} from "@/lib/content";
import { resolvePlacements } from "@/lib/monetization/placements";
import { shouldIndexPath } from "@/lib/content/indexing";
import { inferLeadContextFromPath } from "@/lib/leads/context";
import { MARYLAND_RECENT_PUBLIC_FACT } from "@/content/data/public-case-studies";
import { CoverageIcon, coverageVisualFromSlug } from "@/components/visual/CoverageIcon";
import { RegionalVisual } from "@/components/visual/RegionalVisual";
import type { SeoPage } from "@/lib/schemas";

interface PageProps {
  params: Promise<{ stateSlug: string }>;
}

function GuideDirectoryCard({
  guide,
  childPages,
}: {
  guide: SeoPage;
  childPages: SeoPage[];
}) {
  const visual = coverageVisualFromSlug(guide.categorySlug ?? guide.guideSlug);
  return (
    <div className="surface-card p-5">
      <p className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-navy-700">
        <CoverageIcon name={visual} className="h-4 w-4" />
        {guide.navLabel && guide.navLabel !== guide.title ? guide.navLabel : "Guide"}
      </p>
      <Link href={guide.path} className="mt-2 block text-lg font-semibold text-ink hover:text-navy-800">
        {guide.title}
      </Link>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{guide.metaDescription}</p>
      {childPages.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {childPages.map((child) => (
            <li key={child.path}>
              <Link
                href={child.path}
                className="inline-flex min-h-9 items-center rounded-lg bg-white/80 px-3 text-sm font-medium text-navy-800 hover:bg-white"
              >
                {child.navLabel ??
                  (child.title.replace(guide.navLabel ?? "", "").trim() || child.title)}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link href={guide.path} className="link-arrow mt-4">
        Read guide
        <span data-arrow aria-hidden="true">
          →
        </span>
      </Link>
    </div>
  );
}

export async function generateStaticParams() {
  return getStates().map((state) => ({ stateSlug: state.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { stateSlug } = await params;
  const path = `/states/${stateSlug}/`;
  const page = getSeoPage(path);
  const state = getStateBySlug(stateSlug);
  if (!state || !page) return {};

  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path,
    noindex: !shouldIndexPath(path),
    modifiedTime: page.lastModified,
  });
}

export default async function StateHubPage({ params }: PageProps) {
  const { stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  const page = getSeoPage(`/states/${stateSlug}/`);
  if (!state || !page || page.status !== "published") notFound();

  const articles = getSupportingArticlesByState(stateSlug);
  const primaryGuides = getPublishedStateGuides(stateSlug, "primary");
  const specialtyGuides = getPublishedStateGuides(stateSlug, "specialty");
  const otherGuides = getPublishedStateGuides(stateSlug, "deprioritized");
  const partners = resolvePlacements({
    slot: "state-hub-card",
    stateSlug,
  });
  const context = inferLeadContextFromPath(page.path, page.kind);
  const caseStudies = getPublicCaseStudiesForPage({ stateSlug, limit: 1 });
  const sourceNames = state.externalSources?.map((source) => source.publisher) ?? [];
  const heroTint =
    stateSlug === "virginia" ? "tint-virginia" : stateSlug === "washington-dc" ? "tint-dc" : "tint-maryland";
  const primaryChips = primaryGuides.slice(0, 4);

  return (
    <>
      <div className={heroTint}>
        <Container className="py-8 lg:py-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "DMV Guides", href: "/states/" },
              { label: state.name },
            ]}
          />
          <div className="mt-6 grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <PageHero
                bare
                className="pb-2"
                eyebrow={`${state.name} insurance`}
                title={page.title}
                description={state.overview}
              >
                <ul className="mt-8 flex flex-wrap gap-2">
                  {primaryChips.map((guide) => (
                    <li key={guide.path}>
                      <Link
                        href={guide.path}
                        className="inline-flex min-h-10 items-center rounded-lg border border-navy-200 bg-white/80 px-3.5 text-sm font-medium text-navy-800 hover:border-navy-600"
                      >
                        {guide.navLabel ?? guide.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </PageHero>
            </div>
            <div className="hidden lg:col-span-4 lg:block">
              <RegionalVisual className="min-h-[13rem] bg-navy-900" />
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">

      <ReviewMeta
        className="mt-6"
        lastReviewed={page.lastReviewed ?? page.lastModified}
        jurisdiction={state.name}
        sources={sourceNames}
      />

      <div className="grid gap-12 py-10 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-8">
          <section>
            <SectionHeading title={`What ${state.name} requires`} />
            <p className="mt-4 max-w-[46rem] text-base leading-relaxed text-slate-600">
              {state.requiredInsuranceSummary}
            </p>
          </section>

          <LeadCTA context={context} variant="state" />

          <section>
            <SectionHeading
              title={`Key ${state.name} insurance guides`}
              description="Start with auto, homeowners, renters, and business coverage."
            />
            <div className="mt-5 grid gap-4">
              {primaryGuides.map((guide) => (
                <GuideDirectoryCard
                  key={guide.path}
                  guide={guide}
                  childPages={getPublishedChildren(guide.path)}
                />
              ))}
            </div>
          </section>

          {stateSlug === "maryland" && (
            <section>
              <SectionHeading title="Recent public insurance data" />
              <StatBlock
                className="mt-5"
                value={MARYLAND_RECENT_PUBLIC_FACT.value}
                label={MARYLAND_RECENT_PUBLIC_FACT.label}
              />
              <p className="mt-3 text-sm text-slate-600">
                Source:{" "}
                <a
                  href={MARYLAND_RECENT_PUBLIC_FACT.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={newTabAriaLabel(MARYLAND_RECENT_PUBLIC_FACT.publisher)}
                  className="text-navy-800 underline underline-offset-2"
                >
                  {MARYLAND_RECENT_PUBLIC_FACT.publisher}
                </a>
                , August 7, 2026.
              </p>
            </section>
          )}

          {stateSlug === "virginia" && <SourceTrustCallout />}

          {caseStudies.length > 0 && <PublicCaseStudySection studies={caseStudies} />}

          {specialtyGuides.length > 0 && (
            <section>
              <SectionHeading title="Specialty coverage" />
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {specialtyGuides.map((guide) => (
                  <li key={guide.path}>
                    <Link
                      href={guide.path}
                      className="surface-card surface-card-interactive block px-4 py-3 text-sm font-medium text-navy-800"
                    >
                      {guide.navLabel ?? guide.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <SectionHeading title={`Regional risks in ${state.name}`} />
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
              {state.majorRisks.map((risk) => (
                <li key={risk}>{risk}</li>
              ))}
            </ul>
          </section>

          {articles.length > 0 && (
            <section>
              <SectionHeading title="Supporting articles" />
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </section>
          )}

          {otherGuides.length > 0 && (
            <section>
              <SectionHeading title="More guides" />
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {otherGuides.map((guide) => (
                  <li key={guide.path}>
                    <Link href={guide.path} className="text-sm text-navy-800 hover:underline">
                      {guide.navLabel ?? guide.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {SHOW_INSURANCE_DIRECTORY_NAV && (
            <section>
              <Link
                href={`/insurance-agencies/${stateSlug}/`}
                className="inline-flex items-center text-sm font-medium text-navy-800 hover:underline"
              >
                Find insurance professionals in {state.name} →
              </Link>
            </section>
          )}

          <GuideNetwork page={page} />
          <ContextualCTA partners={partners} />
        </div>

        <aside className="lg:col-span-4" aria-label="Official resources">
          {state.externalSources && state.externalSources.length > 0 && (
            <div className="surface-card p-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy-700">
                Official {state.name} resources
              </h2>
              <ul className="mt-4 space-y-2">
                {state.externalSources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={newTabAriaLabel(source.title)}
                      className="text-sm text-navy-800 underline hover:text-navy-900"
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
    </>
  );
}
