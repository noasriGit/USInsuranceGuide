import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { LeadForm } from "@/components/leads/LeadForm";
import { LicensedProfessionalNotice } from "@/components/compliance/LicensedProfessionalNotice";
import { buildMetadata } from "@/lib/seo/metadata";
import { getSeoPage } from "@/lib/content";
import { parseLeadSearchParams } from "@/lib/leads/context";
import { LEAD_PATH } from "@/lib/constants";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const page = getSeoPage(LEAD_PATH);

export const metadata = buildMetadata({
  title: page?.metaTitle ?? "Find Insurance Help",
  description:
    page?.metaDescription ??
    "Request insurance help in Maryland, Virginia, or Washington, D.C.",
  path: LEAD_PATH,
  modifiedTime: page?.lastModified,
});

export default async function GetInsuranceHelpPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const context = parseLeadSearchParams(params);

  return (
    <Container className="py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Find Insurance Help" }]} />
      <PageHero
        eyebrow="Maryland · Virginia · Washington, D.C."
        title="Find Insurance Help"
        description="Tell us what kind of coverage you need and where you need it. We'll use your answers to route the request to an appropriate licensed insurance professional when available."
      />
      <div className="py-10">
        <p className="max-w-xl text-sm leading-relaxed text-slate-600">
          US Insurance Guide is an educational publication. We are not an insurance carrier,
          agency, or broker, and this form is not an application, quote, or offer of coverage.
        </p>
        <div className="mt-10">
          <LeadForm context={context} />
        </div>
        <div className="mt-12 max-w-xl">
          <LicensedProfessionalNotice />
        </div>
      </div>
    </Container>
  );
}
