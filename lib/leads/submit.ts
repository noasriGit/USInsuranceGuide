import "server-only";
import { randomUUID } from "crypto";
import { LeadSubmissionSchema, normalizeLead, type NormalizedLead } from "./schema";
import {
  clientKeyFromRequest,
  isCompletedTooQuickly,
  isHoneypotFilled,
  isRateLimited,
  payloadTooLarge,
} from "./spam";
import { deliverLead } from "./delivery";
import { logLeadDiagnostic } from "./delivery";

export type SubmitLeadResult =
  | { ok: true; id: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

export async function submitLead(
  raw: unknown,
  requestHeaders: Headers,
  byteLength?: number,
): Promise<SubmitLeadResult> {
  if (byteLength !== undefined && payloadTooLarge(byteLength)) {
    return { ok: false, error: "This request is too large to process." };
  }

  const parsed = LeadSubmissionSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "form";
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      ok: false,
      error: "Please check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  if (isHoneypotFilled(parsed.data.website)) {
    logLeadDiagnostic("lead_rejected_honeypot", { coverageType: parsed.data.coverageType });
    return { ok: true, id: randomUUID() };
  }

  if (isCompletedTooQuickly(parsed.data.startedAt)) {
    return {
      ok: false,
      error: "Please take a moment to complete the form, then submit again.",
    };
  }

  if (isRateLimited(clientKeyFromRequest(requestHeaders))) {
    return {
      ok: false,
      error: "Too many requests were submitted. Please wait and try again.",
    };
  }

  const lead: NormalizedLead = normalizeLead(parsed.data, randomUUID());
  const delivery = await deliverLead(lead);

  if (!delivery.ok) {
    return {
      ok: false,
      error:
        "We couldn't complete your request right now. Email contact@usinsuranceguide.com and we'll help from there.",
    };
  }

  return { ok: true, id: lead.id };
}
