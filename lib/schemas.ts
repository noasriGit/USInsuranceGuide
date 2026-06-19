import { z } from "zod";

export const SourceSchema = z.object({
  title: z.string(),
  url: z.string().url(),
  publisher: z.string(),
  accessedAt: z.string().optional(),
});

export const FAQItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const CategorySchema = z.object({
  slug: z.string(),
  name: z.string(),
  shortDescription: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  relatedCategories: z.array(z.string()),
  launchPriority: z.number(),
  active: z.boolean().default(true),
  contentReady: z.boolean().default(false),
});

export const StateSchema = z.object({
  slug: z.string(),
  name: z.string(),
  abbreviation: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  featuredCategories: z.array(z.string()),
  overview: z.string(),
  externalSources: z.array(SourceSchema).optional(),
});

export const CitySchema = z.object({
  slug: z.string(),
  name: z.string(),
  stateSlug: z.string(),
  county: z.string().optional(),
  type: z.enum(["city", "county", "district"]),
  metaTitle: z.string(),
  metaDescription: z.string(),
  coverageConsiderations: z.array(z.string()),
  relatedCategories: z.array(z.string()),
  contentReady: z.boolean().default(false),
});

export const AuthorSchema = z.object({
  slug: z.string(),
  name: z.string(),
  title: z.string(),
  bio: z.string(),
  credentials: z.string().optional(),
});

export const ReviewerSchema = AuthorSchema.extend({
  reviewFocus: z.string().optional(),
});

export const PartnerSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  websiteUrl: z.string().url(),
  phone: z.string().optional(),
  email: z.string().optional(),
  logo: z.string().optional(),
  description: z.string(),
  serviceAreas: z.array(z.string()),
  cities: z.array(z.string()).optional(),
  insuranceTypes: z.array(z.string()),
  licenseNotes: z.string().optional(),
  sponsored: z.boolean(),
  featured: z.boolean(),
  ctaText: z.string(),
  trackingUrl: z.string().url().optional(),
  displayPriority: z.number(),
  active: z.boolean(),
});

export const PlacementSlotSchema = z.enum([
  "homepage-featured",
  "category-sidebar",
  "category-mid",
  "state-hub-card",
  "article-mid-cta",
  "article-footer-cta",
  "directory-featured",
  "display-ad",
]);

export const SponsoredPlacementSchema = z.object({
  id: z.string(),
  slot: PlacementSlotSchema,
  partnerId: z.string(),
  states: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  priority: z.number(),
  active: z.boolean(),
});

export const DisclaimersSchema = z.object({
  siteFooterDisclaimer: z.string(),
  articleDisclaimer: z.string(),
  sponsoredDisclosure: z.string(),
  editorialIndependenceStatement: z.string(),
  licensedProfessionalCta: z.string(),
  directoryDisclaimer: z.string(),
});

export const ArticleFrontmatterSchema = z.object({
  title: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  excerpt: z.string(),
  type: z.enum(["article", "guide", "explainer"]),
  category: z.string(),
  categories: z.array(z.string()).optional(),
  states: z.array(z.string()).optional(),
  author: z.string(),
  reviewer: z.string().optional(),
  publishedAt: z.string(),
  updatedAt: z.string(),
  toc: z.boolean().default(true),
  faq: z.array(FAQItemSchema).optional(),
  sources: z.array(SourceSchema).optional(),
  sponsored: z.boolean().optional(),
  relatedArticles: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
});

export type Category = z.infer<typeof CategorySchema>;
export type State = z.infer<typeof StateSchema>;
export type City = z.infer<typeof CitySchema>;
export type Author = z.infer<typeof AuthorSchema>;
export type Reviewer = z.infer<typeof ReviewerSchema>;
export type Partner = z.infer<typeof PartnerSchema>;
export type SponsoredPlacement = z.infer<typeof SponsoredPlacementSchema>;
export type Disclaimers = z.infer<typeof DisclaimersSchema>;
export type ArticleFrontmatter = z.infer<typeof ArticleFrontmatterSchema>;
export type FAQItem = z.infer<typeof FAQItemSchema>;
export type Source = z.infer<typeof SourceSchema>;
export type PlacementSlot = z.infer<typeof PlacementSlotSchema>;

const stateCategorySectionTitles = [
  "Overview",
  "Coverage Options to Consider",
  "State Requirements & Regulations",
  "Factors That May Affect Your Premium",
] as const;

export const StateCategoryGuideFrontmatterSchema = z.object({
  stateSlug: z.string(),
  categorySlug: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  updatedAt: z.string(),
  reviewer: z.string().optional(),
  sections: z
    .object({
      Overview: z.string(),
      "Coverage Options to Consider": z.string(),
      "State Requirements & Regulations": z.string(),
      "Factors That May Affect Your Premium": z.string(),
    })
    .strict(),
  faq: z.array(FAQItemSchema).min(1),
  sources: z.array(SourceSchema).min(1),
  draft: z.boolean().optional(),
});

export type StateCategoryGuideFrontmatter = z.infer<
  typeof StateCategoryGuideFrontmatterSchema
>;

export interface StateCategoryGuide extends StateCategoryGuideFrontmatter {
  slug: string;
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
  readingTime: number;
}
