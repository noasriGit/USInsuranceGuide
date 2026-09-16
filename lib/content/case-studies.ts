import { PublicCaseStudySchema, type PublicCaseStudy } from "@/lib/schemas";
import { PUBLIC_CASE_STUDIES } from "@/content/data/public-case-studies";
import type { LeadStateId } from "@/lib/leads/coverage";

const caseStudies = PublicCaseStudySchema.array().parse(PUBLIC_CASE_STUDIES);

export function getPublicCaseStudies(filters?: {
  jurisdiction?: LeadStateId | string;
  topic?: string;
}): PublicCaseStudy[] {
  return caseStudies.filter((item) => {
    if (filters?.jurisdiction && item.jurisdiction !== filters.jurisdiction) {
      return false;
    }
    if (filters?.topic && !item.topics.includes(filters.topic)) {
      return false;
    }
    return true;
  });
}

export function getPublicCaseStudyBySlug(slug: string): PublicCaseStudy | undefined {
  return caseStudies.find((item) => item.slug === slug);
}

export function getPublicCaseStudiesForPage(options: {
  stateSlug?: string;
  categorySlug?: string;
  limit?: number;
}): PublicCaseStudy[] {
  const matches = caseStudies.filter((item) => {
    const stateMatch = options.stateSlug ? item.jurisdiction === options.stateSlug : true;
    const topicMatch = options.categorySlug
      ? item.topics.includes(options.categorySlug)
      : true;
    return stateMatch && topicMatch;
  });

  if (matches.length > 0) {
    return matches.slice(0, options.limit ?? 2);
  }

  if (options.stateSlug) {
    return caseStudies
      .filter((item) => item.jurisdiction === options.stateSlug)
      .slice(0, options.limit ?? 1);
  }

  return caseStudies.slice(0, options.limit ?? 2);
}
