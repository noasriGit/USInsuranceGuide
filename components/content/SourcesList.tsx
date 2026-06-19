import type { Source } from "@/lib/schemas";
import { newTabAriaLabel } from "@/lib/a11y/external-link";
import { cn } from "@/lib/utils";

interface SourcesListProps {
  sources: Source[];
  className?: string;
}

export function SourcesList({ sources, className }: SourcesListProps) {
  if (!sources.length) return null;

  return (
    <section className={cn("mt-10", className)} aria-labelledby="sources-heading">
      <h2 id="sources-heading" className="text-xl font-bold text-slate-900">
        Sources & References
      </h2>
      <ul className="mt-4 space-y-3">
        {sources.map((source) => (
          <li key={source.url} className="text-sm text-slate-600">
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={newTabAriaLabel(source.title)}
              className="font-medium text-navy-700 underline hover:text-navy-900"
            >
              {source.title}
            </a>
            <span className="text-slate-600"> — {source.publisher}</span>
            {source.accessedAt && (
              <span className="text-slate-500"> (accessed {source.accessedAt})</span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
