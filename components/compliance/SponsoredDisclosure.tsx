import { getDisclaimers } from "@/lib/content";
import { cn } from "@/lib/utils";

interface SponsoredDisclosureProps {
  className?: string;
}

export function SponsoredDisclosure({ className }: SponsoredDisclosureProps) {
  const disclaimers = getDisclaimers();
  return (
    <p
      className={cn(
        "text-xs leading-relaxed text-slate-500",
        className,
      )}
      aria-label="Sponsored disclosure"
    >
      {disclaimers.sponsoredDisclosure}
    </p>
  );
}
