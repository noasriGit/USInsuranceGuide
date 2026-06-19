import { StaticPageLayout } from "@/components/content/StaticPageLayout";
import { buildMetadata } from "@/lib/seo/metadata";
import { staticPages } from "@/lib/content/static-pages";

const page = staticPages.insuranceDisclaimer;

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: "/insurance-disclaimer/",
});

export default function InsuranceDisclaimerPage() {
  return (
    <StaticPageLayout
      title={page.title}
      description={page.description}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Insurance Disclaimer" },
      ]}
      content={page.content}
    />
  );
}
