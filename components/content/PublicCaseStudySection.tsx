import Link from "next/link";
import type { PublicCaseStudy } from "@/lib/schemas";
import { PUBLIC_CASE_STUDIES_PATH } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PublicCaseStudyCard } from "./PublicCaseStudyCard";
import { ButtonLink } from "@/components/ui/ButtonLink";

interface PublicCaseStudySectionProps {
  studies: PublicCaseStudy[];
  title?: string;
  description?: string;
}

function PublicCaseStudyBrowseCard() {
  return (
    <article className="h-full">
      <Link
        href={PUBLIC_CASE_STUDIES_PATH}
        className="surface-card surface-card-interactive flex h-full min-h-[16rem] flex-col p-6 sm:p-8"
      >
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-navy-700">
          Public records
        </p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
          Browse all case files
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
          Regulatory reports, complaint processes, and consumer-protection notices from
          Maryland, Virginia, and Washington, D.C.
        </p>
        <p className="link-arrow mt-auto pt-6">
          View case files
          <span data-arrow aria-hidden="true">
            →
          </span>
        </p>
      </Link>
    </article>
  );
}

export function PublicCaseStudySection({
  studies,
  title = "Insurance in the real world",
  description = "Public records and regulatory reports can show how insurance rules affect actual consumers. These files are not customer testimonials.",
}: PublicCaseStudySectionProps) {
  if (studies.length === 0) return null;

  const [featured, ...rest] = studies;
  const useBentoLayout = studies.length >= 3;

  return (
    <section aria-labelledby="case-files-heading">
      <SectionHeading
        id="case-files-heading"
        eyebrow="Public insurance case files"
        title={title}
        description={description}
      />
      {useBentoLayout ? (
        <div className="mt-8 grid items-start gap-5 lg:grid-cols-12">
          <div className="lg:col-span-7 lg:row-span-2">
            <PublicCaseStudyCard study={featured} featured />
          </div>
          {rest[0] && (
            <div className="lg:col-span-5">
              <PublicCaseStudyCard study={rest[0]} />
            </div>
          )}
          {rest[1] && (
            <div className="lg:col-span-5">
              <PublicCaseStudyCard study={rest[1]} />
            </div>
          )}
          <div className="lg:col-span-7">
            {rest[2] ? <PublicCaseStudyCard study={rest[2]} /> : <PublicCaseStudyBrowseCard />}
          </div>
        </div>
      ) : (
        <div className="mt-8 grid items-start gap-5 lg:grid-cols-12">
          <div className={rest.length > 0 ? "lg:col-span-7" : "lg:col-span-12"}>
            <PublicCaseStudyCard study={featured} featured />
          </div>
          {rest.length > 0 && (
            <div className="grid gap-5 lg:col-span-5">
              {rest.map((study) => (
                <PublicCaseStudyCard key={study.slug} study={study} />
              ))}
            </div>
          )}
        </div>
      )}
      <div className="mt-8">
        <ButtonLink href={PUBLIC_CASE_STUDIES_PATH} variant="secondary">
          Browse public case files
        </ButtonLink>
      </div>
    </section>
  );
}
