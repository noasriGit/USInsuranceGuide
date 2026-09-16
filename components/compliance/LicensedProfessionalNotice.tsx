import { getDisclaimers } from "@/lib/content";
import { cn } from "@/lib/utils";

interface LicensedProfessionalNoticeProps {
  className?: string;
}

export function LicensedProfessionalNotice({ className }: LicensedProfessionalNoticeProps) {
  const disclaimers = getDisclaimers();
  return (
    <aside
      aria-label="Licensed professional reminder"
      className={cn("border-t border-line pt-5", className)}
    >
      <p className="text-sm font-semibold text-ink">Before you decide on coverage</p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {disclaimers.licensedProfessionalCta}
      </p>
    </aside>
  );
}
