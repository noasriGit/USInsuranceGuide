import Link from "next/link";
import { Prose } from "@/components/content/Prose";
import { FAQSection } from "@/components/content/FAQSection";
import { SourcesList } from "@/components/content/SourcesList";
import { GuideNetwork } from "@/components/content/GuideNetwork";
import { PublicCaseStudySection } from "@/components/content/PublicCaseStudySection";
import { AuthorByline } from "@/components/compliance/AuthorByline";
import { LastUpdated } from "@/components/compliance/LastUpdated";
import { ArticleDisclaimer } from "@/components/compliance/ArticleDisclaimer";
import { LicensedProfessionalNotice } from "@/components/compliance/LicensedProfessionalNotice";
import { ReviewMeta } from "@/components/ui/ReviewMeta";
import { LeadCTA } from "@/components/leads/LeadCTA";
import { StickyMobileLeadCTA } from "@/components/leads/StickyMobileLeadCTA";
import { ContextualCTA } from "@/components/monetization/ContextualCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, faqSchema } from "@/lib/seo/schema";
import type { Article, SeoPage } from "@/lib/schemas";
import { resolvePlacements } from "@/lib/monetization/placements";
import { formatDate, extractMarkdownHeadings, splitMarkdownForInlineCta } from "@/lib/utils";
import { inferLeadContextFromPath, shouldShowStickyLeadCta } from "@/lib/leads/context";
import { getPublicCaseStudiesForPage } from "@/lib/content/case-studies";
import { getStateBySlug } from "@/lib/content/data";

interface GuideArticleViewProps {
  page: SeoPage;
  article: Article;
  authorName: string;
  categoryHref?: string;
  categoryName?: string;
}

export function GuideArticleView({
  page,
  article,
  authorName,
  categoryHref,
  categoryName,
}: GuideArticleViewProps) {
  const partners = resolvePlacements({
    slot: "article-mid-cta",
    categorySlug: page.categorySlug ?? article.category,
    stateSlug: page.stateSlug ?? article.states?.[0],
  });
  const context = inferLeadContextFromPath(page.path, page.kind);
  const headings = extractMarkdownHeadings(article.content);
  const { before, after } = splitMarkdownForInlineCta(article.content);
  const caseStudies = getPublicCaseStudiesForPage({
    stateSlug: page.stateSlug,
    categorySlug: page.categorySlug ?? article.category,
    limit: 1,
  });
  const stateName = page.stateSlug ? getStateBySlug(page.stateSlug)?.name : undefined;
  const sources = article.sources?.map((source) => source.publisher) ?? [];
  const uniqueSources = [...new Set(sources)].slice(0, 4);
  const sticky = shouldShowStickyLeadCta(context);
  const ctaVariant =
    context.intent === "regulatory"
      ? "subtle"
      : context.intent === "cost"
        ? "cost"
        : context.intent === "business"
          ? "business"
          : "end";

  return (
    <article className={sticky ? "has-sticky-cta mx-auto max-w-[46rem]" : "mx-auto max-w-[46rem]"}>
      <JsonLd data={articleSchema(article, authorName, page.path)} />
      {article.faq && article.faq.length > 0 && <JsonLd data={faqSchema(article.faq)} />}

      <header className="border-b border-line pb-8">
        {categoryHref && categoryName && (
          <Link href={categoryHref} className="text-sm font-medium text-navy-800 hover:underline">
            {categoryName}
          </Link>
        )}
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">{article.excerpt}</p>
        <div className="mt-6">
          <AuthorByline
            authorSlug={article.author}
            reviewerSlug={article.reviewer ?? page.reviewer}
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <LastUpdated date={page.lastModified} />
          {page.lastReviewed && (
            <>
              <span aria-hidden="true">·</span>
              <span>Reviewed {formatDate(page.lastReviewed)}</span>
            </>
          )}
          <span aria-hidden="true">·</span>
          <span>{article.readingTime} min read</span>
        </div>
      </header>

      <ReviewMeta
        className="mt-6"
        lastReviewed={page.lastReviewed ?? page.lastModified}
        jurisdiction={stateName}
        sources={uniqueSources}
      />

      {article.faq && article.faq.length > 0 && (
        <section className="mt-8 rounded-xl bg-sand/80 p-5" aria-labelledby="key-points-heading">
          <h2 id="key-points-heading" className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-navy-700">
            Key points
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
            {article.faq.slice(0, 3).map((item) => (
              <li key={item.question}>{item.question}</li>
            ))}
          </ul>
        </section>
      )}

      {headings.length >= 4 && (
        <nav className="mt-6 rounded-xl bg-navy-50 p-5" aria-labelledby="toc-heading">
          <h2 id="toc-heading" className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-navy-700">
            In this guide
          </h2>
          <ol className="mt-3 space-y-2">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a href={`#${heading.id}`} className="text-sm text-navy-800 underline-offset-2 hover:underline">
                  {heading.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="py-8">
        <Prose content={before} />
        {context.intent !== "regulatory" && <LeadCTA context={context} variant="inline" />}
        {after && <Prose content={after} />}
      </div>

      <ContextualCTA
        partners={partners}
        context={context}
        variant={ctaVariant}
      />
      {caseStudies.length > 0 && (
        <div className="mt-10">
          <PublicCaseStudySection studies={caseStudies} title="Related public record" />
        </div>
      )}
      {article.faq && <FAQSection faqs={article.faq} />}
      {article.sources && <SourcesList sources={article.sources} />}

      <div className="mt-10 space-y-8">
        <GuideNetwork page={page} />
        <LicensedProfessionalNotice />
        <ArticleDisclaimer />
      </div>
      {sticky && <StickyMobileLeadCTA context={context} />}
    </article>
  );
}
