import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Prose } from "@/components/content/Prose";
import { FAQSection } from "@/components/content/FAQSection";
import { SourcesList } from "@/components/content/SourcesList";
import { RelatedArticles } from "@/components/content/RelatedArticles";
import { AuthorByline } from "@/components/compliance/AuthorByline";
import { LastUpdated } from "@/components/compliance/LastUpdated";
import { ArticleDisclaimer } from "@/components/compliance/ArticleDisclaimer";
import { LicensedProfessionalCTA } from "@/components/compliance/LicensedProfessionalCTA";
import { ContextualCTA } from "@/components/monetization/ContextualCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { articleSchema } from "@/lib/seo/schema";
import {
  getArticles,
  getArticleBySlug,
  getRelatedArticles,
  getAuthorBySlug,
  getCategoryBySlug,
} from "@/lib/content";
import { resolvePlacements } from "@/lib/monetization/placements";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
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

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
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

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog/" },
    { label: article.title },
  ];

  return (
    <Container className="py-8">
      <JsonLd data={articleSchema(article, author?.name ?? "US Insurance Guide")} />
      <Breadcrumbs items={breadcrumbs} />

      <article className="mx-auto max-w-3xl">
        <header className="border-b border-slate-200 pb-8">
          {category && (
            <Link
              href={`/${category.slug}/`}
              className="text-sm font-medium text-navy-700 hover:text-navy-900"
            >
              {category.name}
            </Link>
          )}
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-slate-600">{article.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <AuthorByline
              authorSlug={article.author}
              reviewerSlug={article.reviewer}
            />
          </div>
          <div className="mt-3 flex items-center gap-3 text-sm text-slate-500">
            <LastUpdated date={article.updatedAt} />
            <span>·</span>
            <span>{article.readingTime} min read</span>
          </div>
        </header>

        <div className="py-8">
          <Prose content={article.content} />
        </div>

        <ContextualCTA partners={midPartners} />

        {article.faq && <FAQSection faqs={article.faq} />}
        {article.sources && <SourcesList sources={article.sources} />}

        <div className="mt-10 space-y-8">
          <LicensedProfessionalCTA />
          <ArticleDisclaimer />
          <RelatedArticles articles={related} />
        </div>
      </article>
    </Container>
  );
}
