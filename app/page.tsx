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
import { RegionalVisual } from "@/components/visual/RegionalVisual";
import { SectionSurface } from "@/components/visual/SectionSurface";
import { StateFeaturePanel } from "@/components/visual/StateFeaturePanel";
import { TrustStrip } from "@/components/visual/TrustStrip";
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
  const caseStudies = getPublicCaseStudies().slice(0, 3);
  const homeContext = inferLeadContextFromPath("/", "home");
  const featuredArticle = articles[0];
  const supportingArticles = articles.slice(1, 3);
  const wideArticle = articles[3];

  return (
    <>
      <SectionSurface tone="navy">
        <Container size="wide" className="py-14 sm:py-16 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/70">
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
                  Find Insurance Help
                </ButtonLink>
                <ButtonLink href="/states/" variant="onDarkSecondary">
                  Browse Insurance Guides
                </ButtonLink>
              </div>
              <StateSelector className="mt-10" />
            </div>
            <div className="lg:col-span-6">
              <RegionalVisual />
            </div>
          </div>
        </Container>
      </SectionSurface>

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
              const guides = getPublishedStateGuides(state.slug, "primary")
                .slice()
                .sort(
                  (a, b) =>
                    primaryGuideOrder.indexOf(a.guideSlug ?? "") -
                    primaryGuideOrder.indexOf(b.guideSlug ?? ""),
                )
                .slice(0, 4)
                .map((guide) => ({
                  href: guide.path,
                  label: guide.navLabel ?? guide.title,
                }));
              const featured = index === 0;
              const wide = index === 2;
              return (
                <div
                  key={state.slug}
                  className={wide ? "lg:col-span-12" : "lg:col-span-6"}
                >
                  <StateFeaturePanel
                    name={state.name}
                    href={hub?.path ?? `/states/${state.slug}/`}
                    description={stateContext[state.slug] ?? state.requiredInsuranceSummary}
                    guides={guides}
                    tone={stateTone[state.slug as keyof typeof stateTone] ?? "maryland"}
                    featured={featured}
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
          <div className="mt-10 grid items-start gap-5 lg:grid-cols-12">
            {featuredArticle && (
              <div className="lg:col-span-7">
                <ArticleCard article={featuredArticle} featured />
              </div>
            )}
            <div className="grid gap-5 lg:col-span-5">
              {supportingArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
            {wideArticle && (
              <div className="lg:col-span-12">
                <ArticleCard article={wideArticle} />
              </div>
            )}
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
