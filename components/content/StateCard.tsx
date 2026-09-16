import Link from "next/link";
import type { State } from "@/lib/schemas";
import { cn } from "@/lib/utils";

interface StateCardProps {
  state: State;
  className?: string;
}

export function StateCard({ state, className }: StateCardProps) {
  return (
    <Link
      href={`/states/${state.slug}/`}
      className={cn(
        "interactive-row block border-t border-line pt-4 hover:border-navy-700",
        className,
      )}
    >
      <h3 className="text-lg font-semibold text-ink">{state.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{state.overview}</p>
    </Link>
  );
}
