import type { CoverageTypeId } from "./coverage";

export interface LeadQuestionOption {
  id: string;
  label: string;
}

export interface LeadQuestion {
  id: string;
  label: string;
  required?: boolean;
  type: "single" | "text";
  options?: LeadQuestionOption[];
  placeholder?: string;
  maxLength?: number;
}

const insuredOptions: LeadQuestionOption[] = [
  { id: "yes", label: "Yes, I currently have coverage" },
  { id: "no", label: "No, I need new coverage" },
  { id: "unsure", label: "I'm not sure" },
];

const employeeOptions: LeadQuestionOption[] = [
  { id: "1-4", label: "1–4 employees" },
  { id: "5-10", label: "5–10 employees" },
  { id: "11-50", label: "11–50 employees" },
  { id: "51-plus", label: "51 or more employees" },
  { id: "none", label: "No employees" },
];

const businessTypeOptions: LeadQuestionOption[] = [
  { id: "contractor", label: "Contractor / trades" },
  { id: "professional", label: "Professional services" },
  { id: "retail", label: "Retail" },
  { id: "restaurant", label: "Restaurant / hospitality" },
  { id: "healthcare", label: "Healthcare" },
  { id: "trucking", label: "Trucking / transportation" },
  { id: "other", label: "Other" },
];

export function getContextualQuestions(coverageType: CoverageTypeId | undefined): LeadQuestion[] {
  switch (coverageType) {
    case "auto":
      return [
        {
          id: "vehicleUse",
          label: "Is this for personal or commercial use?",
          type: "single",
          required: true,
          options: [
            { id: "personal", label: "Personal" },
            { id: "commercial", label: "Commercial" },
          ],
        },
        {
          id: "currentlyInsured",
          label: "Do you currently have auto insurance?",
          type: "single",
          required: true,
          options: insuredOptions,
        },
      ];
    case "homeowners":
      return [
        {
          id: "homeStatus",
          label: "Which best describes your situation?",
          type: "single",
          required: true,
          options: [
            { id: "own", label: "I own the home" },
            { id: "buying", label: "I'm buying a home" },
            { id: "refinancing", label: "I'm refinancing" },
          ],
        },
      ];
    case "renters":
      return [
        {
          id: "renterStatus",
          label: "Which best describes your situation?",
          type: "single",
          required: true,
          options: [
            { id: "renting", label: "I currently rent" },
            { id: "moving", label: "I'm moving soon" },
          ],
        },
      ];
    case "business":
    case "general-liability":
      return [
        {
          id: "businessType",
          label: "What type of business is this?",
          type: "single",
          required: true,
          options: businessTypeOptions,
        },
        {
          id: "employees",
          label: "About how many employees do you have?",
          type: "single",
          required: true,
          options: employeeOptions,
        },
      ];
    case "commercial-auto":
      return [
        {
          id: "currentlyInsured",
          label: "Do you currently have commercial auto coverage?",
          type: "single",
          required: true,
          options: insuredOptions,
        },
        {
          id: "employees",
          label: "About how many employees do you have?",
          type: "single",
          options: employeeOptions,
        },
      ];
    case "workers-compensation":
      return [
        {
          id: "employees",
          label: "About how many employees do you have?",
          type: "single",
          required: true,
          options: employeeOptions,
        },
        {
          id: "currentlyInsured",
          label: "Do you currently have workers' compensation coverage?",
          type: "single",
          required: true,
          options: insuredOptions,
        },
      ];
    case "landlord":
      return [
        {
          id: "propertyCount",
          label: "How many rental units are involved?",
          type: "single",
          required: true,
          options: [
            { id: "1", label: "1 unit" },
            { id: "2-4", label: "2–4 units" },
            { id: "5-plus", label: "5 or more units" },
          ],
        },
      ];
    case "flood":
      return [
        {
          id: "propertyType",
          label: "What type of property needs flood coverage?",
          type: "single",
          required: true,
          options: [
            { id: "home", label: "Home" },
            { id: "rental", label: "Rental / apartment" },
            { id: "business", label: "Business property" },
          ],
        },
      ];
    default:
      return [
        {
          id: "otherNeed",
          label: "Briefly, what kind of coverage are you looking for?",
          type: "text",
          placeholder: "For example: umbrella coverage, a policy review, or something else",
          maxLength: 200,
        },
      ];
  }
}
