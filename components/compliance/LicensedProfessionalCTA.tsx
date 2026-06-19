import { getDisclaimers } from "@/lib/content";
import { cn } from "@/lib/utils";

interface LicensedProfessionalCTAProps {
  className?: string;
}

export function LicensedProfessionalCTA({ className }: LicensedProfessionalCTAProps) {
  const disclaimers = getDisclaimers();
  return (
    <div
      className={cn(
        "rounded-lg border border-navy-200 bg-navy-50 p-5",
        className,
      )}
    >
      <p className="text-sm font-medium text-navy-900">Before you decide on coverage</p>
      <p className="mt-2 text-sm leading-relaxed text-navy-800">
        {disclaimers.licensedProfessionalCta}
      </p>
    </div>
  );
}
