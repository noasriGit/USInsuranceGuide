import { StaticPageLayout } from "@/components/content/StaticPageLayout";
import { buildMetadata } from "@/lib/seo/metadata";
import { staticPages } from "@/lib/content/static-pages";

const page = staticPages.about;

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: "/about/",
});

export default function AboutPage() {
  return (
    <StaticPageLayout
      title={page.title}
      description={page.description}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      content={page.content}
    />
  );
}
