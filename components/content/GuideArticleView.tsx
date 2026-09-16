import Link from "next/link";
import { Prose } from "@/components/content/Prose";
import { FAQSection } from "@/components/content/FAQSection";
import { SourcesList } from "@/components/content/SourcesList";
import { GuideNetwork } from "@/components/content/GuideNetwork";
import { AuthorByline } from "@/components/compliance/AuthorByline";
import { LastUpdated } from "@/components/compliance/LastUpdated";
import { ArticleDisclaimer } from "@/components/compliance/ArticleDisclaimer";
import { LicensedProfessionalCTA } from "@/components/compliance/LicensedProfessionalCTA";
import { ContextualCTA } from "@/components/monetization/ContextualCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, faqSchema } from "@/lib/seo/schema";
import type { Article, SeoPage } from "@/lib/schemas";
import { resolvePlacements } from "@/lib/monetization/placements";
import { formatDate } from "@/lib/utils";

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

  return (
    <article className="mx-auto max-w-3xl">
      <JsonLd data={articleSchema(article, authorName, page.path)} />
      {article.faq && article.faq.length > 0 && <JsonLd data={faqSchema(article.faq)} />}

      <header className="border-b border-slate-200 pb-8">
        {categoryHref && categoryName && (
          <Link
            href={categoryHref}
            className="text-sm font-medium text-navy-700 hover:text-navy-900"
          >
            {categoryName}
          </Link>
        )}
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {page.title}
        </h1>
        <p className="mt-4 text-lg text-slate-600">{article.excerpt}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
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

      <div className="py-8">
        <Prose content={article.content} />
      </div>

      <ContextualCTA partners={partners} />
      {article.faq && <FAQSection faqs={article.faq} />}
      {article.sources && <SourcesList sources={article.sources} />}

      <div className="mt-10 space-y-8">
        <GuideNetwork page={page} />
        <LicensedProfessionalCTA />
        <ArticleDisclaimer />
      </div>
    </article>
  );
}
