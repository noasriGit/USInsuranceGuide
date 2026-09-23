"use client";

import { useState } from "react";
import { buildLeadHref, type LeadPageContext } from "@/lib/leads/context";
import { leadButtonLabel } from "@/lib/leads/copy";
import { ButtonLink } from "@/components/ui/ButtonLink";

interface StickyMobileLeadCTAProps {
  context: LeadPageContext;
}

export function StickyMobileLeadCTA({ context }: StickyMobileLeadCTAProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const href = buildLeadHref(context);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/92 px-4 py-3 shadow-[0_-8px_30px_rgb(8_47_91_/_0.08)] lg:hidden supports-[backdrop-filter]:bg-white/85 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex max-w-6xl items-center gap-3">
        <ButtonLink
          href={href}
          className="min-h-11 flex-1"
          dataLeadCta="sticky"
          dataCoverage={context.coverageType}
          dataState={context.state}
          dataPageType={context.sourcePageType}
        >
          {leadButtonLabel(context, "sticky")}
        </ButtonLink>
        <button
          type="button"
          className="min-h-11 min-w-11 text-sm text-slate-600 hover:text-ink"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss insurance help prompt"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
