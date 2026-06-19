import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { DirectoryListing } from "@/components/monetization/DirectoryListing";
import { LicensedProfessionalCTA } from "@/components/compliance/LicensedProfessionalCTA";
import { buildMetadata } from "@/lib/seo/metadata";
import { getStates, getStateBySlug, getPartnersByState } from "@/lib/content";

interface PageProps {
  params: Promise<{ stateSlug: string }>;
}

export async function generateStaticParams() {
  return getStates().map((s) => ({ stateSlug: s.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) return {};

  return buildMetadata({
    title: `${state.name} Insurance Professionals Directory`,
    description: `Find insurance professionals serving ${state.name}. Educational directory — sponsored listings are clearly labeled.`,
    path: `/insurance-agencies/${stateSlug}/`,
  });
}

export default async function StateDirectoryPage({ params }: PageProps) {
  const { stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) notFound();

  const partners = getPartnersByState(stateSlug);

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Find an Insurance Professional", href: "/insurance-agencies/" },
          { label: state.name },
        ]}
      />
      <PageHero
        title={`Insurance Professionals in ${state.name}`}
        description={`Local insurance resources for ${state.name} residents and businesses.`}
      />
      <div className="py-10 space-y-8">
        <LicensedProfessionalCTA />
        <DirectoryListing partners={partners} stateName={state.name} />
      </div>
    </Container>
  );
}
