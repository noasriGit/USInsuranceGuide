import { Container } from "@/components/layout/Container";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { Prose } from "@/components/content/Prose";
import { LeadCTA } from "@/components/leads/LeadCTA";
import { inferLeadContextFromPath } from "@/lib/leads/context";

interface StaticPageLayoutProps {
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  content: string;
  path?: string;
}

const subtlePaths = new Set([
  "/about/",
  "/contact/",
  "/editorial-policy/",
  "/corrections/",
]);

export function StaticPageLayout({
  title,
  description,
  breadcrumbs,
  content,
  path,
}: StaticPageLayoutProps) {
  const context = inferLeadContextFromPath(path ?? "/", "static");
  const showCta = Boolean(path && subtlePaths.has(path));

  return (
    <Container className="py-8">
      <Breadcrumbs items={breadcrumbs} />
      <article className="mx-auto max-w-[46rem]">
        <PageHero title={title} description={description} />
        <div className="py-10">
          <Prose content={content} />
        </div>
        {showCta && <LeadCTA context={context} variant="subtle" />}
      </article>
    </Container>
  );
}
