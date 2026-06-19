import { StaticPageLayout } from "@/components/content/StaticPageLayout";
import { CorrectionLink } from "@/components/compliance/CorrectionLink";
import { buildMetadata } from "@/lib/seo/metadata";
import { staticPages } from "@/lib/content/static-pages";

const page = staticPages.corrections;

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: "/corrections/",
});

export default function CorrectionsPage() {
  return (
    <>
      <StaticPageLayout
        title={page.title}
        description={page.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Corrections" },
        ]}
        content={page.content}
      />
      <div className="mx-auto max-w-3xl px-4 pb-10 -mt-6">
        <CorrectionLink />
      </div>
    </>
  );
}
