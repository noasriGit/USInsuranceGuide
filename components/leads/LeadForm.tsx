"use client";

import { useMemo, useState, useId, useRef } from "react";
import Link from "next/link";
import { submitLeadAction } from "@/app/actions/leads";
import { trackLeadEvent } from "@/lib/analytics/events";
import {
  COVERAGE_TYPES,
  LEAD_STATES,
  coverageLabel,
  stateLabel,
  type CoverageTypeId,
  type LeadStateId,
} from "@/lib/leads/coverage";
import type { LeadPageContext } from "@/lib/leads/context";
import { getContextualQuestions } from "@/lib/leads/questions";

interface LeadFormProps {
  context: LeadPageContext;
}

interface FormState {
  coverageType: CoverageTypeId | "";
  state: LeadStateId | "";
  zipCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  answers: Record<string, string>;
  consent: boolean;
  website: string;
}

function readAttribution() {
  if (typeof window === "undefined") {
    return { utm: {} as Record<string, string>, referrer: undefined as string | undefined };
  }
  let utm: Record<string, string> = {};
  try {
    utm = JSON.parse(window.sessionStorage.getItem("usig_utm") ?? "{}") as Record<string, string>;
  } catch {
    utm = {};
  }
  return {
    utm,
    referrer: window.sessionStorage.getItem("usig_referrer") ?? document.referrer ?? undefined,
  };
}

export function LeadForm({ context }: LeadFormProps) {
  const initialStep = context.coverageType ? 2 : 1;
  const [step, setStep] = useState(initialStep);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successId, setSuccessId] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const errorId = useId();
  const [form, setForm] = useState<FormState>({
    coverageType: context.coverageType ?? "",
    state: context.state ?? "",
    zipCode: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    answers: {},
    consent: false,
    website: "",
  });
  const startedAtRef = useRef<number | null>(null);

  const stepQuestions = useMemo(
    () => getContextualQuestions(form.coverageType || undefined),
    [form.coverageType],
  );

  function markStarted() {
    if (startedAtRef.current == null) {
      startedAtRef.current = Date.now();
    }
    if (started) return;
    setStarted(true);
    trackLeadEvent("lead_form_start", {
      coverage_type: form.coverageType || undefined,
      state: form.state || undefined,
      source_path: context.sourcePath,
      page_type: context.sourcePageType,
    });
  }

  function goTo(next: number) {
    setError(null);
    setFieldErrors({});
    setStep(next);
    trackLeadEvent("lead_form_step", {
      coverage_type: form.coverageType || undefined,
      state: form.state || undefined,
      source_path: context.sourcePath,
      page_type: context.sourcePageType,
      step_number: next,
    });
  }

  function validateStep(current: number): boolean {
    const nextErrors: Record<string, string> = {};
    if (current === 1 && !form.coverageType) {
      nextErrors.coverageType = "Select the type of insurance you need.";
    }
    if (current === 2) {
      if (!form.state) nextErrors.state = "Select a jurisdiction.";
      if (form.zipCode && !/^\d{5}(?:-\d{4})?$/.test(form.zipCode)) {
        nextErrors.zipCode = "Enter a 5-digit ZIP code.";
      }
    }
    if (current === 3) {
      for (const question of stepQuestions) {
        if (question.required && !form.answers[question.id]) {
          nextErrors[`answers.${question.id}`] = "Select an option to continue.";
        }
      }
    }
    if (current === 4) {
      if (!form.firstName.trim()) nextErrors.firstName = "Enter your first name.";
      if (!form.lastName.trim()) nextErrors.lastName = "Enter your last name.";
      if (!form.email.trim() && !form.phone.trim()) {
        nextErrors.email = "Provide an email address or a phone number.";
      }
      if (!form.consent) nextErrors.consent = "Consent is required to send this request.";
    }
    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    markStarted();
    if (!validateStep(4) || !form.coverageType || !form.state) return;

    setSubmitting(true);
    setError(null);
    trackLeadEvent("lead_form_submit", {
      coverage_type: form.coverageType,
      state: form.state,
      source_path: context.sourcePath,
      page_type: context.sourcePageType,
      step_number: 4,
    });

    const attribution = readAttribution();
    const result = await submitLeadAction({
      coverageType: form.coverageType,
      state: form.state,
      zipCode: form.zipCode || undefined,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email || undefined,
      phone: form.phone || undefined,
      answers: form.answers,
      sourcePath: context.sourcePath,
      sourcePageType: context.sourcePageType,
      sourceTopic: context.sourceTopic,
      sourceState: context.sourceState ?? form.state,
      referrer: attribution.referrer,
      utmSource: attribution.utm.utm_source,
      utmMedium: attribution.utm.utm_medium,
      utmCampaign: attribution.utm.utm_campaign,
      utmContent: attribution.utm.utm_content,
      utmTerm: attribution.utm.utm_term,
      consent: form.consent,
      website: form.website,
      startedAt: startedAtRef.current ?? Date.now(),
    });

    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      setFieldErrors(result.fieldErrors ?? {});
      trackLeadEvent("lead_form_error", {
        coverage_type: form.coverageType,
        state: form.state,
        source_path: context.sourcePath,
        page_type: context.sourcePageType,
      });
      return;
    }

    setSuccessId(result.id);
    trackLeadEvent("lead_form_success", {
      coverage_type: form.coverageType,
      state: form.state,
      source_path: context.sourcePath,
      page_type: context.sourcePageType,
    });
  }

  if (successId) {
    return (
      <div className="surface-card p-6 sm:p-8" role="status">
        <h2 className="text-2xl font-semibold text-ink">Request received</h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-600">
          Thank you. We received your request for {coverageLabel(form.coverageType)} coverage
          in {stateLabel(form.state)}. A licensed insurance professional may follow up when
          a fit is available. This is not a quote, approval, or offer of coverage.
        </p>
        <p className="mt-4 text-sm text-slate-600">
          Continue reading the{" "}
          <Link href="/states/" className="font-medium text-navy-800 underline underline-offset-2">
            DMV insurance guides
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <form onFocus={markStarted} onSubmit={onSubmit} noValidate>
      <p className="text-sm font-medium text-navy-700">Step {step} of 4</p>
      <div className="progress-track mt-3" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }} />
      </div>

      {form.coverageType && form.state && (
        <p className="mt-4 text-sm text-slate-600">
          Requesting help with {coverageLabel(form.coverageType)} in {stateLabel(form.state)}.{" "}
          {step > 1 && (
            <button
              type="button"
              className="font-medium text-navy-800 underline underline-offset-2"
              onClick={() => goTo(1)}
            >
              Change
            </button>
          )}
        </p>
      )}

      {error && (
        <p id={errorId} className="mt-4 text-sm text-red-800" role="alert">
          {error}
        </p>
      )}

      {step === 1 && (
        <fieldset className="mt-6">
          <legend className="text-xl font-semibold text-ink">
            What type of insurance are you looking for?
          </legend>
          <div className="mt-4 grid gap-2">
            {COVERAGE_TYPES.map((option) => (
              <label
                key={option.id}
                className="choice-option"
              >
                <input
                  type="radio"
                  name="coverageType"
                  value={option.id}
                  checked={form.coverageType === option.id}
                  onChange={() => setForm((current) => ({ ...current, coverageType: option.id }))}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          {fieldErrors.coverageType && (
            <p className="mt-2 text-sm text-red-800" role="alert">
              {fieldErrors.coverageType}
            </p>
          )}
        </fieldset>
      )}

      {step === 2 && (
        <div className="mt-6 space-y-6">
          <fieldset>
            <legend className="text-xl font-semibold text-ink">Where do you need coverage?</legend>
            <div className="mt-4 grid gap-2">
              {LEAD_STATES.map((option) => (
                <label
                  key={option.id}
                  className="choice-option"
                >
                  <input
                    type="radio"
                    name="state"
                    value={option.id}
                    checked={form.state === option.id}
                    onChange={() => setForm((current) => ({ ...current, state: option.id }))}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
            {fieldErrors.state && (
              <p className="mt-2 text-sm text-red-800" role="alert">
                {fieldErrors.state}
              </p>
            )}
          </fieldset>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-ink">
              ZIP code <span className="font-normal text-slate-500">(optional)</span>
            </label>
            <input
              id="zipCode"
              name="zipCode"
              inputMode="numeric"
              autoComplete="postal-code"
              value={form.zipCode}
              onChange={(event) => setForm((current) => ({ ...current, zipCode: event.target.value }))}
              aria-describedby={fieldErrors.zipCode ? "zip-error" : undefined}
              className="field-input mt-2"
            />
            {fieldErrors.zipCode && (
              <p id="zip-error" className="mt-2 text-sm text-red-800" role="alert">
                {fieldErrors.zipCode}
              </p>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-6 space-y-6">
          <h2 className="text-xl font-semibold text-ink">A few details help us route your request</h2>
          {stepQuestions.map((question) => (
            <fieldset key={question.id}>
              <legend className="text-sm font-medium text-ink">{question.label}</legend>
              {question.type === "single" && (
                <div className="mt-3 grid gap-2">
                  {question.options?.map((option) => (
                    <label
                      key={option.id}
                      className="choice-option"
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option.id}
                        checked={form.answers[question.id] === option.id}
                        onChange={() =>
                          setForm((current) => ({
                            ...current,
                            answers: { ...current.answers, [question.id]: option.id },
                          }))
                        }
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              )}
              {question.type === "text" && (
                <textarea
                  name={question.id}
                  maxLength={question.maxLength}
                  placeholder={question.placeholder}
                  value={form.answers[question.id] ?? ""}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      answers: { ...current.answers, [question.id]: event.target.value },
                    }))
                  }
                  className="field-input mt-3 min-h-24 py-2"
                />
              )}
              {fieldErrors[`answers.${question.id}`] && (
                <p className="mt-2 text-sm text-red-800" role="alert">
                  {fieldErrors[`answers.${question.id}`]}
                </p>
              )}
            </fieldset>
          ))}
        </div>
      )}

      {step === 4 && (
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold text-ink">How should we reach you?</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-ink">
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                required
                value={form.firstName}
                onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))}
                className="field-input mt-2"
              />
              {fieldErrors.firstName && (
                <p className="mt-2 text-sm text-red-800" role="alert">
                  {fieldErrors.firstName}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-ink">
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                required
                value={form.lastName}
                onChange={(event) => setForm((current) => ({ ...current, lastName: event.target.value }))}
                className="field-input mt-2"
              />
              {fieldErrors.lastName && (
                <p className="mt-2 text-sm text-red-800" role="alert">
                  {fieldErrors.lastName}
                </p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              className="field-input mt-2"
            />
            {fieldErrors.email && (
              <p id="email-error" className="mt-2 text-sm text-red-800" role="alert">
                {fieldErrors.email}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-ink">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              className="field-input mt-2"
            />
            {fieldErrors.phone && (
              <p className="mt-2 text-sm text-red-800" role="alert">
                {fieldErrors.phone}
              </p>
            )}
          </div>
          <label className="sr-only-input" aria-hidden="true">
            Company website
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={form.website}
              onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))}
            />
          </label>
          <div>
            <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-600">
              <input
                type="checkbox"
                className="mt-1"
                checked={form.consent}
                onChange={(event) => setForm((current) => ({ ...current, consent: event.target.checked }))}
              />
              <span>
                By submitting this form, you agree that US Insurance Guide may use the information
                provided to respond to your request and, when appropriate, share it with a licensed
                insurance professional. See our{" "}
                <Link href="/privacy-policy/" className="underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            {fieldErrors.consent && (
              <p className="mt-2 text-sm text-red-800" role="alert">
                {fieldErrors.consent}
              </p>
            )}
          </div>
          <p className="text-xs leading-relaxed text-slate-500">
            US Insurance Guide does not sell insurance or provide quotes. Submitting this form does
            not create an insurance, legal, or advisory relationship.
          </p>
        </div>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        {step > 1 && (
          <button type="button" className="btn btn-secondary" onClick={() => goTo(step - 1)}>
            Back
          </button>
        )}
        {step < 4 ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (validateStep(step)) goTo(step + 1);
            }}
          >
            Continue
          </button>
        ) : (
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Sending request…" : "Submit request"}
          </button>
        )}
      </div>
    </form>
  );
}
