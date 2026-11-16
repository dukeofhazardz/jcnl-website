import { NextResponse } from "next/server";

/**
 * Contact and quote stub.
 *
 * Validates the payload, then returns an acknowledgement. There is no email
 * provider connected yet: replace the marked block with the provider call and
 * keep the same response shape, so the form does not change.
 */

type QuotePayload = {
  name: string;
  phone: string;
  origin: string;
  destination: string;
  cargoType: string;
  mode: "air" | "sea";
};

const MAX_LENGTHS: Record<keyof QuotePayload, number> = {
  name: 120,
  phone: 32,
  origin: 160,
  destination: 160,
  cargoType: 120,
  mode: 4,
};

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid-json" },
      { status: 400 },
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { ok: false, error: "invalid-body" },
      { status: 400 },
    );
  }

  const input = body as Record<string, unknown>;
  const data: QuotePayload = {
    name: asText(input.name),
    phone: asText(input.phone),
    origin: asText(input.origin),
    destination: asText(input.destination),
    cargoType: asText(input.cargoType),
    mode: asText(input.mode) === "sea" ? "sea" : "air",
  };

  const missing = (
    ["name", "phone", "origin", "destination", "cargoType"] as const
  ).filter((field) => data[field].length < 2);

  if (missing.length > 0) {
    return NextResponse.json(
      { ok: false, error: "missing-fields", fields: missing },
      { status: 422 },
    );
  }

  const tooLong = (Object.keys(MAX_LENGTHS) as (keyof QuotePayload)[]).filter(
    (field) => data[field].length > MAX_LENGTHS[field],
  );

  if (tooLong.length > 0) {
    return NextResponse.json(
      { ok: false, error: "field-too-long", fields: tooLong },
      { status: 422 },
    );
  }

  if (asText(input.mode) !== "air" && asText(input.mode) !== "sea") {
    return NextResponse.json(
      { ok: false, error: "missing-mode" },
      { status: 422 },
    );
  }

  // TODO: hand the request to an email provider, then remove this note.
  // Nothing is stored or logged with personal data until that exists.
  console.info("[contact] quote request accepted", { mode: data.mode });

  return NextResponse.json({ ok: true });
}
