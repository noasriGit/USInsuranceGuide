import { PUBLIC_CASE_STUDY_DISCLAIMER } from "@/content/data/public-case-studies";
import { cn } from "@/lib/utils";

export function PublicCaseStudyDisclaimer({ className }: { className?: string }) {
  return (
    <p className={cn("text-sm leading-relaxed text-slate-600", className)}>
      {PUBLIC_CASE_STUDY_DISCLAIMER}
    </p>
  );
}
