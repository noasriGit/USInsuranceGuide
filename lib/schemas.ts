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

export const CategoryHubGroupSchema = z.enum([
  "primary",
  "specialty",
  "nested",
  "deprioritized",
]);

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
  /** Public path when this hub is nested under another topic. */
  canonicalPath: z.string().optional(),
  hubGroup: CategoryHubGroupSchema.default("primary"),
  /** Interim explainer links until Batch F full hub copy ships. */
  featuredArticleSlugs: z.array(z.string()).optional(),
  /** Short note for shell hubs without a featured explainer (e.g. landlord). */
  interimNote: z.string().optional(),
});

export const StateSchema = z.object({
  slug: z.string(),
  name: z.string(),
  abbreviation: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  overview: z.string(),
  requiredInsuranceSummary: z.string(),
  majorRisks: z.array(z.string()),
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

export const PageStatusSchema = z.enum([
  "planned",
  "draft",
  "review",
  "published",
]);

export const SeoPageKindSchema = z.enum([
  "home",
  "static",
  "topic-hub",
  "topic-guide",
  "state-index",
  "state-hub",
  "state-guide",
  "state-child",
  "article-index",
  "article",
]);

export const SeoPageClusterSchema = z.enum([
  "primary",
  "specialty",
  "supporting",
  "deprioritized",
]);

export const SeoContentSourceSchema = z.object({
  type: z.enum(["state-guide", "article", "static", "hub"]),
  slug: z.string().optional(),
  categorySlug: z.string().optional(),
});

export const SeoPageSchema = z.object({
  path: z.string(),
  title: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  status: PageStatusSchema,
  indexable: z.boolean(),
  lastModified: z.string(),
  lastReviewed: z.string().optional(),
  effectiveDate: z.string().optional(),
  reviewer: z.string().optional(),
  kind: SeoPageKindSchema,
  phase: z.number().int().min(0).max(4),
  cluster: SeoPageClusterSchema.optional(),
  stateSlug: z.string().optional(),
  categorySlug: z.string().optional(),
  guideSlug: z.string().optional(),
  childSlug: z.string().optional(),
  parentPath: z.string().optional(),
  relatedPaths: z.array(z.string()).default([]),
  primaryKeyword: z.string().optional(),
  contentSource: SeoContentSourceSchema.optional(),
  redirectsFrom: z.array(z.string()).optional(),
  changeFrequency: z
    .enum(["weekly", "monthly", "yearly"])
    .optional(),
  priority: z.number().optional(),
  navLabel: z.string().optional(),
});

export type Category = z.infer<typeof CategorySchema>;
export type CategoryHubGroup = z.infer<typeof CategoryHubGroupSchema>;
export type State = z.infer<typeof StateSchema>;
export type PageStatus = z.infer<typeof PageStatusSchema>;
export type SeoPage = z.infer<typeof SeoPageSchema>;
export type SeoPageKind = z.infer<typeof SeoPageKindSchema>;
export type SeoPageCluster = z.infer<typeof SeoPageClusterSchema>;
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

export const LeadStateSlugSchema = z.enum([
  "maryland",
  "virginia",
  "washington-dc",
]);

export const PublicCaseStudyFactSchema = z.object({
  label: z.string(),
  value: z.string(),
});

export const PublicCaseStudyQuoteSchema = z.object({
  text: z.string().max(280),
  attribution: z.string(),
});

export const PublicCaseStudySchema = z.object({
  slug: z.string(),
  title: z.string(),
  jurisdiction: LeadStateSlugSchema,
  topics: z.array(z.string()),
  sourcePublisher: z.string(),
  sourceUrl: z.string().url(),
  sourcePublishedAt: z.string().optional(),
  lastVerifiedAt: z.string(),
  summary: z.string(),
  body: z.string(),
  facts: z.array(PublicCaseStudyFactSchema),
  quote: PublicCaseStudyQuoteSchema.optional(),
  takeaways: z.array(z.string()),
  disclaimer: z.string(),
  relatedPaths: z.array(z.string()).default([]),
});

export type LeadStateSlug = z.infer<typeof LeadStateSlugSchema>;
export type PublicCaseStudy = z.infer<typeof PublicCaseStudySchema>;

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
