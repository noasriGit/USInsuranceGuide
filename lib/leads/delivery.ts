import "server-only";
import type { NormalizedLead } from "./schema";

export function logLeadDiagnostic(
  message: string,
  meta: Record<string, string | number | boolean | undefined> = {},
): void {
  const safe: Record<string, string | number | boolean> = { msg: message };
  for (const [key, value] of Object.entries(meta)) {
    if (value === undefined) continue;
    const lowered = key.toLowerCase();
    if (
      lowered.includes("email") ||
      lowered.includes("phone") ||
      lowered.includes("name") ||
      lowered.includes("zip") ||
      lowered.includes("answer")
    ) {
      continue;
    }
    safe[key] = value;
  }
  console.info(JSON.stringify(safe));
}

export interface LeadDeliveryResult {
  ok: boolean;
  reason?: "unconfigured" | "http_error" | "network_error";
  status?: number;
}

export async function deliverLead(lead: NormalizedLead): Promise<LeadDeliveryResult> {
  const webhookUrl = process.env.LEAD_DELIVERY_WEBHOOK_URL;
  const secret = process.env.LEAD_DELIVERY_SECRET;

  if (!webhookUrl) {
    if (process.env.NODE_ENV !== "production" || process.env.LEAD_ALLOW_UNCONFIGURED === "true") {
      logLeadDiagnostic("lead_accepted_no_delivery_configured", {
        leadId: lead.id,
        coverageType: lead.coverageType,
        state: lead.state,
      });
      return { ok: true, reason: "unconfigured" };
    }

    logLeadDiagnostic("lead_delivery_unconfigured", {
      leadId: lead.id,
      coverageType: lead.coverageType,
      state: lead.state,
    });
    return { ok: false, reason: "unconfigured" };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
      },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      logLeadDiagnostic("lead_delivery_http_error", {
        leadId: lead.id,
        coverageType: lead.coverageType,
        state: lead.state,
        status: response.status,
      });
      return { ok: false, reason: "http_error", status: response.status };
    }

    logLeadDiagnostic("lead_delivery_ok", {
      leadId: lead.id,
      coverageType: lead.coverageType,
      state: lead.state,
    });
    return { ok: true };
  } catch {
    logLeadDiagnostic("lead_delivery_network_error", {
      leadId: lead.id,
      coverageType: lead.coverageType,
      state: lead.state,
    });
    return { ok: false, reason: "network_error" };
  }
}
