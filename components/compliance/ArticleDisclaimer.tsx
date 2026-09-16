import { getDisclaimers } from "@/lib/content";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ArticleDisclaimerProps {
  className?: string;
}

export function ArticleDisclaimer({ className }: ArticleDisclaimerProps) {
  const disclaimers = getDisclaimers();
  return (
    <aside className={cn("border-t border-line pt-5 text-sm leading-relaxed text-slate-600", className)} aria-label="Disclaimer">
      <p className="font-semibold text-ink">Disclaimer</p>
      <p className="mt-2">{disclaimers.articleDisclaimer}</p>
      <p className="mt-3">
        <Link href="/corrections/" className="text-navy-800 underline underline-offset-2 hover:text-navy-900">
          Request a correction
        </Link>
      </p>
    </aside>
  );
}
