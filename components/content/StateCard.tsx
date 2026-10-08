import Link from "next/link";
import type { State } from "@/lib/schemas";
import { cn } from "@/lib/utils";

interface StateCardProps {
  state: State;
  autoGuide?: { href: string; label: string };
  className?: string;
}

const toneClass: Record<string, string> = {
  maryland: "tint-maryland",
  virginia: "tint-virginia",
  "washington-dc": "tint-dc",
};

export function StateCard({ state, autoGuide, className }: StateCardProps) {
  return (
    <article
      className={cn(
        "surface-card p-6",
        toneClass[state.slug],
        className,
      )}
    >
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-navy-700">
        {state.name}
      </p>
      <h3 className="mt-2 text-xl font-semibold text-ink">{state.name} insurance</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{state.overview}</p>
      <div className="mt-5 flex flex-col gap-3">
        <Link href={`/states/${state.slug}/`} className="link-arrow">
          Explore {state.name} insurance guides
          <span data-arrow aria-hidden="true">→</span>
        </Link>
        {autoGuide && (
          <Link
            href={autoGuide.href}
            className="rounded-lg bg-white/65 px-3 py-3 text-sm font-medium text-navy-800 hover:bg-white"
          >
            {autoGuide.label}
          </Link>
        )}
      </div>
    </article>
  );
}
