import type { LeadCtaVariant, LeadPageContext } from "./context";
import { coverageLabel, stateLabel } from "./coverage";

export function leadHeadline(context: LeadPageContext, variant: LeadCtaVariant): string {
  const coverage = coverageLabel(context.coverageType);
  const state = stateLabel(context.state);

  if (variant === "hero") return "Get Matched With Insurance Help";
  if (variant === "final") {
    return "Need help finding coverage in Maryland, Virginia or D.C.?";
  }
  if (variant === "subtle") {
    return "Need help understanding what coverage to shop for?";
  }
  if (variant === "cost") {
    return "Ready to compare your coverage options?";
  }
  if (variant === "business" || context.intent === "business") {
    return context.state
      ? `Tell us about your ${state} business`
      : "Tell us about your business";
  }
  if (context.coverageType && context.state) {
    return `Looking for ${coverage.toLowerCase()} coverage in ${state}?`;
  }
  if (context.state) {
    return `Looking for insurance help in ${state}?`;
  }
  if (context.coverageType) {
    return `Looking for ${coverage.toLowerCase()} coverage in the DMV?`;
  }
  return "Need help finding coverage in Maryland, Virginia or D.C.?";
}

export function leadButtonLabel(context: LeadPageContext, variant: LeadCtaVariant): string {
  if (variant === "subtle") return "Get matched with insurance help";
  if (variant === "business" || context.intent === "business") {
    return "Tell us about your business";
  }
  if (context.state) {
    return `Get matched with ${stateLabel(context.state)} insurance help`;
  }
  if (variant === "hero") return "Get Matched With Insurance Help";
  if (variant === "final" || variant === "end") return "Get Matched With Insurance Help";
  return "Get Matched With Insurance Help";
}

export function leadSupportingCopy(variant: LeadCtaVariant): string {
  if (variant === "subtle") {
    return "If you want help reviewing options, we can route your request to a licensed insurance professional when available.";
  }
  return "We'll use your answers to route your request to the appropriate licensed insurance professional when available.";
}
