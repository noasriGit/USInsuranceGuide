import { GuideSectionShell, STATE_CATEGORY_BODY_SECTIONS } from "@/components/content/GuideSectionShell";
import { Prose } from "@/components/content/Prose";
import { FAQSection } from "@/components/content/FAQSection";
import { SourcesList } from "@/components/content/SourcesList";
import { GuideNetwork } from "@/components/content/GuideNetwork";
import { PublicCaseStudySection } from "@/components/content/PublicCaseStudySection";
import { ArticleDisclaimer } from "@/components/compliance/ArticleDisclaimer";
import { LicensedProfessionalNotice } from "@/components/compliance/LicensedProfessionalNotice";
import { ReviewMeta } from "@/components/ui/ReviewMeta";
import { LeadCTA } from "@/components/leads/LeadCTA";
import { StickyMobileLeadCTA } from "@/components/leads/StickyMobileLeadCTA";
import { ContextualCTA } from "@/components/monetization/ContextualCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo/schema";
import type { SeoPage, StateCategoryGuide } from "@/lib/schemas";
import { resolvePlacements } from "@/lib/monetization/placements";
import { inferLeadContextFromPath, shouldShowStickyLeadCta } from "@/lib/leads/context";
import { getPublicCaseStudiesForPage } from "@/lib/content/case-studies";
import { getStateBySlug } from "@/lib/content/data";

interface StateGuideViewProps {
  page: SeoPage;
  guide: StateCategoryGuide;
}

export function StateGuideView({ page, guide }: StateGuideViewProps) {
  const partners = resolvePlacements({
    slot: "state-hub-card",
    stateSlug: page.stateSlug,
    categorySlug: page.categorySlug,
  });
  const context = inferLeadContextFromPath(page.path, page.kind);
  const stateName = page.stateSlug ? getStateBySlug(page.stateSlug)?.name : undefined;
  const caseStudies = getPublicCaseStudiesForPage({
    stateSlug: page.stateSlug,
    categorySlug: page.categorySlug,
    limit: 1,
  });
  const sticky = shouldShowStickyLeadCta(context);
  const ctaVariant =
    context.intent === "regulatory"
      ? "subtle"
      : context.intent === "cost"
        ? "cost"
        : context.intent === "business"
          ? "business"
          : "state";
  const [firstSection, ...otherSections] = STATE_CATEGORY_BODY_SECTIONS;

  return (
    <div className={sticky ? "has-sticky-cta mx-auto max-w-[46rem] space-y-8" : "mx-auto max-w-[46rem] space-y-8"}>
      {guide.faq.length > 0 && <JsonLd data={faqSchema(guide.faq)} />}

      <ReviewMeta
        lastReviewed={page.lastReviewed ?? page.lastModified}
        jurisdiction={stateName}
        sources={[...new Set(guide.sources.map((source) => source.publisher))].slice(0, 4)}
      />

      {firstSection && (
        <GuideSectionShell title={firstSection} pending={false}>
          <Prose content={guide.sections[firstSection]} />
        </GuideSectionShell>
      )}

      <LeadCTA context={context} variant={ctaVariant} />

      {otherSections.map((section) => (
        <GuideSectionShell key={section} title={section} pending={false}>
          <Prose content={guide.sections[section]} />
        </GuideSectionShell>
      ))}

      {guide.faq.length > 0 && <FAQSection faqs={guide.faq} className="mt-0" />}
      {guide.sources.length > 0 && (
        <SourcesList sources={guide.sources} className="mt-0" />
      )}

      {caseStudies.length > 0 && <PublicCaseStudySection studies={caseStudies} />}
      <ContextualCTA partners={partners} />
      <GuideNetwork page={page} />
      <LicensedProfessionalNotice />
      <ArticleDisclaimer />
      {sticky && <StickyMobileLeadCTA context={context} />}
    </div>
  );
}
