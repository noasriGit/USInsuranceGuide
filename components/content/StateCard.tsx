import Link from "next/link";
import type { State } from "@/lib/schemas";
import { cn } from "@/lib/utils";

interface StateCardProps {
  state: State;
  className?: string;
}

const toneClass: Record<string, string> = {
  maryland: "tint-maryland",
  virginia: "tint-virginia",
  "washington-dc": "tint-dc",
};

export function StateCard({ state, className }: StateCardProps) {
  return (
    <Link
      href={`/states/${state.slug}/`}
      className={cn(
        "surface-card surface-card-interactive block p-6",
        toneClass[state.slug],
        className,
      )}
    >
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-navy-700">
        {state.name}
      </p>
      <h3 className="mt-2 text-xl font-semibold text-ink">{state.name} insurance</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{state.overview}</p>
      <p className="link-arrow mt-5">
        Explore {state.name}
        <span data-arrow aria-hidden="true">
          →
        </span>
      </p>
    </Link>
  );
}
