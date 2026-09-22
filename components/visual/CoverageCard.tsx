import Link from "next/link";
import { CoverageIcon, coverageTintClass, type CoverageVisualId } from "@/components/visual/CoverageIcon";
import { cn } from "@/lib/utils";

interface CoverageCardProps {
  href: string;
  title: string;
  description: string;
  visual: CoverageVisualId;
  className?: string;
}

export function CoverageCard({ href, title, description, visual, className }: CoverageCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "surface-card surface-card-interactive group p-5 sm:p-6",
        coverageTintClass(visual),
        className,
      )}
    >
      <CoverageIcon name={visual} />
      <p className="mt-5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-navy-700">
        {title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
      <p className="link-arrow mt-5">
        Explore {title.toLowerCase()}
        <span data-arrow aria-hidden="true">
          →
        </span>
      </p>
    </Link>
  );
}
