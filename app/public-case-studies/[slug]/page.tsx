import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { Prose } from "@/components/content/Prose";
import { PublicCaseStudyDisclaimer } from "@/components/content/PublicCaseStudyDisclaimer";
import { LicensedProfessionalNotice } from "@/components/compliance/LicensedProfessionalNotice";
import { LeadCTA } from "@/components/leads/LeadCTA";
import { QuoteBlock } from "@/components/ui/QuoteBlock";
import { StatBlock } from "@/components/ui/StatBlock";
import { ReviewMeta } from "@/components/ui/ReviewMeta";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { sourcedArticleSchema } from "@/lib/seo/schema";
import { getPublicCaseStudies, getPublicCaseStudyBySlug, getSeoPage } from "@/lib/content";
import { PUBLIC_CASE_STUDIES_PATH } from "@/lib/constants";
import { inferLeadContextFromPath } from "@/lib/leads/context";
import { stateLabel } from "@/lib/leads/coverage";
import { newTabAriaLabel } from "@/lib/a11y/external-link";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPublicCaseStudies().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const study = getPublicCaseStudyBySlug(slug);
  if (!study) return {};
  return buildMetadata({
    title: study.title,
    description: study.summary,
    path: `${PUBLIC_CASE_STUDIES_PATH}${study.slug}/`,
    type: "article",
    modifiedTime: study.lastVerifiedAt,
    publishedTime: study.sourcePublishedAt,
  });
}

export default async function PublicCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getPublicCaseStudyBySlug(slug);
  if (!study) notFound();

  const path = `${PUBLIC_CASE_STUDIES_PATH}${study.slug}/`;
  const context = {
    ...inferLeadContextFromPath(path, "static"),
    state: study.jurisdiction,
  };
  const featured = study.facts[0];

  return (
    <Container className="py-8">
      <JsonLd
        data={sourcedArticleSchema({
          title: study.title,
          description: study.summary,
          path,
          dateModified: study.lastVerifiedAt,
          datePublished: study.sourcePublishedAt,
        })}
      />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Public Case Studies", href: PUBLIC_CASE_STUDIES_PATH },
          { label: study.title },
        ]}
      />
      <article className="mx-auto max-w-[46rem]">
        <PageHero
          eyebrow={`${stateLabel(study.jurisdiction)} · Public record`}
          title={study.title}
          description={study.summary}
        />
        <ReviewMeta
          className="mt-6"
          lastReviewed={study.lastVerifiedAt}
          jurisdiction={stateLabel(study.jurisdiction)}
          sources={[study.sourcePublisher]}
        />
        {featured && (
          <StatBlock className="mt-8" value={featured.value} label={featured.label} />
        )}
        <div className="mt-8 space-y-6">
          {study.facts.slice(1).map((fact) => (
            <StatBlock key={fact.label} value={fact.value} label={fact.label} />
          ))}
        </div>
        {study.quote && (
          <QuoteBlock className="mt-10" text={study.quote.text} attribution={study.quote.attribution} />
        )}
        <div className="py-8">
          <h2 className="text-xl font-semibold text-ink">What the public record shows</h2>
          <div className="mt-4">
            <Prose content={study.body} />
          </div>
        </div>
        <section>
          <h2 className="text-xl font-semibold text-ink">Why this matters</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
            {study.takeaways.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="mt-10 border-t border-line pt-6">
          <h2 className="text-xl font-semibold text-ink">Source</h2>
          <p className="mt-3 text-sm text-slate-600">
            <a
              href={study.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={newTabAriaLabel(study.sourcePublisher)}
              className="font-medium text-navy-800 underline underline-offset-2"
            >
              {study.sourcePublisher}
            </a>
            {study.sourcePublishedAt ? ` · ${formatDate(study.sourcePublishedAt)}` : ""}
          </p>
        </section>
        <PublicCaseStudyDisclaimer className="mt-8" />
        {study.relatedPaths.length > 0 && (
          <nav className="mt-10 border-t border-line pt-6" aria-label="Related guides">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              Related guides
            </h2>
            <ul className="mt-4 grid gap-3">
              {study.relatedPaths.map((relatedPath) => {
                const related = getSeoPage(relatedPath);
                return (
                  <li key={relatedPath}>
                    <Link href={relatedPath} className="surface-card surface-card-interactive block px-4 py-4">
                      <span className="text-sm font-medium text-navy-800">
                        {related?.title ?? relatedPath}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
        <div className="mt-10 space-y-8">
          <LeadCTA context={context} variant="subtle" />
          <LicensedProfessionalNotice />
        </div>
      </article>
    </Container>
  );
}
