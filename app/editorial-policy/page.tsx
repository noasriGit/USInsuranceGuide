import { StaticPageLayout } from "@/components/content/StaticPageLayout";
import { buildMetadata } from "@/lib/seo/metadata";
import { staticPages } from "@/lib/content/static-pages";

const page = staticPages.editorialPolicy;

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: "/editorial-policy/",
});

export default function EditorialPolicyPage() {
  return (
    <StaticPageLayout
      title={page.title}
      description={page.description}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Editorial Policy" },
      ]}
      content={page.content}
    />
  );
}
