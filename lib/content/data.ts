import categoriesData from "@/content/data/categories.json";
import statesData from "@/content/data/states.json";
import citiesData from "@/content/data/cities.json";
import authorsData from "@/content/data/authors.json";
import reviewersData from "@/content/data/reviewers.json";
import partnersData from "@/content/data/partners.json";
import placementsData from "@/content/data/placements.json";
import disclaimersData from "@/content/data/disclaimers.json";
import {
  CategorySchema,
  StateSchema,
  CitySchema,
  AuthorSchema,
  ReviewerSchema,
  PartnerSchema,
  SponsoredPlacementSchema,
  DisclaimersSchema,
  type Category,
  type State,
  type City,
  type Author,
  type Reviewer,
  type Partner,
  type SponsoredPlacement,
  type Disclaimers,
} from "@/lib/schemas";

const categories = CategorySchema.array().parse(categoriesData);
const states = StateSchema.array().parse(statesData);
const cities = CitySchema.array().parse(citiesData);
const authors = AuthorSchema.array().parse(authorsData);
const reviewers = ReviewerSchema.array().parse(reviewersData);
const partners = PartnerSchema.array().parse(partnersData);
const placements = SponsoredPlacementSchema.array().parse(placementsData);
const disclaimers = DisclaimersSchema.parse(disclaimersData);

export function getDisclaimers(): Disclaimers {
  return disclaimers;
}

export function getCategories(activeOnly = false): Category[] {
  return activeOnly ? categories.filter((c) => c.active) : categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getStates(): State[] {
  return states;
}

export function getStateBySlug(slug: string): State | undefined {
  return states.find((s) => s.slug === slug);
}

export function getCities(stateSlug?: string): City[] {
  return stateSlug ? cities.filter((c) => c.stateSlug === stateSlug) : cities;
}

export function getCityBySlug(
  stateSlug: string,
  citySlug: string,
): City | undefined {
  return cities.find((c) => c.stateSlug === stateSlug && c.slug === citySlug);
}

export function getAuthors(): Author[] {
  return authors;
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}

export function getReviewers(): Reviewer[] {
  return reviewers;
}

export function getReviewerBySlug(slug: string): Reviewer | undefined {
  return reviewers.find((r) => r.slug === slug);
}

export function getPartners(): Partner[] {
  return partners;
}

export function getPartnersByState(stateSlug: string): Partner[] {
  return partners
    .filter((p) => p.active && p.serviceAreas.includes(stateSlug))
    .sort((a, b) => a.displayPriority - b.displayPriority);
}

export function getPlacements(): SponsoredPlacement[] {
  return placements;
}

export function isCategorySlug(slug: string): boolean {
  return categories.some((c) => c.slug === slug && c.active);
}

export function resolveSegmentSlug(
  stateSlug: string,
  segmentSlug: string,
): { type: "category"; data: Category } | { type: "city"; data: City } | null {
  const category = getCategoryBySlug(segmentSlug);
  if (category?.active) return { type: "category", data: category };

  const city = getCityBySlug(stateSlug, segmentSlug);
  if (city) return { type: "city", data: city };

  return null;
}
