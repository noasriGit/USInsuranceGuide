import { CoverageIcon, type CoverageVisualId } from "@/components/visual/CoverageIcon";
import { cn } from "@/lib/utils";

interface CategoryIllustrationProps {
  name: CoverageVisualId;
  className?: string;
}

export function CategoryIllustration({ name, className }: CategoryIllustrationProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[14px] border border-navy-200/70 bg-white/55",
        className,
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 220 140" className="absolute inset-0 h-full w-full text-navy-700" preserveAspectRatio="xMidYMid slice">
        <path d="M0 35h220M0 70h220M0 105h220M44 0v140M88 0v140M132 0v140M176 0v140" fill="none" stroke="currentColor" strokeOpacity="0.08" />
      </svg>
      <div className="relative z-10 flex h-full min-h-[8.5rem] items-center justify-center p-6">
        <CoverageIcon name={name} className="h-16 w-16 text-navy-700" />
      </div>
    </div>
  );
}
