import Link from "next/link";
import { buildLeadHref, type LeadCtaVariant, type LeadPageContext } from "@/lib/leads/context";
import { leadButtonLabel, leadHeadline, leadSupportingCopy } from "@/lib/leads/copy";
import { ButtonLink } from "@/components/ui/ButtonLink";
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
        className={cn("my-8 border-y border-line py-5", className)}
        aria-label="Request insurance help"
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

  return (
    <aside
      className={cn(
        dark
          ? "bg-[image:var(--navy-wash)] px-6 py-8 text-white sm:px-8"
          : "border-y border-line py-6",
        className,
      )}
      aria-label="Request insurance help"
    >
      <p className={cn("text-xl font-semibold tracking-tight", dark ? "text-white" : "text-ink")}>
        {headline}
      </p>
      <p
        className={cn(
          "mt-3 max-w-2xl text-sm leading-relaxed",
          dark ? "text-slate-200" : "text-slate-600",
        )}
      >
        {support}
      </p>
      <div className="mt-5">
        <ButtonLink href={href} variant={dark ? "onDark" : "primary"} {...tracking}>
          {label}
        </ButtonLink>
      </div>
    </aside>
  );
}
