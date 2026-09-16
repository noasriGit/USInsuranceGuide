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

export function PublicCaseStudySection({
  studies,
  title = "Insurance in the real world",
  description = "Public records and regulatory reports can show how insurance rules affect actual consumers. These files are not customer testimonials.",
}: PublicCaseStudySectionProps) {
  if (studies.length === 0) return null;

  return (
    <section aria-labelledby="case-files-heading">
      <SectionHeading
        id="case-files-heading"
        eyebrow="Public insurance case files"
        title={title}
        description={description}
      />
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        {studies.map((study) => (
          <PublicCaseStudyCard key={study.slug} study={study} />
        ))}
      </div>
      <div className="mt-8">
        <ButtonLink href={PUBLIC_CASE_STUDIES_PATH} variant="secondary">
          Browse public case files
        </ButtonLink>
      </div>
    </section>
  );
}
