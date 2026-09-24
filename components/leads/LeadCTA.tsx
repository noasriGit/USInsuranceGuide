import Link from "next/link";
import { buildLeadHref, type LeadCtaVariant, type LeadPageContext } from "@/lib/leads/context";
import { leadButtonLabel, leadHeadline, leadSupportingCopy } from "@/lib/leads/copy";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { RegionalVisual } from "@/components/visual/RegionalVisual";
import { cn } from "@/lib/utils";

interface LeadCTAProps {
  context: LeadPageContext;
  variant?: LeadCtaVariant;
  className?: string;
}

export function LeadCTA({ context, variant = "end", className }: LeadCTAProps) {
  const href = buildLeadHref(context);
  const headline = leadHeadline(context, variant);
  const label = leadButtonLabel(context, variant);
  const support = leadSupportingCopy(variant);
  const tracking = {
    dataLeadCta: variant,
    dataCoverage: context.coverageType,
    dataState: context.state,
    dataPageType: context.sourcePageType,
  };

  if (variant === "subtle") {
    return (
      <p className={cn("text-sm leading-relaxed text-slate-600", className)}>
        {headline}{" "}
        <Link
          href={href}
          className="font-medium text-navy-800 underline underline-offset-2 hover:text-navy-900"
          data-lead-cta={variant}
          data-coverage={context.coverageType}
          data-state={context.state}
          data-page-type={context.sourcePageType}
        >
          {label} →
        </Link>
      </p>
    );
  }

  if (variant === "inline" || variant === "compact") {
    return (
      <aside
        className={cn("surface-card my-8 bg-sand/70 p-5 sm:p-6", className)}
        aria-label="Get matched with insurance help"
      >
        <p className="text-sm font-semibold text-ink">{headline}</p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">{support}</p>
        <div className="mt-4">
          <ButtonLink href={href} variant="secondary" {...tracking}>
            {label}
          </ButtonLink>
        </div>
      </aside>
    );
  }

  const dark = variant === "final" || variant === "hero";

  if (dark) {
    return (
      <aside className={cn("surface-cta overflow-hidden", className)} aria-label="Get matched with insurance help">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-16">
          <div className="lg:col-span-7">
            <p className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{headline}</p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-200">{support}</p>
            <div className="mt-7">
              <ButtonLink href={href} variant="onDark" {...tracking}>
                {label}
              </ButtonLink>
            </div>
          </div>
          <div className="hidden lg:col-span-5 lg:block">
            <RegionalVisual variant="panel" />
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={cn("surface-card p-6 sm:p-7", className)} aria-label="Get matched with insurance help">
      <p className="text-xl font-semibold tracking-tight text-ink">{headline}</p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">{support}</p>
      <div className="mt-5">
        <ButtonLink href={href} variant="primary" {...tracking}>
          {label}
        </ButtonLink>
      </div>
    </aside>
  );
}
