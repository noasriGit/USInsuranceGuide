import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { PublicCaseStudyCard } from "@/components/content/PublicCaseStudyCard";
import { PublicCaseStudyDisclaimer } from "@/components/content/PublicCaseStudyDisclaimer";
import { SourceTrustCallout } from "@/components/content/SourceTrustCallout";
import { LeadCTA } from "@/components/leads/LeadCTA";
import { buildMetadata } from "@/lib/seo/metadata";
import { getPublicCaseStudies, getSeoPage } from "@/lib/content";
import { PUBLIC_CASE_STUDIES_PATH } from "@/lib/constants";
import { inferLeadContextFromPath } from "@/lib/leads/context";
import { LEAD_STATES } from "@/lib/leads/coverage";

interface PageProps {
  searchParams: Promise<{ jurisdiction?: string; topic?: string }>;
}

const page = getSeoPage(PUBLIC_CASE_STUDIES_PATH);

export const metadata = buildMetadata({
  title: page?.metaTitle ?? "Public Insurance Case Files",
  description: page?.metaDescription ?? "Public-source insurance examples for the DMV.",
  path: PUBLIC_CASE_STUDIES_PATH,
  modifiedTime: page?.lastModified,
});

const topics = [
  { id: "auto-insurance", label: "Auto" },
  { id: "home-insurance", label: "Home" },
  { id: "renters-insurance", label: "Renters" },
  { id: "business-insurance", label: "Business" },
];

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function PublicCaseStudiesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const jurisdiction = firstValue(params.jurisdiction);
  const topic = firstValue(params.topic);
  const studies = getPublicCaseStudies({ jurisdiction, topic });
  const context = inferLeadContextFromPath(PUBLIC_CASE_STUDIES_PATH, "static");

  return (
    <Container className="py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Public Case Studies" }]} />
      <PageHero
        eyebrow="Public records"
        title="Public Insurance Case Files"
        description="These examples are drawn from state insurance regulators and other government sources. They explain how public processes work. They are not customer stories."
      />
      <div className="py-10 space-y-10">
        <PublicCaseStudyDisclaimer />
        <SourceTrustCallout />

        <nav aria-label="Filter public case files" className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Jurisdiction
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <li>
                <Link
                  href={topic ? `${PUBLIC_CASE_STUDIES_PATH}?topic=${topic}` : PUBLIC_CASE_STUDIES_PATH}
                  className={!jurisdiction ? "font-semibold text-ink" : "text-navy-800 hover:underline"}
                >
                  All
                </Link>
              </li>
              {LEAD_STATES.map((state) => (
                <li key={state.id}>
                  <Link
                    href={`${PUBLIC_CASE_STUDIES_PATH}?jurisdiction=${state.id}${topic ? `&topic=${topic}` : ""}`}
                    className={
                      jurisdiction === state.id
                        ? "font-semibold text-ink"
                        : "text-navy-800 hover:underline"
                    }
                  >
                    {state.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Topic
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <li>
                <Link
                  href={
                    jurisdiction
                      ? `${PUBLIC_CASE_STUDIES_PATH}?jurisdiction=${jurisdiction}`
                      : PUBLIC_CASE_STUDIES_PATH
                  }
                  className={!topic ? "font-semibold text-ink" : "text-navy-800 hover:underline"}
                >
                  All
                </Link>
              </li>
              {topics.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`${PUBLIC_CASE_STUDIES_PATH}?topic=${item.id}${jurisdiction ? `&jurisdiction=${jurisdiction}` : ""}`}
                    className={
                      topic === item.id ? "font-semibold text-ink" : "text-navy-800 hover:underline"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {studies.length === 0 ? (
          <p className="text-slate-600">No public case files match those filters yet.</p>
        ) : (
          <div className="grid gap-10 lg:grid-cols-2">
            {studies.map((study) => (
              <PublicCaseStudyCard key={study.slug} study={study} />
            ))}
          </div>
        )}

        <LeadCTA context={context} variant="subtle" />
      </div>
    </Container>
  );
}
