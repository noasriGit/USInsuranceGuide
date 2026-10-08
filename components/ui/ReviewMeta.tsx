import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ReviewMetaProps {
  lastUpdated?: string;
  lastReviewed?: string;
  sources?: string[];
  jurisdiction?: string;
  className?: string;
}

export function ReviewMeta({
  lastUpdated,
  lastReviewed,
  sources,
  jurisdiction,
  className,
}: ReviewMetaProps) {
  if (!lastUpdated && !lastReviewed && !sources?.length && !jurisdiction) return null;

  return (
    <dl
      className={cn(
        "grid gap-4 rounded-xl bg-navy-50/80 px-5 py-4 text-sm text-slate-600 sm:grid-cols-3",
        className,
      )}
    >
      {lastUpdated && (
        <div>
          <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-navy-700">
            Last updated
          </dt>
          <dd className="mt-1 text-ink">
            <time dateTime={lastUpdated}>{formatDate(lastUpdated)}</time>
          </dd>
        </div>
      )}
      {lastReviewed && (
        <div>
          <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-navy-700">
            Last reviewed
          </dt>
          <dd className="mt-1 text-ink">
            <time dateTime={lastReviewed}>{formatDate(lastReviewed)}</time>
          </dd>
        </div>
      )}
      {jurisdiction && (
        <div>
          <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-navy-700">
            Jurisdiction
          </dt>
          <dd className="mt-1 text-ink">{jurisdiction}</dd>
        </div>
      )}
      {sources && sources.length > 0 && (
        <div>
          <dt className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-navy-700">
            Sources reviewed
          </dt>
          <dd className="mt-1 text-ink">{sources.join(", ")}</dd>
        </div>
      )}
    </dl>
  );
}
