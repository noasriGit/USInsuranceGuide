import { cn } from "@/lib/utils";

interface AdSlotProps {
  slot: string;
  className?: string;
}

export function AdSlot({ slot, className }: AdSlotProps) {
  return (
    <div
      data-ad-slot={slot}
      className={cn("hidden", className)}
      aria-hidden="true"
    />
  );
}
