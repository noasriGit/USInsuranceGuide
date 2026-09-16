import { z } from "zod";
import { COVERAGE_TYPES } from "./coverage";
import { normalizeSourcePath } from "./context";

const coverageIds = COVERAGE_TYPES.map((item) => item.id) as [
  (typeof COVERAGE_TYPES)[number]["id"],
  ...(typeof COVERAGE_TYPES)[number]["id"][],
];

const optionalEmail = z
  .string()
  .trim()
  .max(254)
  .transform((value) => value.toLowerCase())
  .pipe(z.union([z.literal(""), z.string().email("Enter a valid email address.")]));

export const LeadSubmissionSchema = z
  .object({
    coverageType: z.enum(coverageIds, { error: "Select a coverage type." }),
    state: z.enum(["maryland", "virginia", "washington-dc"], {
      error: "Select Maryland, Virginia, or Washington, D.C.",
    }),
    zipCode: z
      .string()
      .trim()
      .max(10)
      .optional()
      .transform((value) => value || undefined)
      .refine(
        (value) => !value || /^\d{5}(?:-\d{4})?$/.test(value),
        "Enter a 5-digit ZIP code.",
      ),
    firstName: z.string().trim().min(1, "Enter your first name.").max(80),
    lastName: z.string().trim().min(1, "Enter your last name.").max(80),
    email: optionalEmail.optional(),
    phone: z
      .string()
      .trim()
      .max(32)
      .optional()
      .transform((value) => value || undefined),
    answers: z
      .record(
        z.string().max(40),
        z.union([z.string().max(400), z.number(), z.boolean()]),
      )
      .default({}),
    sourcePath: z.string().max(300).optional(),
    sourcePageType: z.string().max(40).optional(),
    sourceTopic: z.string().max(80).optional(),
    sourceState: z.enum(["maryland", "virginia", "washington-dc"]).optional(),
    referrer: z.string().max(500).optional(),
    utmSource: z.string().max(120).optional(),
    utmMedium: z.string().max(120).optional(),
    utmCampaign: z.string().max(120).optional(),
    utmContent: z.string().max(120).optional(),
    utmTerm: z.string().max(120).optional(),
    consent: z.literal(true, { error: "Consent is required to send this request." }),
    website: z.string().max(200).optional(),
    startedAt: z.number().int().positive().optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    const email = value.email?.trim();
    const phoneDigits = value.phone?.replace(/\D/g, "") ?? "";
    if (!email && phoneDigits.length < 10) {
      ctx.addIssue({
        code: "custom",
        path: ["email"],
        message: "Provide an email address or a phone number.",
      });
    }
    if (value.phone && phoneDigits.length > 0 && (phoneDigits.length < 10 || phoneDigits.length > 15)) {
      ctx.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Enter a valid phone number.",
      });
    }
  });

export type LeadSubmissionInput = z.input<typeof LeadSubmissionSchema>;
export type LeadSubmission = z.output<typeof LeadSubmissionSchema>;

export interface NormalizedLead {
  id: string;
  createdAt: string;
  coverageType: LeadSubmission["coverageType"];
  state: LeadSubmission["state"];
  zipCode?: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  answers: Record<string, string | number | boolean>;
  sourcePath: string;
  sourcePageType?: string;
  sourceTopic?: string;
  sourceState?: LeadSubmission["state"];
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
}

export function sanitizeFreeText(value: string): string {
  return value.replace(/[\u0000-\u001F\u007F]/g, "").replace(/\s+/g, " ").trim();
}

export function normalizeLead(input: LeadSubmission, id: string): NormalizedLead {
  const answers: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(input.answers ?? {})) {
    answers[key] = typeof value === "string" ? sanitizeFreeText(value) : value;
  }

  const phoneDigits = input.phone?.replace(/\D/g, "");

  return {
    id,
    createdAt: new Date().toISOString(),
    coverageType: input.coverageType,
    state: input.state,
    zipCode: input.zipCode,
    firstName: sanitizeFreeText(input.firstName),
    lastName: sanitizeFreeText(input.lastName),
    email: input.email || undefined,
    phone: phoneDigits || undefined,
    answers,
    sourcePath: normalizeSourcePath(input.sourcePath),
    sourcePageType: input.sourcePageType,
    sourceTopic: input.sourceTopic,
    sourceState: input.sourceState,
    referrer: input.referrer ? sanitizeFreeText(input.referrer) : undefined,
    utmSource: input.utmSource ? sanitizeFreeText(input.utmSource) : undefined,
    utmMedium: input.utmMedium ? sanitizeFreeText(input.utmMedium) : undefined,
    utmCampaign: input.utmCampaign ? sanitizeFreeText(input.utmCampaign) : undefined,
    utmContent: input.utmContent ? sanitizeFreeText(input.utmContent) : undefined,
    utmTerm: input.utmTerm ? sanitizeFreeText(input.utmTerm) : undefined,
  };
}
