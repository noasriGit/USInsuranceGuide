import { GuideSectionShell, STATE_CATEGORY_BODY_SECTIONS } from "@/components/content/GuideSectionShell";
import { Prose } from "@/components/content/Prose";
import { FAQSection } from "@/components/content/FAQSection";
import { SourcesList } from "@/components/content/SourcesList";
import { GuideNetwork } from "@/components/content/GuideNetwork";
import { ArticleDisclaimer } from "@/components/compliance/ArticleDisclaimer";
import { LicensedProfessionalCTA } from "@/components/compliance/LicensedProfessionalCTA";
import { LastUpdated } from "@/components/compliance/LastUpdated";
import { ContextualCTA } from "@/components/monetization/ContextualCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo/schema";
import type { SeoPage, StateCategoryGuide } from "@/lib/schemas";
import { resolvePlacements } from "@/lib/monetization/placements";
import { formatDate } from "@/lib/utils";

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

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {guide.faq.length > 0 && <JsonLd data={faqSchema(guide.faq)} />}

      <div className="text-sm text-slate-500">
        <LastUpdated date={page.lastModified} />
        {page.lastReviewed && (
          <span className="ml-3">Reviewed {formatDate(page.lastReviewed)}</span>
        )}
      </div>

      {STATE_CATEGORY_BODY_SECTIONS.map((section) => (
        <GuideSectionShell key={section} title={section} pending={false}>
          <Prose content={guide.sections[section]} />
        </GuideSectionShell>
      ))}

      {guide.faq.length > 0 && <FAQSection faqs={guide.faq} className="mt-0" />}
      {guide.sources.length > 0 && (
        <SourcesList sources={guide.sources} className="mt-0" />
      )}

      <ContextualCTA partners={partners} />
      <GuideNetwork page={page} />
      <LicensedProfessionalCTA />
      <ArticleDisclaimer />
    </div>
  );
}
