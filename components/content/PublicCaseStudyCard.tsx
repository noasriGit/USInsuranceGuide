import Link from "next/link";
import type { PublicCaseStudy } from "@/lib/schemas";
import { PUBLIC_CASE_STUDIES_PATH } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { stateLabel } from "@/lib/leads/coverage";
import { cn } from "@/lib/utils";

interface PublicCaseStudyCardProps {
  study: PublicCaseStudy;
  className?: string;
}

export function PublicCaseStudyCard({ study, className }: PublicCaseStudyCardProps) {
  const featured = study.facts[0];
  return (
    <article className={cn("border-t border-line pt-5", className)}>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-700">
        {stateLabel(study.jurisdiction)} · Public record
      </p>
      {featured && (
        <p className="mt-3 text-2xl font-semibold tracking-tight text-ink">{featured.value}</p>
      )}
      <h3 className="mt-2 text-lg font-semibold text-ink">
        <Link
          href={`${PUBLIC_CASE_STUDIES_PATH}${study.slug}/`}
          className="link-underline hover:text-navy-800"
        >
          {study.title}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{study.summary}</p>
      <p className="mt-3 text-xs text-slate-500">
        {study.sourcePublisher}
        {study.sourcePublishedAt ? ` · ${formatDate(study.sourcePublishedAt)}` : ""}
      </p>
    </article>
  );
}
