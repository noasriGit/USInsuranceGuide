import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ArticleCard } from "@/components/content/ArticleCard";
import { LicensedProfessionalCTA } from "@/components/compliance/LicensedProfessionalCTA";
import { AdSlot } from "@/components/monetization/AdSlot";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  getBlogArticles,
  getPrimaryTopicHubs,
  getPublishedStateGuides,
  getPublishedStateHubs,
  getSeoPage,
  getStates,
} from "@/lib/content";
import { SITE_DESCRIPTION } from "@/lib/constants";

export const metadata = buildMetadata({
  title: "US Insurance Guide",
  description: SITE_DESCRIPTION,
  path: "/",
});

const primaryGuideOrder = [
  "auto-insurance",
  "homeowners-insurance",
  "renters-insurance",
  "business-insurance",
];

export default function HomePage() {
  const states = getStates();
  const stateHubs = getPublishedStateHubs();
  const topicHubs = getPrimaryTopicHubs();
  const articles = getBlogArticles().slice(0, 4);

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-navy-700">
              Maryland · Virginia · Washington, D.C.
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Insurance Guides for Maryland, Virginia & Washington, D.C.
            </h1>
            <p className="mt-5 text-xl leading-relaxed text-slate-600">
              Regional coverage rules, requirements, and educational guides for
              auto, homeowners, renters, and business insurance in the DMV.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {stateHubs.map((hub) => (
                <Link
                  key={hub.path}
                  href={hub.path}
                  className="rounded-md bg-navy-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-900 transition-colors"
                >
                  {hub.navLabel ?? hub.title}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <section aria-labelledby="dmv-guides-heading">
          <h2 id="dmv-guides-heading" className="text-2xl font-bold text-slate-900">
            DMV Insurance Guides
          </h2>
          <p className="mt-2 text-slate-600">
            Each state hub covers required insurance, major coverage types, and
            official regulatory resources.
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {states.map((state) => {
              const hub = getSeoPage(`/states/${state.slug}/`);
              const guides = getPublishedStateGuides(state.slug, "primary")
                .slice()
                .sort(
                  (a, b) =>
                    primaryGuideOrder.indexOf(a.guideSlug ?? "") -
                    primaryGuideOrder.indexOf(b.guideSlug ?? ""),
                );
              return (
                <div
                  key={state.slug}
                  className="rounded-lg border border-slate-200 bg-white p-6"
                >
                  <h3 className="text-xl font-semibold text-slate-900">
                    <Link href={hub?.path ?? `/states/${state.slug}/`} className="hover:text-navy-800">
                      {state.name} Insurance Guides
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {state.requiredInsuranceSummary}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {guides.map((guide) => (
                      <li key={guide.path}>
                        <Link
                          href={guide.path}
                          className="text-sm font-medium text-navy-700 underline-offset-2 hover:text-navy-900 hover:underline"
                        >
                          {guide.navLabel ?? guide.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </Container>

      <section className="border-y border-slate-200 bg-slate-50" aria-labelledby="topics-heading">
        <Container className="py-14">
          <h2 id="topics-heading" className="text-2xl font-bold text-slate-900">
            Coverage Topics
          </h2>
          <p className="mt-2 text-slate-600">
            Concept guides that connect back to Maryland, Virginia, and D.C. rules.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {topicHubs.map((hub) => (
              <Link
                key={hub.path}
                href={hub.path}
                className="rounded-lg border border-slate-200 bg-white p-5 hover:border-navy-200 hover:shadow-sm transition-all"
              >
                <h3 className="font-semibold text-slate-900">
                  {hub.navLabel ?? hub.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                  {hub.metaDescription}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <section aria-labelledby="latest-guides-heading">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="latest-guides-heading" className="text-2xl font-bold text-slate-900">
                Supporting Guides
              </h2>
              <p className="mt-2 text-slate-600">
                Educational explainers that support the DMV landing pages.
              </p>
            </div>
            <Link
              href="/blog/"
              className="shrink-0 text-sm font-medium text-navy-700 hover:text-navy-900"
            >
              View all guides
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      </Container>

      <Container className="pb-14">
        <LicensedProfessionalCTA />
        <AdSlot slot="homepage-display" className="mt-8" />
      </Container>
    </>
  );
}
