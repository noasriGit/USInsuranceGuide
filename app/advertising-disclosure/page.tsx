import { StaticPageLayout } from "@/components/content/StaticPageLayout";
import { EditorialIndependenceNote } from "@/components/compliance/EditorialIndependenceNote";
import { buildMetadata } from "@/lib/seo/metadata";
import { staticPages } from "@/lib/content/static-pages";

const page = staticPages.advertisingDisclosure;

export const metadata = buildMetadata({
  title: page.title,
  description: page.description,
  path: "/advertising-disclosure/",
});

export default function AdvertisingDisclosurePage() {
  return (
    <>
      <StaticPageLayout
        title={page.title}
        description={page.description}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Advertising Disclosure" },
        ]}
        content={page.content}
      />
      <div className="mx-auto max-w-3xl px-4 pb-10 -mt-6">
        <EditorialIndependenceNote />
      </div>
    </>
  );
}
