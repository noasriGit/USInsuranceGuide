"use server";

import { headers } from "next/headers";
import { submitLead, type SubmitLeadResult } from "@/lib/leads/submit";

export async function submitLeadAction(input: unknown): Promise<SubmitLeadResult> {
  const requestHeaders = await headers();
  const encoded = JSON.stringify(input ?? {});
  return submitLead(input, requestHeaders, new TextEncoder().encode(encoded).length);
}
