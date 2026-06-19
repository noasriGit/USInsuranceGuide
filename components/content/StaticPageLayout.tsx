import { Container } from "@/components/layout/Container";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { Prose } from "@/components/content/Prose";

interface StaticPageLayoutProps {
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  content: string;
}

export function StaticPageLayout({
  title,
  description,
  breadcrumbs,
  content,
}: StaticPageLayoutProps) {
  return (
    <Container className="py-8">
      <Breadcrumbs items={breadcrumbs} />
      <article>
        <PageHero title={title} description={description} />
        <div className="py-10">
          <Prose content={content} />
        </div>
      </article>
    </Container>
  );
}
