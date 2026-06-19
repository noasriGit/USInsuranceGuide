import { getDisclaimers } from "@/lib/content";
import { cn } from "@/lib/utils";

interface FooterDisclaimerProps {
  className?: string;
}

export function FooterDisclaimer({ className }: FooterDisclaimerProps) {
  const disclaimers = getDisclaimers();
  return (
    <p className={cn("text-xs leading-relaxed text-slate-500", className)}>
      {disclaimers.siteFooterDisclaimer}
    </p>
  );
}
