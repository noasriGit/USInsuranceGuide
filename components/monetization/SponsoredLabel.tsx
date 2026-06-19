import { cn } from "@/lib/utils";

interface SponsoredLabelProps {
  className?: string;
}

export function SponsoredLabel({ className }: SponsoredLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-800 ring-1 ring-amber-200",
        className,
      )}
    >
      Sponsored Partner
    </span>
  );
}
