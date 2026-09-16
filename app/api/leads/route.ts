import { NextResponse } from "next/server";
import { submitLead } from "@/lib/leads/submit";

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "The request body must be JSON." },
      { status: 400 },
    );
  }

  const encoded = JSON.stringify(payload ?? {});
  const result = await submitLead(
    payload,
    request.headers,
    contentLength || new TextEncoder().encode(encoded).length,
  );

  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
