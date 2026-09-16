export const COVERAGE_TYPES = [
  { id: "auto", label: "Auto", topic: "auto-insurance" },
  { id: "homeowners", label: "Homeowners", topic: "home-insurance" },
  { id: "renters", label: "Renters", topic: "renters-insurance" },
  { id: "business", label: "Business", topic: "business-insurance" },
  { id: "commercial-auto", label: "Commercial Auto", topic: "commercial-auto-insurance" },
  { id: "general-liability", label: "General Liability", topic: "general-liability-insurance" },
  { id: "workers-compensation", label: "Workers Compensation", topic: "workers-compensation-insurance" },
  { id: "landlord", label: "Landlord", topic: "landlord-insurance" },
  { id: "flood", label: "Flood", topic: "flood-insurance" },
  { id: "other", label: "Other", topic: undefined },
] as const;

export type CoverageTypeId = (typeof COVERAGE_TYPES)[number]["id"];

export const LEAD_STATES = [
  { id: "maryland", label: "Maryland" },
  { id: "virginia", label: "Virginia" },
  { id: "washington-dc", label: "Washington, D.C." },
] as const;

export type LeadStateId = (typeof LEAD_STATES)[number]["id"];

const coverageById = new Map(COVERAGE_TYPES.map((item) => [item.id, item]));
const stateById = new Map(LEAD_STATES.map((item) => [item.id, item]));

export function getCoverageType(id: string | undefined) {
  return id ? coverageById.get(id as CoverageTypeId) : undefined;
}

export function getLeadState(id: string | undefined) {
  return id ? stateById.get(id as LeadStateId) : undefined;
}

export function coverageLabel(id: string | undefined): string {
  return getCoverageType(id)?.label ?? "insurance";
}

export function stateLabel(id: string | undefined): string {
  return getLeadState(id)?.label ?? "Maryland, Virginia or D.C.";
}
