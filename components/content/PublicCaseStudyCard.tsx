import Link from "next/link";
import type { PublicCaseStudy } from "@/lib/schemas";
import { PUBLIC_CASE_STUDIES_PATH } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { stateLabel } from "@/lib/leads/coverage";
import { cn } from "@/lib/utils";

interface PublicCaseStudyCardProps {
  study: PublicCaseStudy;
  className?: string;
  featured?: boolean;
}

const jurisdictionTint: Record<string, string> = {
  maryland: "tint-maryland",
  virginia: "tint-virginia",
  "washington-dc": "tint-dc",
};

export function PublicCaseStudyCard({
  study,
  className,
  featured = false,
}: PublicCaseStudyCardProps) {
  const featuredFact = study.facts[0];

  return (
    <article className={cn(!featured && "h-full", className)}>
      <Link
        href={`${PUBLIC_CASE_STUDIES_PATH}${study.slug}/`}
        className={cn(
          "surface-card surface-card-interactive flex flex-col overflow-hidden",
          !featured && "h-full",
        )}
      >
        {featuredFact && (
          <div className={cn("px-6 py-6", featured && "px-6 py-8 sm:px-8", jurisdictionTint[study.jurisdiction])}>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-navy-700">
              {stateLabel(study.jurisdiction)} · Public record
            </p>
            <p
              className={cn(
                "mt-4 font-semibold tracking-tight text-ink",
                featured ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl",
              )}
            >
              {featuredFact.value}
            </p>
            <p className="mt-2 text-sm text-slate-600">{featuredFact.label}</p>
          </div>
        )}
        <div className={cn("flex flex-1 flex-col p-6", featured && "sm:p-8")}>
          {!featuredFact && (
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-navy-700">
              {stateLabel(study.jurisdiction)} · Public record
            </p>
          )}
          <h3 className="text-lg font-semibold leading-snug text-ink">{study.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{study.summary}</p>
          <p className="link-arrow mt-5">
            Read case file
            <span data-arrow aria-hidden="true">
              →
            </span>
          </p>
          <p className="mt-auto border-t border-line/80 pt-4 text-xs text-slate-500">
            Source: {study.sourcePublisher}
            {study.sourcePublishedAt ? ` · ${formatDate(study.sourcePublishedAt)}` : ""}
          </p>
        </div>
      </Link>
    </article>
  );
}
