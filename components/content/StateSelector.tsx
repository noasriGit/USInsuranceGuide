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
      <ul className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/20 pt-5">
        {states.map((state) => (
          <li key={state.slug}>
            <Link
              href={`/states/${state.slug}/`}
              className="text-sm font-medium text-white underline-offset-4 hover:underline"
            >
              {state.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
