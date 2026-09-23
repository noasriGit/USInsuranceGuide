import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { CategoryHubView } from "@/components/content/CategoryHubView";
import { GuideArticleView } from "@/components/content/GuideArticleView";
import { buildMetadata } from "@/lib/seo/metadata";
import { shouldIndexPath } from "@/lib/content/indexing";
import { getAuthorBySlug, getCategoryBySlug } from "@/lib/content";
import { getPublicSeoPages, getSeoPage } from "@/lib/content/seo-manifest";
import { resolveSeoPageContent } from "@/lib/content/resolve-page";
import { RESERVED_SLUGS } from "@/lib/constants";

interface PageProps {
  params: Promise<{ categorySlug: string; childSlug: string }>;
}

export async function generateStaticParams() {
  return getPublicSeoPages()
    .filter((page) => page.kind === "topic-guide")
    .map((page) => {
      const segments = page.path.split("/").filter(Boolean);
      return { categorySlug: segments[0], childSlug: segments[1] };
    })
    .filter(
      (params): params is { categorySlug: string; childSlug: string } =>
        Boolean(params.categorySlug && params.childSlug),
    );
}

export async function generateMetadata({ params }: PageProps) {
  const { categorySlug, childSlug } = await params;
  const path = `/${categorySlug}/${childSlug}/`;
  const page = getSeoPage(path);
  if (!page) return {};

  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path,
    noindex: !shouldIndexPath(path),
    type: page.contentSource?.type === "article" ? "article" : "website",
    modifiedTime: page.lastModified,
  });
}

export default async function NestedTopicHubPage({ params }: PageProps) {
  const { categorySlug, childSlug } = await params;
  if (RESERVED_SLUGS.has(categorySlug)) notFound();

  const path = `/${categorySlug}/${childSlug}/`;
  const page = getSeoPage(path);
  if (!page || page.status !== "published" || page.kind !== "topic-guide") {
    notFound();
  }

  const category = page.categorySlug
    ? getCategoryBySlug(page.categorySlug)
    : undefined;
  if (!category?.active) notFound();

  const parent = page.parentPath ? getSeoPage(page.parentPath) : undefined;
  const content = resolveSeoPageContent(page);

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          ...(parent
            ? [{ label: parent.navLabel ?? parent.title, href: parent.path }]
            : []),
          { label: page.navLabel ?? page.title },
        ]}
      />
      {content.type === "article" ? (
        <GuideArticleView
          page={page}
          article={content.article}
          authorName={
            getAuthorBySlug(content.article.author)?.name ?? "US Insurance Guide"
          }
          categoryHref={parent?.path ?? category.canonicalPath ?? `/${category.slug}/`}
          categoryName={parent?.navLabel ?? category.name}
        />
      ) : (
        <>
          <PageHero title={page.title} description={page.metaDescription} />
          <CategoryHubView category={category} page={page} />
        </>
      )}
    </Container>
  );
}
