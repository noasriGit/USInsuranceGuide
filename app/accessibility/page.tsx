import { StaticPageLayout } from "@/components/content/StaticPageLayout";
import { buildMetadata } from "@/lib/seo/metadata";
import { staticPages } from "@/lib/content/static-pages";

const page = staticPages.accessibility;

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: "/accessibility/",
});

export default function AccessibilityPage() {
  return (
    <StaticPageLayout
      title={page.title}
      description={page.description}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Accessibility" },
      ]}
      content={page.content}
    />
  );
}
