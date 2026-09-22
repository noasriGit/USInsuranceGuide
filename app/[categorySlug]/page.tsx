import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { CategoryHubView } from "@/components/content/CategoryHubView";
import { coverageTintClass, coverageVisualFromSlug } from "@/components/visual/CoverageIcon";
import { CategoryIllustration } from "@/components/visual/CategoryIllustration";
import { buildMetadata } from "@/lib/seo/metadata";
import { shouldIndexPath, getCategoryCanonicalPath } from "@/lib/content/indexing";
import { getCategories, getCategoryBySlug, isCategorySlug } from "@/lib/content";
import { getSeoPage } from "@/lib/content/seo-manifest";
import { RESERVED_SLUGS } from "@/lib/constants";

interface PageProps {
  params: Promise<{ categorySlug: string }>;
}

export async function generateStaticParams() {
  return getCategories(true)
    .filter((category) => getCategoryCanonicalPath(category) === `/${category.slug}/`)
    .map((category) => ({ categorySlug: category.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category?.active) return {};
  const path = getCategoryCanonicalPath(category);
  const page = getSeoPage(path);
  if (!page) return {};

  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path,
    noindex: !shouldIndexPath(path),
    modifiedTime: page.lastModified,
  });
}

export default async function CategoryHubPage({ params }: PageProps) {
  const { categorySlug } = await params;

  if (RESERVED_SLUGS.has(categorySlug) || !isCategorySlug(categorySlug)) {
    notFound();
  }

  const category = getCategoryBySlug(categorySlug);
  if (!category?.active) notFound();

  const path = getCategoryCanonicalPath(category);
  if (path !== `/${categorySlug}/`) notFound();

  const page = getSeoPage(path);
  if (!page || page.status !== "published") notFound();

  const visual = coverageVisualFromSlug(category.slug);

  return (
    <>
      <div className={coverageTintClass(visual)}>
        <Container className="py-8 lg:py-10">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: category.name }]} />
          <div className="mt-6 grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <PageHero bare title={page.title} description={page.metaDescription} />
            </div>
            <div className="hidden lg:col-span-4 lg:block">
              <CategoryIllustration name={visual} />
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <CategoryHubView category={category} page={page} />
      </Container>
    </>
  );
}
