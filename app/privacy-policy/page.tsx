import { StaticPageLayout } from "@/components/content/StaticPageLayout";
import { buildMetadata } from "@/lib/seo/metadata";
import { staticPages } from "@/lib/content/static-pages";

const page = staticPages.privacyPolicy;

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: "/privacy-policy/",
});

export default function PrivacyPolicyPage() {
  return (
    <StaticPageLayout
      title={page.title}
      description={page.description}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Privacy Policy" },
      ]}
      content={page.content}
    />
  );
}
