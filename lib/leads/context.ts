import { LEAD_PATH } from "@/lib/constants";
import {
  COVERAGE_TYPES,
  type CoverageTypeId,
  type LeadStateId,
} from "./coverage";

export type LeadCtaVariant =
  | "hero"
  | "final"
  | "inline"
  | "compact"
  | "end"
  | "subtle"
  | "sticky"
  | "state"
  | "cost"
  | "business";

export type LeadIntent = "default" | "subtle" | "cost" | "business" | "regulatory";

export interface LeadPageContext {
  coverageType?: CoverageTypeId;
  state?: LeadStateId;
  sourcePath: string;
  sourcePageType?: string;
  sourceTopic?: string;
  sourceState?: LeadStateId;
  intent: LeadIntent;
}

const topicBySegment: Record<string, CoverageTypeId> = {
  "auto-insurance": "auto",
  "home-insurance": "homeowners",
  "homeowners-insurance": "homeowners",
  "renters-insurance": "renters",
  "business-insurance": "business",
  "commercial-auto-insurance": "commercial-auto",
  "commercial-auto": "commercial-auto",
  "general-liability-insurance": "general-liability",
  "general-liability": "general-liability",
  "workers-compensation-insurance": "workers-compensation",
  "workers-compensation": "workers-compensation",
  "landlord-insurance": "landlord",
  "flood-insurance": "flood",
};

const stateBySegment: Record<string, LeadStateId> = {
  maryland: "maryland",
  virginia: "virginia",
  "washington-dc": "washington-dc",
};

function firstQueryValue(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

export function normalizeSourcePath(path: string | undefined): string {
  if (!path) return "/";
  const trimmed = path.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//") || trimmed.includes("://")) {
    return "/";
  }
  const [pathname] = trimmed.split(/[?#]/);
  if (!pathname) return "/";
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

export function coverageFromSlug(slug?: string): CoverageTypeId | undefined {
  if (!slug) return undefined;
  return topicBySegment[slug];
}

export function inferLeadContextFromPath(
  path: string,
  pageType?: string,
): LeadPageContext {
  const sourcePath = normalizeSourcePath(path);
  const segments = sourcePath.split("/").filter(Boolean);
  const state = segments
    .map((segment) => stateBySegment[segment])
    .find(Boolean);
  const coverageType = segments
    .map((segment) => topicBySegment[segment])
    .find(Boolean);
  const childSlug = segments.at(-1);
  const intent = resolveIntent(pageType, childSlug, coverageType);

  return {
    coverageType,
    state,
    sourcePath,
    sourcePageType: pageType,
    sourceTopic: coverageType
      ? COVERAGE_TYPES.find((item) => item.id === coverageType)?.topic
      : undefined,
    sourceState: state,
    intent,
  };
}

function resolveIntent(
  pageType: string | undefined,
  childSlug: string | undefined,
  coverageType: CoverageTypeId | undefined,
): LeadIntent {
  if (childSlug === "requirements" || childSlug === "laws") return "regulatory";
  if (childSlug === "cost") return "cost";
  if (
    coverageType === "business" ||
    coverageType === "commercial-auto" ||
    coverageType === "general-liability" ||
    coverageType === "workers-compensation"
  ) {
    return "business";
  }
  if (pageType === "static") return "subtle";
  return "default";
}

export function buildLeadHref(
  context: Partial<LeadPageContext> & { sourcePath?: string },
): string {
  const params = new URLSearchParams();
  if (context.coverageType) params.set("coverage", context.coverageType);
  if (context.state) params.set("state", context.state);
  const sourcePath = normalizeSourcePath(context.sourcePath);
  if (sourcePath && sourcePath !== "/") params.set("from", sourcePath);
  const query = params.toString();
  return query ? `${LEAD_PATH}?${query}` : LEAD_PATH;
}

export function parseLeadSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): LeadPageContext {
  const from = normalizeSourcePath(firstQueryValue(searchParams.from));
  const inferred = inferLeadContextFromPath(from);
  const coverage = firstQueryValue(searchParams.coverage);
  const state = firstQueryValue(searchParams.state);

  return {
    ...inferred,
    coverageType:
      coverage && COVERAGE_TYPES.some((item) => item.id === coverage)
        ? (coverage as CoverageTypeId)
        : inferred.coverageType,
    state:
      state && ["maryland", "virginia", "washington-dc"].includes(state)
        ? (state as LeadStateId)
        : inferred.state,
    sourcePath: from,
    sourceState:
      state && ["maryland", "virginia", "washington-dc"].includes(state)
        ? (state as LeadStateId)
        : inferred.sourceState,
  };
}

export function shouldShowStickyLeadCta(context: LeadPageContext): boolean {
  if (context.sourcePath === LEAD_PATH) return false;
  if (context.intent === "regulatory" || context.intent === "subtle") return false;
  return (
    context.intent === "cost" ||
    context.intent === "business" ||
    context.sourcePageType === "article" ||
    context.sourcePageType === "state-guide" ||
    context.sourcePageType === "state-child"
  );
}
