import Link from "next/link";
import { getStates } from "@/lib/content/data";
import { cn } from "@/lib/utils";

interface StateSelectorProps {
  className?: string;
}

export function StateSelector({ className }: StateSelectorProps) {
  const states = getStates();
  return (
    <nav aria-label="Choose a DMV jurisdiction" className={cn(className)}>
      <ul className="flex flex-wrap gap-2">
        {states.map((state) => (
          <li key={state.slug}>
            <Link
              href={`/states/${state.slug}/`}
              className="inline-flex min-h-10 items-center rounded-lg border border-white/25 bg-white/8 px-3.5 text-sm font-medium text-white transition-colors hover:border-white/60 hover:bg-white/12"
            >
              {state.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
