import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { ArticleCard } from "@/components/content/ArticleCard";
import { GuideNetwork } from "@/components/content/GuideNetwork";
import { ContextualCTA } from "@/components/monetization/ContextualCTA";
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
} from "@/lib/content";
import { resolvePlacements } from "@/lib/monetization/placements";
import { shouldIndexPath } from "@/lib/content/indexing";
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
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <Link
        href={guide.path}
        className="text-lg font-semibold text-slate-900 hover:text-navy-800"
      >
        {guide.navLabel ?? guide.title}
      </Link>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {guide.metaDescription}
      </p>
      {childPages.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {childPages.map((child) => (
            <li key={child.path}>
              <Link
                href={child.path}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-navy-700 hover:border-navy-200 hover:bg-slate-50"
              >
                {child.navLabel ??
                  (child.title.replace(guide.navLabel ?? "", "").trim() ||
                    child.title)}
              </Link>
            </li>
          ))}
        </ul>
      )}
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

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "DMV Guides", href: "/states/" },
          { label: state.name },
        ]}
      />
      <PageHero title={page.title} description={state.overview} />

      <div className="grid gap-10 py-10 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="text-xl font-bold text-slate-900">
              Required insurance in {state.name}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              {state.requiredInsuranceSummary}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              {state.name} insurance guides
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Start with auto, homeowners, renters, and business coverage. Child
              pages appear only after they are published.
            </p>
            <div className="mt-4 grid gap-4">
              {primaryGuides.map((guide) => (
                <GuideDirectoryCard
                  key={guide.path}
                  guide={guide}
                  childPages={getPublishedChildren(guide.path)}
                />
              ))}
            </div>
          </section>

          {specialtyGuides.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900">Specialty coverage</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {specialtyGuides.map((guide) => (
                  <Link
                    key={guide.path}
                    href={guide.path}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:border-navy-200 hover:text-navy-800"
                  >
                    {guide.navLabel ?? guide.title}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-xl font-bold text-slate-900">
              Regional risks in {state.name}
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
              {state.majorRisks.map((risk) => (
                <li key={risk}>{risk}</li>
              ))}
            </ul>
          </section>

          {articles.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900">Supporting articles</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {articles.map((article) => (
                  <ArticleCard key={article.slug} article={article} />
                ))}
              </div>
            </section>
          )}

          {otherGuides.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900">Additional topics</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {otherGuides.map((guide) => (
                  <Link
                    key={guide.path}
                    href={guide.path}
                    className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:border-navy-200"
                  >
                    {guide.navLabel ?? guide.title}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {SHOW_INSURANCE_DIRECTORY_NAV && (
            <section>
              <Link
                href={`/insurance-agencies/${stateSlug}/`}
                className="inline-flex items-center text-sm font-medium text-navy-700 hover:text-navy-900"
              >
                Find insurance professionals in {state.name} →
              </Link>
            </section>
          )}

          <GuideNetwork page={page} />
          <ContextualCTA partners={partners} />
        </div>

        <aside aria-label="Official resources">
          {state.externalSources && state.externalSources.length > 0 && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-sm font-semibold text-slate-900">
                Official {state.name} resources
              </h3>
              <ul className="mt-3 space-y-2">
                {state.externalSources.map((source) => (
                  <li key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={newTabAriaLabel(source.title)}
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
