export const LEAD_ANALYTICS_EVENTS = [
  "lead_cta_view",
  "lead_cta_click",
  "lead_form_start",
  "lead_form_step",
  "lead_form_submit",
  "lead_form_success",
  "lead_form_error",
] as const;

export type LeadAnalyticsEvent = (typeof LEAD_ANALYTICS_EVENTS)[number];

export interface LeadAnalyticsProperties {
  coverage_type?: string;
  state?: string;
  source_path?: string;
  page_type?: string;
  cta_variant?: string;
  step_number?: number;
}

export function sanitizeAnalyticsProperties(
  properties: LeadAnalyticsProperties = {},
): LeadAnalyticsProperties {
  const next: LeadAnalyticsProperties = {};
  if (properties.coverage_type) next.coverage_type = properties.coverage_type;
  if (properties.state) next.state = properties.state;
  if (properties.source_path) next.source_path = properties.source_path.split("?")[0];
  if (properties.page_type) next.page_type = properties.page_type;
  if (properties.cta_variant) next.cta_variant = properties.cta_variant;
  if (properties.step_number !== undefined) next.step_number = properties.step_number;
  return next;
}

export function trackLeadEvent(
  event: LeadAnalyticsEvent,
  properties: LeadAnalyticsProperties = {},
): void {
  if (typeof window === "undefined") return;
  const payload = sanitizeAnalyticsProperties(properties);
  const dataLayer = (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer;
  dataLayer?.push({ event, ...payload });
  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", event, payload);
  }
}
