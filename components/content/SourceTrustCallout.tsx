import { newTabAriaLabel } from "@/lib/a11y/external-link";
import { QuoteBlock } from "@/components/ui/QuoteBlock";
import { cn } from "@/lib/utils";

interface SourceTrustCalloutProps {
  className?: string;
}

export function SourceTrustCallout({ className }: SourceTrustCalloutProps) {
  return (
    <aside className={cn("border-y border-line py-6", className)} aria-label="Editorial standards">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-700">
        Why sources matter
      </p>
      <QuoteBlock
        className="mt-4"
        text="AI tools can often provide incorrect information about insurance."
        attribution="Virginia State Corporation Commission, Bureau of Insurance"
      />
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
        US Insurance Guide cites official sources, records last-reviewed dates, and keeps sourced
        facts separate from general explanation. Verify current rules with the regulator or a
        licensed professional.{" "}
        <a
          href="https://www.scc.virginia.gov/consumers/insurance/file-an-insurance-complaint/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={newTabAriaLabel("Virginia SCC Bureau of Insurance complaint page")}
          className="font-medium text-navy-800 underline underline-offset-2"
        >
          Read the Virginia SCC note
        </a>
        .
      </p>
    </aside>
  );
}
