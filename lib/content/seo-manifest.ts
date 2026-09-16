import type { SeoPage, SeoPageCluster } from "../schemas";

const CONTENT_DATE = "2025-06-19";
const STATIC_DATE = "2026-06-19";

type StateSlug = "maryland" | "virginia" | "washington-dc";

const STATES: Record<
  StateSlug,
  { name: string; short: string; path: string }
> = {
  maryland: {
    name: "Maryland",
    short: "Maryland",
    path: "/states/maryland/",
  },
  virginia: {
    name: "Virginia",
    short: "Virginia",
    path: "/states/virginia/",
  },
  "washington-dc": {
    name: "Washington, D.C.",
    short: "D.C.",
    path: "/states/washington-dc/",
  },
};

type SeoPageInput = Omit<SeoPage, "relatedPaths" | "indexable"> & {
  relatedPaths?: string[];
  indexable?: boolean;
};

function page(entry: SeoPageInput): SeoPage {
  return {
    ...entry,
    relatedPaths: entry.relatedPaths ?? [],
    indexable: entry.indexable ?? entry.status === "published",
  };
}

function planned(
  partial: Omit<SeoPageInput, "status" | "indexable" | "lastModified"> & {
    lastModified?: string;
  },
): SeoPage {
  return page({
    ...partial,
    status: "planned",
    indexable: false,
    lastModified: partial.lastModified ?? CONTENT_DATE,
  });
}

const staticPages: SeoPage[] = [
  page({
    path: "/",
    title: "Insurance Guides for Maryland, Virginia & Washington, D.C.",
    metaTitle: "US Insurance Guide",
    metaDescription:
      "Educational insurance guides for Maryland, Virginia, and Washington, D.C. covering auto, homeowners, renters, and business insurance.",
    status: "published",
    indexable: true,
    lastModified: CONTENT_DATE,
    kind: "home",
    phase: 0,
    changeFrequency: "weekly",
    priority: 1,
  }),
  page({
    path: "/blog/",
    title: "Insurance Guides & Articles",
    metaTitle: "Insurance Guides & Articles",
    metaDescription:
      "Educational insurance guides on auto, home, renters, and business coverage for Maryland, Virginia, and Washington, D.C.",
    status: "published",
    indexable: true,
    lastModified: CONTENT_DATE,
    kind: "article-index",
    phase: 0,
    changeFrequency: "weekly",
    priority: 0.7,
  }),
  page({
    path: "/states/",
    title: "Maryland, Virginia & Washington, D.C. Insurance Guides",
    metaTitle: "DMV Insurance Guides",
    metaDescription:
      "Insurance guides for Maryland, Virginia, and Washington, D.C. covering requirements, costs, and coverage rules.",
    status: "published",
    indexable: true,
    lastModified: CONTENT_DATE,
    kind: "state-index",
    phase: 0,
    changeFrequency: "monthly",
    priority: 0.9,
  }),
  page({
    path: "/get-insurance-help/",
    title: "Find Insurance Help",
    metaTitle: "Find Insurance Help",
    metaDescription:
      "Request insurance help in Maryland, Virginia, or Washington, D.C. US Insurance Guide can route your request to a licensed insurance professional when available.",
    status: "published",
    indexable: true,
    lastModified: STATIC_DATE,
    kind: "static",
    phase: 0,
    changeFrequency: "monthly",
    priority: 0.6,
    contentSource: { type: "static" },
  }),
  page({
    path: "/public-case-studies/",
    title: "Public Insurance Case Files",
    metaTitle: "Public Insurance Case Files",
    metaDescription:
      "Public-source insurance examples from Maryland, Virginia, and Washington, D.C. regulators and government records. These are not customer testimonials.",
    status: "published",
    indexable: true,
    lastModified: STATIC_DATE,
    kind: "static",
    phase: 0,
    changeFrequency: "monthly",
    priority: 0.6,
    contentSource: { type: "static" },
    redirectsFrom: ["/case-studies/"],
  }),
];

const legalPages: Array<{ path: string; title: string; metaDescription: string }> = [
  {
    path: "/about/",
    title: "About US Insurance Guide",
    metaDescription:
      "Learn about US Insurance Guide — an educational insurance resource for consumers and businesses in Maryland, Virginia, and Washington, D.C.",
  },
  {
    path: "/editorial-policy/",
    title: "Editorial Policy",
    metaDescription:
      "How US Insurance Guide creates, reviews, and updates educational insurance content.",
  },
  {
    path: "/accessibility/",
    title: "Accessibility Statement",
    metaDescription:
      "US Insurance Guide commitment to digital accessibility and how to request an accommodation.",
  },
  {
    path: "/advertising-disclosure/",
    title: "Advertising Disclosure",
    metaDescription:
      "How US Insurance Guide handles advertising and sponsored partner placements.",
  },
  {
    path: "/insurance-disclaimer/",
    title: "Insurance Disclaimer",
    metaDescription:
      "Educational disclaimer: US Insurance Guide does not sell insurance or provide personalized coverage advice.",
  },
  {
    path: "/privacy-policy/",
    title: "Privacy Policy",
    metaDescription:
      "How US Insurance Guide collects, uses, and protects your information.",
  },
  {
    path: "/terms/",
    title: "Terms of Use",
    metaDescription: "Terms governing your use of the US Insurance Guide website.",
  },
  {
    path: "/contact/",
    title: "Contact Us",
    metaDescription:
      "Contact the US Insurance Guide editorial team for questions, feedback, or partnership inquiries.",
  },
  {
    path: "/corrections/",
    title: "Corrections & Updates",
    metaDescription:
      "Request a correction or update to US Insurance Guide content.",
  },
];

function topicHub(opts: {
  path: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  cluster: SeoPageCluster;
  phase?: number;
  redirectsFrom?: string[];
  priority?: number;
  parentPath?: string;
}): SeoPage {
  return page({
    path: opts.path,
    title: opts.title,
    metaTitle: opts.metaTitle,
    metaDescription: opts.metaDescription,
    status: "published",
    indexable: true,
    lastModified: CONTENT_DATE,
    kind: opts.path.split("/").filter(Boolean).length > 1 ? "topic-guide" : "topic-hub",
    phase: opts.phase ?? 0,
    cluster: opts.cluster,
    categorySlug: opts.slug,
    parentPath: opts.parentPath,
    redirectsFrom: opts.redirectsFrom,
    changeFrequency: "monthly",
    priority: opts.priority ?? (opts.cluster === "primary" ? 0.9 : 0.7),
    contentSource: { type: "hub", categorySlug: opts.slug },
    navLabel: opts.title.replace(/ Guides?$/, ""),
  });
}

const topicHubs: SeoPage[] = [
  topicHub({
    path: "/auto-insurance/",
    slug: "auto-insurance",
    title: "Auto Insurance Guides",
    metaTitle: "Auto Insurance Guides",
    metaDescription:
      "Learn about auto insurance coverage, state requirements, and premium factors for Maryland, Virginia, and Washington, D.C.",
    cluster: "primary",
  }),
  topicHub({
    path: "/home-insurance/",
    slug: "home-insurance",
    title: "Home Insurance Guides",
    metaTitle: "Home Insurance Guides",
    metaDescription:
      "Educational guides on homeowners insurance coverage, policy types, and regional property risks in Maryland, Virginia, and D.C.",
    cluster: "primary",
  }),
  topicHub({
    path: "/renters-insurance/",
    slug: "renters-insurance",
    title: "Renters Insurance Guides",
    metaTitle: "Renters Insurance Guides",
    metaDescription:
      "Learn about renters insurance coverage, landlord requirements, and typical policy choices in Maryland, Virginia, and Washington, D.C.",
    cluster: "primary",
  }),
  topicHub({
    path: "/business-insurance/",
    slug: "business-insurance",
    title: "Business Insurance Guides",
    metaTitle: "Business Insurance Guides",
    metaDescription:
      "Educational guides on business insurance, including general liability, workers' compensation, and commercial auto in the DMV.",
    cluster: "primary",
  }),
  topicHub({
    path: "/landlord-insurance/",
    slug: "landlord-insurance",
    title: "Landlord Insurance Guides",
    metaTitle: "Landlord Insurance Guides",
    metaDescription:
      "Educational guides on landlord insurance for rental property owners in Maryland, Virginia, and Washington, D.C.",
    cluster: "specialty",
    phase: 3,
  }),
  topicHub({
    path: "/flood-insurance/",
    slug: "flood-insurance",
    title: "Flood Insurance Guides",
    metaTitle: "Flood Insurance Guides",
    metaDescription:
      "Educational guides on flood insurance separate from standard homeowners policies, including NFIP basics for DMV properties.",
    cluster: "specialty",
    phase: 3,
  }),
  topicHub({
    path: "/umbrella-insurance/",
    slug: "umbrella-insurance",
    title: "Umbrella Insurance Guides",
    metaTitle: "Umbrella Insurance Guides",
    metaDescription:
      "Learn about umbrella insurance as extra liability coverage above auto and home policies.",
    cluster: "specialty",
  }),
  topicHub({
    path: "/life-insurance/",
    slug: "life-insurance",
    title: "Life Insurance Guides",
    metaTitle: "Life Insurance Guides",
    metaDescription:
      "Educational information on life insurance types and coverage considerations. Not a current publishing priority.",
    cluster: "deprioritized",
    priority: 0.4,
  }),
  topicHub({
    path: "/business-insurance/general-liability/",
    slug: "general-liability-insurance",
    title: "General Liability Insurance",
    metaTitle: "General Liability Insurance",
    metaDescription:
      "Learn about general liability insurance for businesses, including third-party injury and property damage coverage.",
    cluster: "supporting",
    phase: 2,
    redirectsFrom: ["/general-liability-insurance/"],
    priority: 0.75,
    parentPath: "/business-insurance/",
  }),
  topicHub({
    path: "/business-insurance/workers-compensation/",
    slug: "workers-compensation-insurance",
    title: "Workers' Compensation Insurance",
    metaTitle: "Workers' Compensation Insurance",
    metaDescription:
      "Educational guides on workers' compensation insurance requirements for employers in Maryland, Virginia, and Washington, D.C.",
    cluster: "supporting",
    phase: 2,
    redirectsFrom: ["/workers-compensation-insurance/"],
    priority: 0.75,
    parentPath: "/business-insurance/",
  }),
  topicHub({
    path: "/business-insurance/commercial-auto/",
    slug: "commercial-auto-insurance",
    title: "Commercial Auto Insurance",
    metaTitle: "Commercial Auto Insurance",
    metaDescription:
      "Educational guides on commercial auto insurance for business vehicles and fleets in the DMV region.",
    cluster: "supporting",
    phase: 2,
    redirectsFrom: ["/commercial-auto-insurance/"],
    priority: 0.75,
    parentPath: "/business-insurance/",
  }),
];

const plannedTopicGuides: SeoPage[] = [
  planned({
    path: "/auto-insurance/liability-coverage/",
    title: "Auto Liability Coverage",
    metaTitle: "Auto Liability Coverage",
    metaDescription:
      "What auto liability coverage is and how Maryland, Virginia, and D.C. minimums differ.",
    kind: "topic-guide",
    phase: 1,
    cluster: "supporting",
    categorySlug: "auto-insurance",
    parentPath: "/auto-insurance/",
  }),
  planned({
    path: "/auto-insurance/collision-coverage/",
    title: "Collision Coverage",
    metaTitle: "Collision Coverage",
    metaDescription: "How collision coverage works on auto insurance policies.",
    kind: "topic-guide",
    phase: 1,
    cluster: "supporting",
    categorySlug: "auto-insurance",
    parentPath: "/auto-insurance/",
  }),
  planned({
    path: "/auto-insurance/comprehensive-coverage/",
    title: "Comprehensive Coverage",
    metaTitle: "Comprehensive Coverage",
    metaDescription: "How comprehensive auto coverage works for non-collision losses.",
    kind: "topic-guide",
    phase: 1,
    cluster: "supporting",
    categorySlug: "auto-insurance",
    parentPath: "/auto-insurance/",
  }),
  planned({
    path: "/auto-insurance/deductibles/",
    title: "Auto Insurance Deductibles",
    metaTitle: "Auto Insurance Deductibles",
    metaDescription: "How auto insurance deductibles affect premiums and claims.",
    kind: "topic-guide",
    phase: 1,
    cluster: "supporting",
    categorySlug: "auto-insurance",
    parentPath: "/auto-insurance/",
  }),
  planned({
    path: "/auto-insurance/uninsured-underinsured-motorist/",
    title: "Uninsured and Underinsured Motorist Coverage",
    metaTitle: "UM/UIM Coverage",
    metaDescription:
      "Uninsured and underinsured motorist coverage rules in Maryland, Virginia, and Washington, D.C.",
    kind: "topic-guide",
    phase: 1,
    cluster: "supporting",
    categorySlug: "auto-insurance",
    parentPath: "/auto-insurance/",
  }),
  planned({
    path: "/home-insurance/coverage/",
    title: "Homeowners Insurance Coverage",
    metaTitle: "Homeowners Insurance Coverage",
    metaDescription: "What homeowners insurance typically covers and excludes.",
    kind: "topic-guide",
    phase: 1,
    cluster: "supporting",
    categorySlug: "home-insurance",
    parentPath: "/home-insurance/",
  }),
  planned({
    path: "/home-insurance/dwelling-coverage/",
    title: "Dwelling Coverage",
    metaTitle: "Dwelling Coverage",
    metaDescription: "How dwelling coverage pays to rebuild a home after a covered loss.",
    kind: "topic-guide",
    phase: 1,
    cluster: "supporting",
    categorySlug: "home-insurance",
    parentPath: "/home-insurance/",
  }),
  planned({
    path: "/home-insurance/deductible/",
    title: "Home Insurance Deductibles",
    metaTitle: "Home Insurance Deductibles",
    metaDescription: "How homeowners insurance deductibles work, including wind deductibles.",
    kind: "topic-guide",
    phase: 1,
    cluster: "supporting",
    categorySlug: "home-insurance",
    parentPath: "/home-insurance/",
  }),
  planned({
    path: "/home-insurance/replacement-cost-vs-actual-cash-value/",
    title: "Replacement Cost vs Actual Cash Value",
    metaTitle: "Replacement Cost vs Actual Cash Value",
    metaDescription:
      "The difference between replacement cost and actual cash value on property policies.",
    kind: "topic-guide",
    phase: 1,
    cluster: "supporting",
    categorySlug: "home-insurance",
    parentPath: "/home-insurance/",
  }),
  planned({
    path: "/home-insurance/flood-coverage/",
    title: "Flood Coverage and Home Insurance",
    metaTitle: "Flood Coverage and Home Insurance",
    metaDescription:
      "Why standard homeowners policies exclude flood and how Maryland, Virginia, and D.C. residents buy flood coverage.",
    kind: "topic-guide",
    phase: 3,
    cluster: "supporting",
    categorySlug: "home-insurance",
    parentPath: "/home-insurance/",
  }),
  planned({
    path: "/renters-insurance/coverage/",
    title: "Renters Insurance Coverage",
    metaTitle: "Renters Insurance Coverage",
    metaDescription: "What renters insurance typically covers for belongings and liability.",
    kind: "topic-guide",
    phase: 1,
    cluster: "supporting",
    categorySlug: "renters-insurance",
    parentPath: "/renters-insurance/",
  }),
  planned({
    path: "/renters-insurance/liability-coverage/",
    title: "Renters Liability Coverage",
    metaTitle: "Renters Liability Coverage",
    metaDescription: "How liability coverage on a renters policy works.",
    kind: "topic-guide",
    phase: 1,
    cluster: "supporting",
    categorySlug: "renters-insurance",
    parentPath: "/renters-insurance/",
  }),
  planned({
    path: "/renters-insurance/replacement-cost-vs-actual-cash-value/",
    title: "Renters Replacement Cost vs Actual Cash Value",
    metaTitle: "Renters Replacement Cost vs ACV",
    metaDescription:
      "Replacement cost versus actual cash value for renters personal property coverage.",
    kind: "topic-guide",
    phase: 1,
    cluster: "supporting",
    categorySlug: "renters-insurance",
    parentPath: "/renters-insurance/",
  }),
  planned({
    path: "/business-insurance/business-owners-policy/",
    title: "Business Owners Policy",
    metaTitle: "Business Owners Policy (BOP)",
    metaDescription:
      "What a business owners policy typically packages for small businesses.",
    kind: "topic-guide",
    phase: 2,
    cluster: "supporting",
    categorySlug: "business-insurance",
    parentPath: "/business-insurance/",
  }),
];

const stateHubCopy: Record<
  StateSlug,
  { title: string; metaTitle: string; metaDescription: string }
> = {
  maryland: {
    title: "Maryland Insurance Guides",
    metaTitle: "Maryland Insurance Guides",
    metaDescription:
      "Maryland insurance guides covering auto requirements, homeowners, renters, and business coverage, plus official state resources.",
  },
  virginia: {
    title: "Virginia Insurance Guides",
    metaTitle: "Virginia Insurance Guides",
    metaDescription:
      "Virginia insurance guides covering auto requirements, homeowners, renters, and business coverage, plus official Commonwealth resources.",
  },
  "washington-dc": {
    title: "Washington, D.C. Insurance Guides",
    metaTitle: "Washington, D.C. Insurance Guides",
    metaDescription:
      "Washington, D.C. insurance guides covering auto requirements, homeowners, renters, and business coverage, plus DISB and DMV resources.",
  },
};

function stateHub(slug: StateSlug): SeoPage {
  const copy = stateHubCopy[slug];
  return page({
    path: STATES[slug].path,
    title: copy.title,
    metaTitle: copy.metaTitle,
    metaDescription: copy.metaDescription,
    status: "published",
    indexable: true,
    lastModified: CONTENT_DATE,
    kind: "state-hub",
    phase: 0,
    cluster: "primary",
    stateSlug: slug,
    parentPath: "/states/",
    changeFrequency: "monthly",
    priority: 0.9,
    navLabel: STATES[slug].name,
  });
}

function stateGuide(opts: {
  state: StateSlug;
  guideSlug: string;
  categorySlug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  phase: number;
  cluster: SeoPageCluster;
  contentSource: SeoPage["contentSource"];
  redirectsFrom?: string[];
  navLabel?: string;
}): SeoPage {
  const state = STATES[opts.state];
  return page({
    path: `${state.path}${opts.guideSlug}/`,
    title: opts.title,
    metaTitle: opts.metaTitle,
    metaDescription: opts.metaDescription,
    status: "published",
    indexable: true,
    lastModified: CONTENT_DATE,
    lastReviewed: CONTENT_DATE,
    reviewer: "content-review-team",
    kind: "state-guide",
    phase: opts.phase,
    cluster: opts.cluster,
    stateSlug: opts.state,
    categorySlug: opts.categorySlug,
    guideSlug: opts.guideSlug,
    parentPath: state.path,
    primaryKeyword: opts.primaryKeyword,
    contentSource: opts.contentSource,
    redirectsFrom: opts.redirectsFrom,
    changeFrequency: "monthly",
    priority: opts.cluster === "primary" ? 0.85 : 0.65,
    navLabel: opts.navLabel ?? opts.title,
  });
}

function stateChild(opts: {
  state: StateSlug;
  guideSlug: string;
  categorySlug: string;
  childSlug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  phase: number;
  cluster?: SeoPageCluster;
  contentSource: SeoPage["contentSource"];
  redirectsFrom?: string[];
  effectiveDate?: string;
}): SeoPage {
  const state = STATES[opts.state];
  const parentPath = `${state.path}${opts.guideSlug}/`;
  return page({
    path: `${parentPath}${opts.childSlug}/`,
    title: opts.title,
    metaTitle: opts.metaTitle,
    metaDescription: opts.metaDescription,
    status: "published",
    indexable: true,
    lastModified: CONTENT_DATE,
    lastReviewed: CONTENT_DATE,
    reviewer: "content-review-team",
    kind: "state-child",
    phase: opts.phase,
    cluster: opts.cluster ?? "primary",
    stateSlug: opts.state,
    categorySlug: opts.categorySlug,
    guideSlug: opts.guideSlug,
    childSlug: opts.childSlug,
    parentPath,
    primaryKeyword: opts.primaryKeyword,
    contentSource: opts.contentSource,
    redirectsFrom: opts.redirectsFrom,
    effectiveDate: opts.effectiveDate,
    changeFrequency: "monthly",
    priority: 0.8,
    navLabel:
      {
        requirements: "Requirements",
        cost: "Cost",
        laws: "Laws",
        "general-liability": "General Liability",
        "workers-compensation": "Workers' Compensation",
        "commercial-auto": "Commercial Auto",
      }[opts.childSlug] ?? opts.title,
  });
}

function plannedStateChild(opts: {
  state: StateSlug;
  guideSlug: string;
  categorySlug: string;
  childSlug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  phase: number;
}): SeoPage {
  const state = STATES[opts.state];
  const parentPath = `${state.path}${opts.guideSlug}/`;
  return planned({
    path: `${parentPath}${opts.childSlug}/`,
    title: opts.title,
    metaTitle: opts.metaTitle,
    metaDescription: opts.metaDescription,
    kind: "state-child",
    phase: opts.phase,
    cluster: "primary",
    stateSlug: opts.state,
    categorySlug: opts.categorySlug,
    guideSlug: opts.guideSlug,
    childSlug: opts.childSlug,
    parentPath,
    primaryKeyword: opts.primaryKeyword,
  });
}

const marylandPages: SeoPage[] = [
  stateHub("maryland"),
  stateGuide({
    state: "maryland",
    guideSlug: "auto-insurance",
    categorySlug: "auto-insurance",
    title: "Maryland Auto Insurance",
    metaTitle: "Maryland Car Insurance Guide",
    metaDescription:
      "Maryland requires 30/60/15 liability, matching UM/UIM, and a PIP offer. Guide to car insurance rules, coverage choices, and related DMV requirements.",
    primaryKeyword: "car insurance Maryland",
    phase: 1,
    cluster: "primary",
    contentSource: { type: "state-guide", categorySlug: "auto-insurance" },
    navLabel: "Auto Insurance",
  }),
  stateChild({
    state: "maryland",
    guideSlug: "auto-insurance",
    categorySlug: "auto-insurance",
    childSlug: "requirements",
    title: "Maryland Auto Insurance Requirements",
    metaTitle: "Maryland Auto Insurance Requirements",
    metaDescription:
      "Maryland requires 30/60/15 liability, matching uninsured motorist coverage, and a PIP offer. Limits, waivers, penalties, and official sources.",
    primaryKeyword: "Maryland auto insurance requirements",
    phase: 1,
    contentSource: { type: "article", slug: "maryland-auto-insurance-requirements" },
    redirectsFrom: ["/blog/maryland-auto-insurance-requirements/"],
  }),
  plannedStateChild({
    state: "maryland",
    guideSlug: "auto-insurance",
    categorySlug: "auto-insurance",
    childSlug: "cost",
    title: "Maryland Car Insurance Cost",
    metaTitle: "Average Car Insurance Cost Maryland",
    metaDescription:
      "Sourced averages and factors that affect Maryland car insurance rates. No invented numbers.",
    primaryKeyword: "average car insurance cost Maryland",
    phase: 1,
  }),
  stateGuide({
    state: "maryland",
    guideSlug: "homeowners-insurance",
    categorySlug: "home-insurance",
    title: "Maryland Homeowners Insurance",
    metaTitle: "Homeowners Insurance Maryland",
    metaDescription:
      "Maryland homeowners insurance is not required by state law, but lenders usually require it. Coverage, coastal and flood risks, and official resources.",
    primaryKeyword: "homeowners insurance Maryland",
    phase: 1,
    cluster: "primary",
    contentSource: { type: "article", slug: "homeowners-insurance-in-maryland" },
    redirectsFrom: [
      "/states/maryland/home-insurance/",
      "/blog/homeowners-insurance-in-maryland/",
    ],
    navLabel: "Homeowners Insurance",
  }),
  plannedStateChild({
    state: "maryland",
    guideSlug: "homeowners-insurance",
    categorySlug: "home-insurance",
    childSlug: "cost",
    title: "Maryland Homeowners Insurance Cost",
    metaTitle: "Homeowners Insurance Cost Maryland",
    metaDescription:
      "Sourced average homeowners insurance costs in Maryland and the factors that change premiums.",
    primaryKeyword: "homeowners insurance cost Maryland",
    phase: 1,
  }),
  plannedStateChild({
    state: "maryland",
    guideSlug: "homeowners-insurance",
    categorySlug: "home-insurance",
    childSlug: "laws",
    title: "Maryland Homeowners Insurance Laws",
    metaTitle: "Maryland Homeowners Insurance Laws",
    metaDescription:
      "Whether homeowners insurance is required in Maryland, lender rules, and insurance regulations.",
    primaryKeyword: "Maryland homeowners insurance laws",
    phase: 1,
  }),
  stateGuide({
    state: "maryland",
    guideSlug: "renters-insurance",
    categorySlug: "renters-insurance",
    title: "Maryland Renters Insurance",
    metaTitle: "Renters Insurance Maryland",
    metaDescription:
      "Maryland renters insurance is not required by state law, but a lease may require it. Coverage, cost factors, and landlord rules.",
    primaryKeyword: "renters insurance Maryland",
    phase: 1,
    cluster: "primary",
    contentSource: { type: "state-guide", categorySlug: "renters-insurance" },
    navLabel: "Renters Insurance",
  }),
  plannedStateChild({
    state: "maryland",
    guideSlug: "renters-insurance",
    categorySlug: "renters-insurance",
    childSlug: "requirements",
    title: "Is Renters Insurance Required in Maryland?",
    metaTitle: "Is Renters Insurance Required in Maryland?",
    metaDescription:
      "Maryland does not require renters insurance by statute. Landlords may require it in a lease.",
    primaryKeyword: "is renters insurance required in Maryland",
    phase: 1,
  }),
  stateGuide({
    state: "maryland",
    guideSlug: "business-insurance",
    categorySlug: "business-insurance",
    title: "Maryland Business Insurance",
    metaTitle: "Business Insurance Maryland",
    metaDescription:
      "Maryland business insurance guide covering workers' compensation, general liability, commercial auto, and small-business coverage rules.",
    primaryKeyword: "business insurance Maryland",
    phase: 2,
    cluster: "primary",
    contentSource: { type: "article", slug: "business-insurance-in-maryland" },
    redirectsFrom: ["/blog/business-insurance-in-maryland/"],
    navLabel: "Business Insurance",
  }),
  stateChild({
    state: "maryland",
    guideSlug: "business-insurance",
    categorySlug: "general-liability-insurance",
    childSlug: "general-liability",
    title: "Maryland General Liability Insurance",
    metaTitle: "General Liability Insurance Maryland",
    metaDescription:
      "General liability insurance for Maryland businesses, including typical coverage and how it relates to state requirements.",
    primaryKeyword: "general liability insurance Maryland",
    phase: 2,
    cluster: "primary",
    contentSource: { type: "state-guide", categorySlug: "general-liability-insurance" },
    redirectsFrom: ["/states/maryland/general-liability-insurance/"],
  }),
  stateChild({
    state: "maryland",
    guideSlug: "business-insurance",
    categorySlug: "workers-compensation-insurance",
    childSlug: "workers-compensation",
    title: "Maryland Workers' Compensation Insurance",
    metaTitle: "Workers Compensation Insurance Maryland",
    metaDescription:
      "Maryland generally requires workers' compensation insurance for employers with one or more employees. Thresholds, exceptions, and official sources.",
    primaryKeyword: "workers compensation insurance Maryland",
    phase: 2,
    cluster: "primary",
    contentSource: {
      type: "state-guide",
      categorySlug: "workers-compensation-insurance",
    },
    redirectsFrom: ["/states/maryland/workers-compensation-insurance/"],
  }),
  stateChild({
    state: "maryland",
    guideSlug: "business-insurance",
    categorySlug: "commercial-auto-insurance",
    childSlug: "commercial-auto",
    title: "Maryland Commercial Auto Insurance",
    metaTitle: "Commercial Auto Insurance Maryland",
    metaDescription:
      "Commercial auto insurance for Maryland business vehicles, including state liability minimums and when personal auto is not enough.",
    primaryKeyword: "commercial auto insurance Maryland",
    phase: 2,
    cluster: "primary",
    contentSource: { type: "state-guide", categorySlug: "commercial-auto-insurance" },
    redirectsFrom: ["/states/maryland/commercial-auto-insurance/"],
  }),
  stateGuide({
    state: "maryland",
    guideSlug: "landlord-insurance",
    categorySlug: "landlord-insurance",
    title: "Maryland Landlord Insurance",
    metaTitle: "Landlord Insurance Maryland",
    metaDescription:
      "Landlord insurance for Maryland rental property owners, including how coverage differs from homeowners and renters policies.",
    primaryKeyword: "landlord insurance Maryland",
    phase: 3,
    cluster: "specialty",
    contentSource: { type: "state-guide", categorySlug: "landlord-insurance" },
    navLabel: "Landlord Insurance",
  }),
  stateGuide({
    state: "maryland",
    guideSlug: "flood-insurance",
    categorySlug: "flood-insurance",
    title: "Maryland Flood Insurance",
    metaTitle: "Flood Insurance Maryland",
    metaDescription:
      "Flood insurance in Maryland is separate from standard homeowners coverage. NFIP basics and coastal and inland flood exposure.",
    primaryKeyword: "flood insurance Maryland",
    phase: 3,
    cluster: "specialty",
    contentSource: { type: "state-guide", categorySlug: "flood-insurance" },
    navLabel: "Flood Insurance",
  }),
  stateGuide({
    state: "maryland",
    guideSlug: "umbrella-insurance",
    categorySlug: "umbrella-insurance",
    title: "Maryland Umbrella Insurance",
    metaTitle: "Maryland Umbrella Insurance",
    metaDescription:
      "Umbrella insurance as extra liability coverage above Maryland auto and home policies.",
    primaryKeyword: "umbrella insurance Maryland",
    phase: 3,
    cluster: "deprioritized",
    contentSource: { type: "state-guide", categorySlug: "umbrella-insurance" },
    navLabel: "Umbrella Insurance",
  }),
  stateGuide({
    state: "maryland",
    guideSlug: "life-insurance",
    categorySlug: "life-insurance",
    title: "Maryland Life Insurance",
    metaTitle: "Maryland Life Insurance",
    metaDescription:
      "Educational overview of life insurance considerations for Maryland residents. Not a current publishing priority.",
    primaryKeyword: "life insurance Maryland",
    phase: 4,
    cluster: "deprioritized",
    contentSource: { type: "state-guide", categorySlug: "life-insurance" },
    navLabel: "Life Insurance",
  }),
];

const virginiaPages: SeoPage[] = [
  stateHub("virginia"),
  stateGuide({
    state: "virginia",
    guideSlug: "auto-insurance",
    categorySlug: "auto-insurance",
    title: "Virginia Auto Insurance",
    metaTitle: "Virginia Car Insurance Guide",
    metaDescription:
      "Virginia requires 50/100/25 liability and matching UM/UIM. Guide to car insurance rules, coverage choices, and related DMV requirements.",
    primaryKeyword: "car insurance Virginia",
    phase: 1,
    cluster: "primary",
    contentSource: { type: "state-guide", categorySlug: "auto-insurance" },
    navLabel: "Auto Insurance",
  }),
  stateChild({
    state: "virginia",
    guideSlug: "auto-insurance",
    categorySlug: "auto-insurance",
    childSlug: "requirements",
    title: "Virginia Auto Insurance Requirements",
    metaTitle: "Virginia Auto Insurance Requirements",
    metaDescription:
      "Virginia requires 50/100/25 liability and matching uninsured motorist coverage. Limits, proof rules, lapse penalties, and official sources.",
    primaryKeyword: "Virginia auto insurance requirements",
    phase: 1,
    contentSource: { type: "article", slug: "virginia-auto-insurance-requirements" },
    redirectsFrom: ["/blog/virginia-auto-insurance-requirements/"],
    effectiveDate: "2025-01-01",
  }),
  plannedStateChild({
    state: "virginia",
    guideSlug: "auto-insurance",
    categorySlug: "auto-insurance",
    childSlug: "cost",
    title: "Virginia Car Insurance Cost",
    metaTitle: "Average Car Insurance Cost Virginia",
    metaDescription:
      "Sourced averages and factors that affect Virginia car insurance rates.",
    primaryKeyword: "average car insurance cost Virginia",
    phase: 1,
  }),
  stateGuide({
    state: "virginia",
    guideSlug: "homeowners-insurance",
    categorySlug: "home-insurance",
    title: "Virginia Homeowners Insurance",
    metaTitle: "Homeowners Insurance Virginia",
    metaDescription:
      "Virginia homeowners insurance is not required by state law, but lenders usually require it. Coverage, Northern Virginia and coastal risks, and official resources.",
    primaryKeyword: "homeowners insurance Virginia",
    phase: 1,
    cluster: "primary",
    contentSource: { type: "article", slug: "homeowners-insurance-in-virginia" },
    redirectsFrom: [
      "/states/virginia/home-insurance/",
      "/blog/homeowners-insurance-in-virginia/",
    ],
    navLabel: "Homeowners Insurance",
  }),
  plannedStateChild({
    state: "virginia",
    guideSlug: "homeowners-insurance",
    categorySlug: "home-insurance",
    childSlug: "cost",
    title: "Virginia Homeowners Insurance Rates",
    metaTitle: "Homeowners Insurance Rates Virginia",
    metaDescription:
      "Sourced homeowners insurance rates and average costs in Virginia.",
    primaryKeyword: "homeowners insurance rates Virginia",
    phase: 1,
  }),
  plannedStateChild({
    state: "virginia",
    guideSlug: "homeowners-insurance",
    categorySlug: "home-insurance",
    childSlug: "laws",
    title: "Virginia Homeowners Insurance Laws",
    metaTitle: "Virginia Homeowners Insurance Laws",
    metaDescription:
      "Whether homeowners insurance is required in Virginia and how state insurance regulations apply.",
    primaryKeyword: "Virginia homeowners insurance laws",
    phase: 1,
  }),
  stateGuide({
    state: "virginia",
    guideSlug: "renters-insurance",
    categorySlug: "renters-insurance",
    title: "Virginia Renters Insurance",
    metaTitle: "Renters Insurance Virginia",
    metaDescription:
      "Virginia renters insurance is not required by state law, but a lease may require it. Coverage and landlord rules.",
    primaryKeyword: "renters insurance Virginia",
    phase: 1,
    cluster: "primary",
    contentSource: { type: "state-guide", categorySlug: "renters-insurance" },
    navLabel: "Renters Insurance",
  }),
  plannedStateChild({
    state: "virginia",
    guideSlug: "renters-insurance",
    categorySlug: "renters-insurance",
    childSlug: "requirements",
    title: "Is Renters Insurance Required in Virginia?",
    metaTitle: "Is Renters Insurance Required in Virginia?",
    metaDescription:
      "Virginia does not require renters insurance by statute. Landlords may require it in a lease.",
    primaryKeyword: "is renters insurance required in Virginia",
    phase: 1,
  }),
  plannedStateChild({
    state: "virginia",
    guideSlug: "renters-insurance",
    categorySlug: "renters-insurance",
    childSlug: "cost",
    title: "Virginia Renters Insurance Cost",
    metaTitle: "Average Cost of Renters Insurance in Virginia",
    metaDescription:
      "Sourced average cost of renters insurance in Virginia. Phase 2 page.",
    primaryKeyword: "average cost of renters insurance in Virginia",
    phase: 2,
  }),
  stateGuide({
    state: "virginia",
    guideSlug: "business-insurance",
    categorySlug: "business-insurance",
    title: "Virginia Business Insurance",
    metaTitle: "Virginia Business Insurance",
    metaDescription:
      "Virginia business insurance guide covering workers' compensation, general liability, commercial auto, and small-business coverage rules.",
    primaryKeyword: "Virginia business insurance",
    phase: 2,
    cluster: "primary",
    contentSource: { type: "article", slug: "business-insurance-in-virginia" },
    redirectsFrom: ["/blog/business-insurance-in-virginia/"],
    navLabel: "Business Insurance",
  }),
  stateChild({
    state: "virginia",
    guideSlug: "business-insurance",
    categorySlug: "general-liability-insurance",
    childSlug: "general-liability",
    title: "Virginia General Liability Insurance",
    metaTitle: "Virginia General Liability Insurance",
    metaDescription:
      "General liability insurance for Virginia businesses, including typical coverage and related commercial requirements.",
    primaryKeyword: "Virginia general liability insurance",
    phase: 2,
    cluster: "primary",
    contentSource: { type: "state-guide", categorySlug: "general-liability-insurance" },
    redirectsFrom: ["/states/virginia/general-liability-insurance/"],
  }),
  stateChild({
    state: "virginia",
    guideSlug: "business-insurance",
    categorySlug: "workers-compensation-insurance",
    childSlug: "workers-compensation",
    title: "Virginia Workers' Compensation Insurance",
    metaTitle: "Workers Compensation Insurance Virginia",
    metaDescription:
      "Virginia generally requires workers' compensation insurance for employers with three or more employees. Thresholds, rates context, and official sources.",
    primaryKeyword: "workers compensation insurance Virginia",
    phase: 2,
    cluster: "primary",
    contentSource: {
      type: "state-guide",
      categorySlug: "workers-compensation-insurance",
    },
    redirectsFrom: ["/states/virginia/workers-compensation-insurance/"],
  }),
  stateChild({
    state: "virginia",
    guideSlug: "business-insurance",
    categorySlug: "commercial-auto-insurance",
    childSlug: "commercial-auto",
    title: "Virginia Commercial Auto Insurance",
    metaTitle: "Commercial Auto Insurance Virginia",
    metaDescription:
      "Commercial auto insurance for Virginia business vehicles, including 50/100/25 minimums for policies effective in 2025.",
    primaryKeyword: "commercial auto insurance Virginia",
    phase: 2,
    cluster: "primary",
    contentSource: { type: "state-guide", categorySlug: "commercial-auto-insurance" },
    redirectsFrom: ["/states/virginia/commercial-auto-insurance/"],
  }),
  stateGuide({
    state: "virginia",
    guideSlug: "landlord-insurance",
    categorySlug: "landlord-insurance",
    title: "Virginia Landlord Insurance",
    metaTitle: "Landlord Insurance Virginia",
    metaDescription:
      "Landlord insurance for Virginia rental property owners, including how coverage differs from homeowners and renters policies.",
    primaryKeyword: "landlord insurance Virginia",
    phase: 3,
    cluster: "specialty",
    contentSource: { type: "state-guide", categorySlug: "landlord-insurance" },
    navLabel: "Landlord Insurance",
  }),
  stateGuide({
    state: "virginia",
    guideSlug: "flood-insurance",
    categorySlug: "flood-insurance",
    title: "Virginia Flood Insurance",
    metaTitle: "Flood Insurance Virginia",
    metaDescription:
      "Flood insurance in Virginia is separate from standard homeowners coverage. Coastal and inland flood exposure and NFIP basics.",
    primaryKeyword: "flood insurance Virginia",
    phase: 3,
    cluster: "specialty",
    contentSource: { type: "state-guide", categorySlug: "flood-insurance" },
    navLabel: "Flood Insurance",
  }),
  stateGuide({
    state: "virginia",
    guideSlug: "umbrella-insurance",
    categorySlug: "umbrella-insurance",
    title: "Virginia Umbrella Insurance",
    metaTitle: "Virginia Umbrella Insurance",
    metaDescription:
      "Umbrella insurance as extra liability coverage above Virginia auto and home policies.",
    primaryKeyword: "umbrella insurance Virginia",
    phase: 3,
    cluster: "deprioritized",
    contentSource: { type: "state-guide", categorySlug: "umbrella-insurance" },
    navLabel: "Umbrella Insurance",
  }),
  stateGuide({
    state: "virginia",
    guideSlug: "life-insurance",
    categorySlug: "life-insurance",
    title: "Virginia Life Insurance",
    metaTitle: "Virginia Life Insurance",
    metaDescription:
      "Educational overview of life insurance considerations for Virginia residents. Not a current publishing priority.",
    primaryKeyword: "life insurance Virginia",
    phase: 4,
    cluster: "deprioritized",
    contentSource: { type: "state-guide", categorySlug: "life-insurance" },
    navLabel: "Life Insurance",
  }),
];

const dcPages: SeoPage[] = [
  stateHub("washington-dc"),
  stateGuide({
    state: "washington-dc",
    guideSlug: "auto-insurance",
    categorySlug: "auto-insurance",
    title: "Washington, D.C. Auto Insurance",
    metaTitle: "Washington DC Car Insurance Guide",
    metaDescription:
      "Washington, D.C. requires 25/50/10 liability and uninsured motorist coverage. Guide to car insurance rules and related DMV requirements.",
    primaryKeyword: "car insurance Washington DC",
    phase: 1,
    cluster: "primary",
    contentSource: { type: "state-guide", categorySlug: "auto-insurance" },
    navLabel: "Auto Insurance",
  }),
  stateChild({
    state: "washington-dc",
    guideSlug: "auto-insurance",
    categorySlug: "auto-insurance",
    childSlug: "requirements",
    title: "Washington, D.C. Auto Insurance Requirements",
    metaTitle: "Washington DC Auto Insurance Requirements",
    metaDescription:
      "D.C. auto insurance minimums, uninsured motorist rules, optional PIP, proof requirements, and official DISB and DMV sources.",
    primaryKeyword: "Washington DC auto insurance requirements",
    phase: 1,
    contentSource: {
      type: "article",
      slug: "washington-dc-auto-insurance-requirements",
    },
    redirectsFrom: ["/blog/washington-dc-auto-insurance-requirements/"],
  }),
  plannedStateChild({
    state: "washington-dc",
    guideSlug: "auto-insurance",
    categorySlug: "auto-insurance",
    childSlug: "cost",
    title: "Washington, D.C. Car Insurance Cost",
    metaTitle: "Average Car Insurance Cost Washington DC",
    metaDescription:
      "Sourced average car insurance cost in Washington, D.C. Phase 2 page.",
    primaryKeyword: "average car insurance cost Washington DC",
    phase: 2,
  }),
  stateGuide({
    state: "washington-dc",
    guideSlug: "homeowners-insurance",
    categorySlug: "home-insurance",
    title: "Washington, D.C. Homeowners Insurance",
    metaTitle: "Homeowners Insurance Washington DC",
    metaDescription:
      "D.C. homeowners insurance for rowhomes, condos, and older housing stock. How to compare coverage without fake insurer rankings.",
    primaryKeyword: "homeowners insurance Washington DC",
    phase: 1,
    cluster: "primary",
    contentSource: { type: "state-guide", categorySlug: "home-insurance" },
    redirectsFrom: ["/states/washington-dc/home-insurance/"],
    navLabel: "Homeowners Insurance",
  }),
  stateGuide({
    state: "washington-dc",
    guideSlug: "renters-insurance",
    categorySlug: "renters-insurance",
    title: "Washington, D.C. Renters Insurance",
    metaTitle: "Renters Insurance Washington DC",
    metaDescription:
      "Renters insurance in Washington, D.C. is commonly required by leases. Coverage for belongings, liability, and urban rental risks.",
    primaryKeyword: "renters insurance Washington DC",
    phase: 1,
    cluster: "primary",
    contentSource: { type: "article", slug: "renters-insurance-in-washington-dc" },
    redirectsFrom: ["/blog/renters-insurance-in-washington-dc/"],
    navLabel: "Renters Insurance",
  }),
  stateGuide({
    state: "washington-dc",
    guideSlug: "business-insurance",
    categorySlug: "business-insurance",
    title: "Washington, D.C. Business Insurance",
    metaTitle: "Business Insurance Washington DC",
    metaDescription:
      "Business insurance in Washington, D.C., including workers' compensation, general liability, and commercial auto considerations.",
    primaryKeyword: "business insurance Washington DC",
    phase: 2,
    cluster: "primary",
    contentSource: { type: "article", slug: "business-insurance-in-washington-dc" },
    redirectsFrom: ["/blog/business-insurance-in-washington-dc/"],
    navLabel: "Business Insurance",
  }),
  stateChild({
    state: "washington-dc",
    guideSlug: "business-insurance",
    categorySlug: "general-liability-insurance",
    childSlug: "general-liability",
    title: "Washington, D.C. General Liability Insurance",
    metaTitle: "General Liability Insurance Washington DC",
    metaDescription:
      "General liability insurance for D.C. businesses, including typical coverage and related commercial requirements.",
    primaryKeyword: "general liability insurance Washington DC",
    phase: 2,
    cluster: "specialty",
    contentSource: { type: "state-guide", categorySlug: "general-liability-insurance" },
    redirectsFrom: ["/states/washington-dc/general-liability-insurance/"],
  }),
  stateChild({
    state: "washington-dc",
    guideSlug: "business-insurance",
    categorySlug: "workers-compensation-insurance",
    childSlug: "workers-compensation",
    title: "Washington, D.C. Workers' Compensation Insurance",
    metaTitle: "Workers Compensation Insurance Washington DC",
    metaDescription:
      "Workers' compensation insurance rules for Washington, D.C. employers, with official District sources.",
    primaryKeyword: "workers compensation insurance Washington DC",
    phase: 2,
    cluster: "primary",
    contentSource: {
      type: "state-guide",
      categorySlug: "workers-compensation-insurance",
    },
    redirectsFrom: ["/states/washington-dc/workers-compensation-insurance/"],
  }),
  stateChild({
    state: "washington-dc",
    guideSlug: "business-insurance",
    categorySlug: "commercial-auto-insurance",
    childSlug: "commercial-auto",
    title: "Washington, D.C. Commercial Auto Insurance",
    metaTitle: "Commercial Auto Insurance Washington DC",
    metaDescription:
      "Commercial auto insurance for D.C. business vehicles, including District liability minimums.",
    primaryKeyword: "commercial auto insurance Washington DC",
    phase: 2,
    cluster: "primary",
    contentSource: { type: "state-guide", categorySlug: "commercial-auto-insurance" },
    redirectsFrom: ["/states/washington-dc/commercial-auto-insurance/"],
  }),
  stateGuide({
    state: "washington-dc",
    guideSlug: "landlord-insurance",
    categorySlug: "landlord-insurance",
    title: "Washington, D.C. Landlord Insurance",
    metaTitle: "Landlord Insurance Washington DC",
    metaDescription:
      "Landlord insurance for D.C. rental property owners, including rowhomes, condos, and tenant-related coverage issues.",
    primaryKeyword: "landlord insurance Washington DC",
    phase: 3,
    cluster: "specialty",
    contentSource: { type: "state-guide", categorySlug: "landlord-insurance" },
    navLabel: "Landlord Insurance",
  }),
  stateGuide({
    state: "washington-dc",
    guideSlug: "flood-insurance",
    categorySlug: "flood-insurance",
    title: "Washington, D.C. Flood Insurance",
    metaTitle: "Flood Insurance Washington DC",
    metaDescription:
      "Flood insurance in Washington, D.C. is separate from standard homeowners coverage.",
    primaryKeyword: "flood insurance Washington DC",
    phase: 3,
    cluster: "specialty",
    contentSource: { type: "state-guide", categorySlug: "flood-insurance" },
    navLabel: "Flood Insurance",
  }),
  stateGuide({
    state: "washington-dc",
    guideSlug: "umbrella-insurance",
    categorySlug: "umbrella-insurance",
    title: "Washington, D.C. Umbrella Insurance",
    metaTitle: "Washington DC Umbrella Insurance",
    metaDescription:
      "Umbrella insurance as extra liability coverage above D.C. auto and home policies.",
    primaryKeyword: "umbrella insurance Washington DC",
    phase: 3,
    cluster: "deprioritized",
    contentSource: { type: "state-guide", categorySlug: "umbrella-insurance" },
    navLabel: "Umbrella Insurance",
  }),
  stateGuide({
    state: "washington-dc",
    guideSlug: "life-insurance",
    categorySlug: "life-insurance",
    title: "Washington, D.C. Life Insurance",
    metaTitle: "Washington DC Life Insurance",
    metaDescription:
      "Educational overview of life insurance considerations for D.C. residents. Not a current publishing priority.",
    primaryKeyword: "life insurance Washington DC",
    phase: 4,
    cluster: "deprioritized",
    contentSource: { type: "state-guide", categorySlug: "life-insurance" },
    navLabel: "Life Insurance",
  }),
];

export const SEO_PAGES: SeoPage[] = [
  ...staticPages,
  ...legalPages.map((item) =>
    page({
      path: item.path,
      title: item.title,
      metaTitle: item.title,
      metaDescription: item.metaDescription,
      status: "published",
      indexable: true,
      lastModified: STATIC_DATE,
      kind: "static",
      phase: 0,
      changeFrequency: "yearly",
      priority: 0.3,
      contentSource: { type: "static" },
    }),
  ),
  ...topicHubs,
  ...plannedTopicGuides,
  ...marylandPages,
  ...virginiaPages,
  ...dcPages,
];

const pagesByPath = new Map(SEO_PAGES.map((item) => [item.path, item]));

export function isPublicPage(page: SeoPage): boolean {
  return page.status === "published" && page.indexable;
}

export function getSeoPage(path: string): SeoPage | undefined {
  return pagesByPath.get(path);
}

export function getPublicSeoPages(): SeoPage[] {
  return SEO_PAGES.filter(isPublicPage);
}

export function getSeoPagesByKind(kind: SeoPage["kind"]): SeoPage[] {
  return SEO_PAGES.filter((item) => item.kind === kind);
}

export function getPublishedTopicHubs(): SeoPage[] {
  return getPublicSeoPages().filter(
    (item) => item.kind === "topic-hub" || item.kind === "topic-guide",
  );
}

export function getPrimaryTopicHubs(): SeoPage[] {
  return getPublicSeoPages().filter(
    (item) => item.kind === "topic-hub" && item.cluster === "primary",
  );
}

export function getPublishedStateHubs(): SeoPage[] {
  return getPublicSeoPages().filter((item) => item.kind === "state-hub");
}

export function getPublishedGuidesForState(stateSlug: string): SeoPage[] {
  return getPublicSeoPages().filter(
    (item) =>
      item.stateSlug === stateSlug &&
      (item.kind === "state-guide" || item.kind === "state-child"),
  );
}

export function getPublishedStateGuides(
  stateSlug: string,
  cluster?: SeoPageCluster,
): SeoPage[] {
  return getPublicSeoPages().filter(
    (item) =>
      item.stateSlug === stateSlug &&
      item.kind === "state-guide" &&
      (cluster ? item.cluster === cluster : true),
  );
}

export function getPublishedChildren(parentPath: string): SeoPage[] {
  return getPublicSeoPages().filter(
    (item) => item.parentPath === parentPath && item.kind === "state-child",
  );
}

export function getTopicHubForCategory(categorySlug: string): SeoPage | undefined {
  return getPublicSeoPages().find(
    (item) =>
      (item.kind === "topic-hub" || item.kind === "topic-guide") &&
      item.categorySlug === categorySlug,
  );
}

export function getPublishedStatePage(
  stateSlug: string,
  guideSlug: string,
  childSlug?: string,
): SeoPage | undefined {
  if (childSlug) {
    return getPublicSeoPages().find(
      (item) =>
        item.stateSlug === stateSlug &&
        item.guideSlug === guideSlug &&
        item.childSlug === childSlug,
    );
  }
  return getPublicSeoPages().find(
    (item) =>
      item.stateSlug === stateSlug &&
      item.guideSlug === guideSlug &&
      !item.childSlug &&
      (item.kind === "state-guide" || item.kind === "state-hub"),
  );
}

export function getPublishedStateLandingsForCategory(
  categorySlug: string,
): SeoPage[] {
  const detailChildren = new Set(["requirements", "cost", "laws"]);
  return getPublicSeoPages().filter(
    (item) =>
      item.categorySlug === categorySlug &&
      Boolean(item.stateSlug) &&
      (item.kind === "state-guide" ||
        (item.kind === "state-child" &&
          item.childSlug !== undefined &&
          !detailChildren.has(item.childSlug))),
  );
}

export function getNestedTopicGuides(parentPath: string): SeoPage[] {
  return getPublicSeoPages().filter(
    (item) => item.kind === "topic-guide" && item.parentPath === parentPath,
  );
}

export function getHrefForArticleSlug(slug: string): string {
  const match = getPublicSeoPages().find(
    (item) => item.contentSource?.type === "article" && item.contentSource.slug === slug,
  );
  return match?.path ?? `/blog/${slug}/`;
}

export function isMigratedArticleSlug(slug: string): boolean {
  return getHrefForArticleSlug(slug) !== `/blog/${slug}/`;
}

export function getPermanentRedirects(): {
  source: string;
  destination: string;
  permanent: true;
}[] {
  return SEO_PAGES.flatMap((item) =>
    (item.redirectsFrom ?? []).map((source) => ({
      source: source.replace(/\/$/, "") || "/",
      destination: item.path.replace(/\/$/, "") || "/",
      permanent: true as const,
    })),
  );
}

export function getGuideNetwork(page: SeoPage): SeoPage[] {
  const results: SeoPage[] = [];

  const push = (candidate: SeoPage | undefined) => {
    if (
      candidate &&
      isPublicPage(candidate) &&
      candidate.path !== page.path &&
      !results.some((item) => item.path === candidate.path)
    ) {
      results.push(candidate);
    }
  };

  push(page.parentPath ? getSeoPage(page.parentPath) : undefined);

  if (page.categorySlug) {
    push(getTopicHubForCategory(page.categorySlug));
  }

  if (page.path !== "/" && page.kind !== "state-hub" && page.stateSlug) {
    push(getSeoPage(`/states/${page.stateSlug}/`));
  }

  for (const child of getPublishedChildren(page.path)) {
    push(child);
  }

  if (page.stateSlug && page.kind === "state-guide") {
    for (const sibling of getPublishedStateGuides(page.stateSlug, "primary")) {
      push(sibling);
    }
  }

  if (page.guideSlug) {
    for (const peer of getPublicSeoPages()) {
      if (
        peer.guideSlug === page.guideSlug &&
        peer.childSlug === page.childSlug &&
        peer.kind === page.kind &&
        peer.stateSlug &&
        peer.stateSlug !== page.stateSlug
      ) {
        push(peer);
      }
    }
  }

  for (const extraPath of page.relatedPaths ?? []) {
    push(getSeoPage(extraPath));
  }

  return results;
}

export function getLatestPublicModifiedDate(): string {
  return getPublicSeoPages()
    .map((item) => item.lastModified)
    .sort()
    .at(-1) ?? CONTENT_DATE;
}
