import Link from "next/link";
import { getDisclaimers } from "@/lib/content";
import { cn } from "@/lib/utils";

interface ArticleDisclaimerProps {
  className?: string;
}

export function ArticleDisclaimer({ className }: ArticleDisclaimerProps) {
  const disclaimers = getDisclaimers();
  return (
    <aside
      className={cn(
        "rounded-lg border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-600",
        className,
      )}
      aria-label="Disclaimer"
    >
      <p className="font-medium text-slate-800">Disclaimer</p>
      <p className="mt-2">{disclaimers.articleDisclaimer}</p>
      <p className="mt-3">
        <Link href="/corrections/" className="text-navy-700 underline hover:text-navy-900">
          Request a correction
        </Link>
      </p>
    </aside>
  );
}
