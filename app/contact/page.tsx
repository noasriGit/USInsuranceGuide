import { StaticPageLayout } from "@/components/content/StaticPageLayout";
import { buildMetadata } from "@/lib/seo/metadata";
import { staticPages } from "@/lib/content/static-pages";

const page = staticPages.contact;

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <StaticPageLayout
      title={page.title}
      description={page.description}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Contact" },
      ]}
      content={page.content}
    />
  );
}
