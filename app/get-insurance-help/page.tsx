import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { LeadForm } from "@/components/leads/LeadForm";
import { LicensedProfessionalNotice } from "@/components/compliance/LicensedProfessionalNotice";
import { RegionalVisual } from "@/components/visual/RegionalVisual";
import { SectionSurface } from "@/components/visual/SectionSurface";
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
    <SectionSurface tone="blue">
      <Container size="wide" className="py-8 lg:py-12">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Find Insurance Help" }]} />
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-navy-700">
              Maryland · Virginia · Washington, D.C.
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink lg:text-[2.7rem]">
              Find Insurance Help
            </h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-slate-600">
              Tell us what kind of coverage you need and where you need it. We will use your
              answers to route the request to an appropriate licensed insurance professional
              when available.
            </p>
            <ul className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600">
              <li>DMV-only coverage requests: Maryland, Virginia, and Washington, D.C.</li>
              <li>Routed to a licensed professional when a fit is available.</li>
              <li>No quotes, savings promises, or applications on this site.</li>
            </ul>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-600">
              US Insurance Guide is an educational publication. We are not an insurance carrier,
              agency, or broker.
            </p>
            <div className="mt-10 hidden lg:block">
              <RegionalVisual className="min-h-[18rem] bg-navy-900" />
            </div>
            <div className="mt-10 max-w-md">
              <LicensedProfessionalNotice />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="surface-card p-5 sm:p-8">
              <LeadForm context={context} />
            </div>
          </div>
        </div>
      </Container>
    </SectionSurface>
  );
}
