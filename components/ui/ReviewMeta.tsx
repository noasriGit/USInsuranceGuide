import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ReviewMetaProps {
  lastReviewed?: string;
  sources?: string[];
  jurisdiction?: string;
  className?: string;
}

export function ReviewMeta({
  lastReviewed,
  sources,
  jurisdiction,
  className,
}: ReviewMetaProps) {
  if (!lastReviewed && !sources?.length && !jurisdiction) return null;

  return (
    <dl
      className={cn(
        "flex flex-wrap gap-x-6 gap-y-2 border-y border-line py-3 text-sm text-slate-600",
        className,
      )}
    >
      {lastReviewed && (
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Last reviewed
          </dt>
          <dd className="mt-1 text-slate-800">
            <time dateTime={lastReviewed}>{formatDate(lastReviewed)}</time>
          </dd>
        </div>
      )}
      {jurisdiction && (
        <div>
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Jurisdiction
          </dt>
          <dd className="mt-1 text-slate-800">{jurisdiction}</dd>
        </div>
      )}
      {sources && sources.length > 0 && (
        <div className="min-w-[12rem] flex-1">
          <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Sources reviewed
          </dt>
          <dd className="mt-1 text-slate-800">{sources.join(", ")}</dd>
        </div>
      )}
    </dl>
  );
}
