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
        "block rounded-lg border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md hover:border-navy-200",
        className,
      )}
    >
      <h3 className="text-lg font-semibold text-slate-900">{state.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3">
        {state.overview}
      </p>
    </Link>
  );
}
