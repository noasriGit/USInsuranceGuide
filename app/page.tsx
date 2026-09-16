import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ArticleCard } from "@/components/content/ArticleCard";
import { PublicCaseStudySection } from "@/components/content/PublicCaseStudySection";
import { StateSelector } from "@/components/content/StateSelector";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LeadCTA } from "@/components/leads/LeadCTA";
import { AdSlot } from "@/components/monetization/AdSlot";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  getBlogArticles,
  getPrimaryTopicHubs,
  getPublishedStateGuides,
  getPublishedStateHubs,
  getPublicCaseStudies,
  getSeoPage,
  getStates,
} from "@/lib/content";
import { SITE_DESCRIPTION, LEAD_PATH } from "@/lib/constants";
import { inferLeadContextFromPath } from "@/lib/leads/context";

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

const stateContext: Record<string, string> = {
  maryland:
    "Maryland auto minimums, PIP offers, and workers' compensation rules sit alongside regional flood and storm exposure.",
  virginia:
    "Virginia's 50/100/25 auto rules and three-employee workers' compensation threshold shape most consumer and small-business questions.",
  "washington-dc":
    "D.C. combines 25/50/10 auto requirements with a high share of renters, rowhomes, and lease-driven coverage questions.",
};

export default function HomePage() {
  const states = getStates();
  const stateHubs = getPublishedStateHubs();
  const topicHubs = getPrimaryTopicHubs();
  const articles = getBlogArticles().slice(0, 4);
  const caseStudies = getPublicCaseStudies().slice(0, 3);
  const homeContext = inferLeadContextFromPath("/", "home");

  return (
    <>
      <section className="bg-[image:var(--navy-wash)] text-white">
        <Container className="py-14 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
              Independent insurance information for the DMV
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
              Insurance Guides for Maryland, Virginia & Washington, D.C.
            </h1>
            <p className="mt-5 max-w-[42rem] text-lg leading-relaxed text-slate-200">
              Local insurance rules, independent educational information, and regularly
              reviewed guides built from official sources — not a quote mill or national
              rate marketplace.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={LEAD_PATH} variant="onDark" dataLeadCta="hero">
                Find Insurance Help
              </ButtonLink>
              <ButtonLink href="/states/" variant="onDarkSecondary">
                Browse Insurance Guides
              </ButtonLink>
            </div>
            <StateSelector className="mt-10" />
          </div>
        </Container>
      </section>

      <section className="border-b border-line bg-white">
        <Container className="py-6">
          <p className="text-sm leading-relaxed text-slate-600">
            Maryland · Virginia · Washington, D.C. · official-source research · last-reviewed
            dates · clearly identified sources. Built from state insurance regulators, DMV
            agencies and public records.
          </p>
        </Container>
      </section>

      <Container className="py-16">
        <section aria-labelledby="topics-heading">
          <SectionHeading
            id="topics-heading"
            eyebrow="Coverage"
            title="Start with the coverage you need"
            description="The homepage focuses on the four guides most readers use first."
          />
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {topicHubs.map((hub) => (
              <li key={hub.path}>
                <Link
                  href={hub.path}
                  className="interactive-row flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="text-base font-semibold text-ink">
                    {hub.navLabel ?? hub.title}
                  </span>
                  <span className="max-w-xl text-sm text-slate-600 sm:text-right">
                    {hub.metaDescription}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <section className="bg-[image:var(--section-wash)]">
        <Container className="py-16">
          <SectionHeading
            id="dmv-guides-heading"
            eyebrow="Jurisdictions"
            title="State insurance guides"
            description="Maryland, Virginia, and Washington, D.C. are covered as distinct legal markets, not interchangeable tiles."
          />
          <div className="mt-12 space-y-14">
            {states.map((state) => {
              const hub = getSeoPage(`/states/${state.slug}/`);
              const guides = getPublishedStateGuides(state.slug, "primary")
                .slice()
                .sort(
                  (a, b) =>
                    primaryGuideOrder.indexOf(a.guideSlug ?? "") -
                    primaryGuideOrder.indexOf(b.guideSlug ?? ""),
                )
                .slice(0, 4);
              return (
                <section key={state.slug} aria-labelledby={`${state.slug}-heading`}>
                  <div className="grid gap-8 border-t border-line pt-8 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                      <h3 id={`${state.slug}-heading`} className="text-2xl font-semibold text-ink">
                        {state.name}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {stateContext[state.slug] ?? state.requiredInsuranceSummary}
                      </p>
                      <Link
                        href={hub?.path ?? `/states/${state.slug}/`}
                        className="mt-4 inline-block text-sm font-medium text-navy-800 underline-offset-2 hover:underline"
                      >
                        View {state.name} insurance guide
                      </Link>
                    </div>
                    <ul className="lg:col-span-8">
                      {guides.map((guide) => (
                        <li key={guide.path} className="border-b border-line first:border-t">
                          <Link
                            href={guide.path}
                            className="flex min-h-12 items-center justify-between py-3 text-sm font-medium text-navy-800 hover:underline"
                          >
                            <span>{guide.navLabel ?? guide.title}</span>
                            <span aria-hidden="true">→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              );
            })}
          </div>
        </Container>
      </section>

      <Container className="py-16">
        <PublicCaseStudySection studies={caseStudies} />
      </Container>

      <section className="bg-white">
        <Container className="py-16">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              id="latest-guides-heading"
              eyebrow="Editorial"
              title="Supporting guides"
              description="Explainers that sit behind the DMV landing pages."
            />
            <Link
              href="/blog/"
              className="shrink-0 text-sm font-medium text-navy-800 hover:underline"
            >
              View all guides
            </Link>
          </div>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </section>

      <Container className="pb-16">
        <LeadCTA context={homeContext} variant="final" />
        {stateHubs.length > 0 && <AdSlot slot="homepage-display" className="mt-8" />}
      </Container>
    </>
  );
}
