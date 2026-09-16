import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { StateCard } from "@/components/content/StateCard";
import { buildMetadata } from "@/lib/seo/metadata";
import { getSeoPage, getStates } from "@/lib/content";

const page = getSeoPage("/states/");

export const metadata = buildMetadata({
  title: page?.metaTitle ?? "DMV Insurance Guides",
  description:
    page?.metaDescription ??
    "Insurance guides for Maryland, Virginia, and Washington, D.C.",
  path: "/states/",
  modifiedTime: page?.lastModified,
});

export default function StatesIndexPage() {
  const states = getStates();

  return (
    <Container className="py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "DMV Guides" }]} />
      <PageHero
        title={page?.title ?? "Maryland, Virginia & Washington, D.C. Insurance Guides"}
        description="US Insurance Guide covers the DMV region only. Each hub explains required insurance, major coverage types, official agencies, and published state guides."
      />
      <div className="py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {states.map((state) => (
            <StateCard key={state.slug} state={state} />
          ))}
        </div>
      </div>
    </Container>
  );
}
