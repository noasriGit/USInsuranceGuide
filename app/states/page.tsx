import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { StateCard } from "@/components/content/StateCard";
import { buildMetadata } from "@/lib/seo/metadata";
import { getStates } from "@/lib/content";

export const metadata = buildMetadata({
  title: "State Insurance Guides",
  description:
    "State-by-state insurance guides for Virginia, Maryland, and Washington, D.C. Educational resources on coverage requirements and options.",
  path: "/states/",
});

export default function StatesIndexPage() {
  const states = getStates();

  return (
    <Container className="py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "State Guides" }]} />
      <PageHero
        title="State Insurance Guides"
        description="Educational insurance resources organized by state. Explore coverage requirements, local considerations, and related guides."
      />
      <div className="py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {states.map((state) => (
            <StateCard key={state.slug} state={state} />
          ))}
        </div>
        <p className="mt-10 text-sm text-slate-500">
          Additional state guides will be added as US Insurance Guide expands nationally.
        </p>
      </div>
    </Container>
  );
}
