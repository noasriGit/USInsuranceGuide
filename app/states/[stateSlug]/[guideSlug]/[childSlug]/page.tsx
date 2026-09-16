import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { GuideArticleView } from "@/components/content/GuideArticleView";
import { StateGuideView } from "@/components/content/StateGuideView";
import { buildMetadata } from "@/lib/seo/metadata";
import { shouldIndexPath } from "@/lib/content/indexing";
import {
  getAuthorBySlug,
  getCategoryBySlug,
  getPublishedStatePage,
  getSeoPage,
  getStateBySlug,
} from "@/lib/content";
import { resolveSeoPageContent } from "@/lib/content/resolve-page";
import { getPublicSeoPages } from "@/lib/content/seo-manifest";

interface PageProps {
  params: Promise<{ stateSlug: string; guideSlug: string; childSlug: string }>;
}

export async function generateStaticParams() {
  return getPublicSeoPages()
    .filter(
      (page) =>
        page.kind === "state-child" &&
        page.stateSlug &&
        page.guideSlug &&
        page.childSlug,
    )
    .map((page) => ({
      stateSlug: page.stateSlug as string,
      guideSlug: page.guideSlug as string,
      childSlug: page.childSlug as string,
    }));
}

export async function generateMetadata({ params }: PageProps) {
  const { stateSlug, guideSlug, childSlug } = await params;
  const page = getPublishedStatePage(stateSlug, guideSlug, childSlug);
  if (!page) return {};

  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: page.path,
    noindex: !shouldIndexPath(page.path),
    type: page.contentSource?.type === "article" ? "article" : "website",
    modifiedTime: page.lastModified,
    publishedTime: page.effectiveDate,
  });
}

export default async function StateChildPage({ params }: PageProps) {
  const { stateSlug, guideSlug, childSlug } = await params;
  const state = getStateBySlug(stateSlug);
  const page = getPublishedStatePage(stateSlug, guideSlug, childSlug);
  if (!state || !page || page.kind !== "state-child") notFound();

  const content = resolveSeoPageContent(page);
  if (content.type === "missing" || content.type === "none") notFound();

  const parent = page.parentPath ? getSeoPage(page.parentPath) : undefined;
  const category = page.categorySlug
    ? getCategoryBySlug(page.categorySlug)
    : undefined;
  const topicHub = category
    ? getSeoPage(category.canonicalPath ?? `/${category.slug}/`)
    : undefined;

  const breadcrumbs = [
    { label: "Home", href: "/" },
    ...(topicHub
      ? [{ label: topicHub.navLabel ?? topicHub.title, href: topicHub.path }]
      : []),
    { label: state.name, href: `/states/${stateSlug}/` },
    ...(parent
      ? [{ label: parent.navLabel ?? parent.title, href: parent.path }]
      : []),
    { label: page.navLabel ?? page.title },
  ];

  return (
    <Container className="py-8">
      <Breadcrumbs items={breadcrumbs} />
      {content.type === "article" ? (
        <GuideArticleView
          page={page}
          article={content.article}
          authorName={
            getAuthorBySlug(content.article.author)?.name ?? "US Insurance Guide"
          }
          categoryHref={topicHub?.path}
          categoryName={category?.name}
        />
      ) : content.type === "state-guide" ? (
        <>
          <PageHero title={page.title} description={page.metaDescription} />
          <div className="py-10">
            <StateGuideView page={page} guide={content.guide} />
          </div>
        </>
      ) : (
        notFound()
      )}
    </Container>
  );
}
