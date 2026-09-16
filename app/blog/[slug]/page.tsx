import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Prose } from "@/components/content/Prose";
import { FAQSection } from "@/components/content/FAQSection";
import { SourcesList } from "@/components/content/SourcesList";
import { RelatedArticles } from "@/components/content/RelatedArticles";
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
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema } from "@/lib/seo/schema";
import {
  getBlogArticles,
  getArticleBySlug,
  getRelatedArticles,
  getAuthorBySlug,
  getCategoryBySlug,
  getHrefForArticleSlug,
  isMigratedArticleSlug,
  getPublicCaseStudiesForPage,
} from "@/lib/content";
import { resolvePlacements } from "@/lib/monetization/placements";
import { extractMarkdownHeadings, splitMarkdownForInlineCta } from "@/lib/utils";
import {
  coverageFromSlug,
  inferLeadContextFromPath,
  shouldShowStickyLeadCta,
  type LeadPageContext,
} from "@/lib/leads/context";
import type { LeadStateId } from "@/lib/leads/coverage";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getBlogArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  if (isMigratedArticleSlug(slug)) return {};
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return buildMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path: `/blog/${slug}/`,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
  });
}

function articleLeadContext(path: string, categorySlug?: string, stateSlug?: string): LeadPageContext {
  const inferred = inferLeadContextFromPath(path, "article");
  return {
    ...inferred,
    coverageType: inferred.coverageType ?? coverageFromSlug(categorySlug),
    state: inferred.state ?? (stateSlug as LeadStateId | undefined),
    sourceTopic: categorySlug,
    sourceState: inferred.sourceState ?? (stateSlug as LeadStateId | undefined),
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  if (isMigratedArticleSlug(slug)) {
    redirect(getHrefForArticleSlug(slug));
  }
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const author = getAuthorBySlug(article.author);
  const category = getCategoryBySlug(article.category);
  const related = getRelatedArticles(article);
  const midPartners = resolvePlacements({
    slot: "article-mid-cta",
    categorySlug: article.category,
    stateSlug: article.states?.[0],
  });
  const path = `/blog/${slug}/`;
  const context = articleLeadContext(path, article.category, article.states?.[0]);
  const headings = extractMarkdownHeadings(article.content);
  const { before, after } = splitMarkdownForInlineCta(article.content);
  const sticky = shouldShowStickyLeadCta({ ...context, sourcePageType: "article" });
  const caseStudies = getPublicCaseStudiesForPage({
    stateSlug: article.states?.[0],
    categorySlug: article.category,
    limit: 1,
  });

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Guides", href: "/blog/" },
    { label: article.title },
  ];

  return (
    <Container className="py-8">
      <JsonLd data={articleSchema(article, author?.name ?? "US Insurance Guide")} />
      <Breadcrumbs items={breadcrumbs} />

      <article className={sticky ? "has-sticky-cta mx-auto max-w-[46rem]" : "mx-auto max-w-[46rem]"}>
        <header className="border-b border-line pb-8">
          {category && (
            <Link
              href={category.canonicalPath ?? `/${category.slug}/`}
              className="text-sm font-medium text-navy-800 hover:underline"
            >
              {category.name}
            </Link>
          )}
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">{article.excerpt}</p>
          <div className="mt-6">
            <AuthorByline authorSlug={article.author} reviewerSlug={article.reviewer} />
          </div>
          <div className="mt-3 flex items-center gap-3 text-sm text-slate-500">
            <LastUpdated date={article.updatedAt} />
            <span aria-hidden="true">·</span>
            <span>{article.readingTime} min read</span>
          </div>
        </header>

        <ReviewMeta
          className="mt-6"
          lastReviewed={article.updatedAt}
          sources={article.sources?.map((source) => source.publisher).slice(0, 4)}
        />

        {article.faq && article.faq.length > 0 && (
          <section className="mt-8 border-t border-line pt-6" aria-labelledby="key-points-heading">
            <h2 id="key-points-heading" className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
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
          <nav className="mt-8 border-t border-line pt-6" aria-labelledby="toc-heading">
            <h2 id="toc-heading" className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
              In this guide
            </h2>
            <ol className="mt-3 space-y-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a href={`#${heading.id}`} className="text-sm text-navy-800 hover:underline">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="py-8">
          <Prose content={before} />
          <LeadCTA context={context} variant="inline" />
          {after && <Prose content={after} />}
        </div>

        <ContextualCTA partners={midPartners} context={context} variant="end" />
        {caseStudies.length > 0 && <PublicCaseStudySection studies={caseStudies} />}
        {article.faq && <FAQSection faqs={article.faq} />}
        {article.sources && <SourcesList sources={article.sources} />}

        <div className="mt-10 space-y-8">
          <LicensedProfessionalNotice />
          <ArticleDisclaimer />
          <RelatedArticles articles={related} />
        </div>
      </article>
      {sticky && <StickyMobileLeadCTA context={{ ...context, sourcePageType: "article" }} />}
    </Container>
  );
}
