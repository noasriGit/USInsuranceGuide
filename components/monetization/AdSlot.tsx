import { cn } from "@/lib/utils";

interface AdSlotProps {
  slot: string;
  className?: string;
}

export function AdSlot({ slot, className }: AdSlotProps) {
  return (
    <div
      data-ad-slot={slot}
      className={cn(
        "flex min-h-[120px] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50",
        className,
      )}
      aria-hidden="true"
    />
  );
}
