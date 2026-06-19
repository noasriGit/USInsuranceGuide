import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { LicensedProfessionalCTA } from "@/components/compliance/LicensedProfessionalCTA";
import { buildMetadata } from "@/lib/seo/metadata";
import { SHOW_INSURANCE_DIRECTORY_NAV } from "@/lib/constants";
import { getStates } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Find an Insurance Professional",
  description:
    "Directory of insurance professionals by state. Educational resource — not an endorsement. Sponsored listings are clearly labeled.",
  path: "/insurance-agencies/",
  noindex: !SHOW_INSURANCE_DIRECTORY_NAV,
});

export default function DirectoryIndexPage() {
  const states = getStates();

  return (
    <Container className="py-8">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Find an Insurance Professional" },
        ]}
      />
      <PageHero
        title="Find an Insurance Professional"
        description="Browse local insurance resources by state. US Insurance Guide is an educational resource and does not endorse any specific agency or company."
      />
      <div className="py-10 space-y-8">
        <LicensedProfessionalCTA />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {states.map((state) => (
            <Link
              key={state.slug}
              href={`/insurance-agencies/${state.slug}/`}
              className="block rounded-lg border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md hover:border-navy-200"
            >
              <h3 className="text-lg font-semibold text-slate-900">{state.name}</h3>
              <p className="mt-2 text-sm text-slate-600">
                Insurance professionals serving {state.name}
              </p>
            </Link>
          ))}
        </div>
        <p className="text-sm text-slate-500">
          Select a state to view available insurance professional listings. Sponsored partners are
          clearly labeled.
        </p>
      </div>
    </Container>
  );
}
