import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { ArticleCard } from "@/components/content/ArticleCard";
import { PublicCaseStudySection } from "@/components/content/PublicCaseStudySection";
import { StateSelector } from "@/components/content/StateSelector";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { LeadCTA } from "@/components/leads/LeadCTA";
import { AdSlot } from "@/components/monetization/AdSlot";
import { CoverageCard } from "@/components/visual/CoverageCard";
import { coverageVisualFromSlug } from "@/components/visual/CoverageIcon";
import { SectionSurface } from "@/components/visual/SectionSurface";
import { StateFeaturePanel } from "@/components/visual/StateFeaturePanel";
import { TrustStrip } from "@/components/visual/TrustStrip";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  getBlogArticles,
  getAutoClusterForState,
  getPrimaryTopicHubs,
  getPublishedStateHubs,
  getPublicCaseStudies,
  getPublicSeoPages,
  getSeoPage,
  getStates,
} from "@/lib/content";
import { getStateBannerPath, HERO_BANNER_PATH, SITE_DESCRIPTION, LEAD_PATH } from "@/lib/constants";
import { inferLeadContextFromPath } from "@/lib/leads/context";

export const metadata = buildMetadata({
  title: "US Insurance Guide",
  description: SITE_DESCRIPTION,
  path: "/",
});

const stateContext: Record<string, string> = {
  maryland:
    "Maryland auto minimums, PIP offers, and workers' compensation rules sit alongside regional flood and storm exposure.",
  virginia:
    "Virginia's 50/100/25 auto rules and three-employee workers' compensation threshold shape most consumer and small-business questions.",
  "washington-dc":
    "D.C. combines 25/50/10 auto requirements with a high share of renters, rowhomes, and lease-driven coverage questions.",
};

const coverageContext: Record<string, string> = {
  "auto-insurance":
    "Requirements, liability limits, coverage options and costs across Maryland, Virginia and D.C.",
  "home-insurance":
    "Dwelling coverage, lender rules, and property risks for DMV homeowners.",
  "renters-insurance":
    "Personal property, lease requirements, and renter coverage choices in the region.",
  "business-insurance":
    "Workers' compensation, liability, and commercial auto rules for DMV employers.",
};

const stateTone = {
  maryland: "maryland",
  virginia: "virginia",
  "washington-dc": "dc",
} as const;

export default function HomePage() {
  const states = getStates();
  const stateHubs = getPublishedStateHubs();
  const topicHubs = getPrimaryTopicHubs();
  const articles = getBlogArticles().slice(0, 4);
  const caseStudies = getPublicCaseStudies().slice(0, 4);
  const publicPages = getPublicSeoPages();
  const homeContext = inferLeadContextFromPath("/", "home");
  const moreArticles = articles.slice(0, 3);

  return (
    <>
      <section className="relative min-h-[calc(100svh-4.25rem)] overflow-hidden text-white">
        <Image
          src={HERO_BANNER_PATH}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(105deg,rgb(7_31_58_/_0.94)_0%,rgb(7_31_58_/_0.82)_42%,rgb(7_31_58_/_0.55)_100%)]"
          aria-hidden="true"
        />
        <Container size="wide" className="relative z-10 flex min-h-[calc(100svh-4.25rem)] items-center py-14 sm:py-16 lg:py-20">
          <div className="grid w-full items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/70">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red/80" aria-hidden="true" />
                Independent insurance information for the DMV
              </p>
              <h1 className="mt-4 text-[2.15rem] font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.35rem] lg:leading-[1.12]">
                Insurance Guides for Maryland, Virginia & Washington, D.C.
              </h1>
              <p className="mt-5 max-w-[38rem] text-lg leading-relaxed text-slate-200">
                Local insurance rules, independent educational information, and regularly
                reviewed guides built from official sources — not a quote mill or national
                rate marketplace.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={LEAD_PATH} variant="onDark" dataLeadCta="hero">
                  Get Matched With Insurance Help
                </ButtonLink>
                <ButtonLink href="/states/" variant="onDarkSecondary">
                  Browse Insurance Guides
                </ButtonLink>
              </div>
              <StateSelector className="mt-10" />
            </div>
            <div className="lg:col-span-6" aria-labelledby="hero-featured-heading">
              <p
                id="hero-featured-heading"
                className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/75"
              >
                Priority guide collection
              </p>
              <div className="mt-4 rounded-2xl border border-white/20 bg-navy-950/75 p-6 shadow-xl backdrop-blur-sm sm:p-7">
                <Link href="/auto-insurance/" className="group block">
                  <p className="text-sm font-semibold text-white">DMV auto insurance guides</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200">
                    Compare Maryland, Virginia, and Washington, D.C. requirements,
                    coverage rules, and cost factors from official sources.
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:underline">
                    Explore auto insurance
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
                <ul className="mt-6 grid gap-2 border-t border-white/15 pt-5 sm:grid-cols-3">
                  {stateHubs.map((stateHub) => {
                    const autoPage = getAutoClusterForState(publicPages, stateHub.stateSlug ?? "")[0];
                    if (!autoPage) return null;
                    return (
                      <li key={autoPage.path}>
                        <Link
                          href={autoPage.path}
                          className="block rounded-lg bg-white/10 px-3 py-3 text-sm font-medium text-white hover:bg-white/15"
                        >
                          {autoPage.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <TrustStrip />

      <SectionSurface tone="blue" labelledBy="topics-heading">
        <Container size="wide" className="py-16 sm:py-20">
          <SectionHeading
            id="topics-heading"
            eyebrow="Coverage"
            title="Start with the coverage you need"
            description="The homepage focuses on the four guides most readers use first."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {topicHubs.map((hub) => (
              <CoverageCard
                key={hub.path}
                href={hub.path}
                title={hub.navLabel ?? hub.title}
                description={coverageContext[hub.categorySlug ?? ""] ?? hub.metaDescription}
                visual={coverageVisualFromSlug(hub.categorySlug)}
              />
            ))}
          </div>
        </Container>
      </SectionSurface>

      <SectionSurface tone="sand" labelledBy="dmv-guides-heading">
        <Container size="wide" className="py-16 sm:py-20">
          <SectionHeading
            id="dmv-guides-heading"
            eyebrow="Jurisdictions"
            title="State insurance guides"
            description="Maryland, Virginia, and Washington, D.C. are covered as distinct legal markets, not interchangeable tiles."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-12">
            {states.map((state, index) => {
              const hub = getSeoPage(`/states/${state.slug}/`);
              const guides = getAutoClusterForState(publicPages, state.slug)
                .map((guide) => ({
                  href: guide.path,
                  label: guide.title,
                }));
              const wide = index === 2;
              return (
                <div
                  key={state.slug}
                  className={wide ? "lg:col-span-12" : "lg:col-span-6 flex flex-col"}
                >
                  <StateFeaturePanel
                    name={state.name}
                    href={hub?.path ?? `/states/${state.slug}/`}
                    description={stateContext[state.slug] ?? state.requiredInsuranceSummary}
                    guides={guides}
                    tone={stateTone[state.slug as keyof typeof stateTone] ?? "maryland"}
                    bannerSrc={getStateBannerPath(state.slug)}
                    wide={wide}
                  />
                </div>
              );
            })}
          </div>
        </Container>
      </SectionSurface>

      <SectionSurface tone="white" labelledBy="case-files-heading">
        <Container size="wide" className="py-16 sm:py-20">
          <PublicCaseStudySection studies={caseStudies} />
        </Container>
      </SectionSurface>

      <SectionSurface tone="blue" labelledBy="latest-guides-heading">
        <Container size="wide" className="py-16 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <SectionHeading
              id="latest-guides-heading"
              eyebrow="Editorial"
              title="Supporting guides"
              description="Explainers that sit behind the DMV landing pages."
            />
            <Link
              href="/blog/"
              className="link-arrow shrink-0"
            >
              View all guides
              <span data-arrow aria-hidden="true">
                →
              </span>
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {moreArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </SectionSurface>

      <LeadCTA context={homeContext} variant="final" />
      {stateHubs.length > 0 && (
        <Container size="wide" className="py-10">
          <AdSlot slot="homepage-display" />
        </Container>
      )}
    </>
  );
}
