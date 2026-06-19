import { StaticPageLayout } from "@/components/content/StaticPageLayout";
import { buildMetadata } from "@/lib/seo/metadata";
import { staticPages } from "@/lib/content/static-pages";

const page = staticPages.terms;

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <StaticPageLayout
      title={page.title}
      description={page.description}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Terms of Use" },
      ]}
      content={page.content}
    />
  );
}
