import { NextResponse } from "next/server";

import {
  isContactEmail,
  isContactPhone,
  isContactService,
} from "@/content/contact";

/**
 * Contact and quote stub.
 *
 * Validates the payload, then returns an acknowledgement. There is no email
 * provider connected yet: replace the marked block with the provider call and
 * keep the same response shape, so neither form has to change.
 *
 * The contact form sends `form: "contact"`. Cargo quote requests omit it, so
 * the quote contract stays as it was.
 */

type QuotePayload = {
  name: string;
  phone: string;
  origin: string;
  destination: string;
  cargoType: string;
  mode: "air" | "sea";
};

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const QUOTE_MAX_LENGTHS: Record<keyof QuotePayload, number> = {
  name: 120,
  phone: 32,
  origin: 160,
  destination: 160,
  cargoType: 120,
  mode: 4,
};

const CONTACT_MAX_LENGTHS: Record<keyof ContactPayload, number> = {
  name: 120,
  email: 254,
  phone: 32,
  service: 40,
  message: 2000,
};

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function handleQuote(input: Record<string, unknown>) {
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

  const tooLong = (
    Object.keys(QUOTE_MAX_LENGTHS) as (keyof QuotePayload)[]
  ).filter((field) => data[field].length > QUOTE_MAX_LENGTHS[field]);

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

  // TODO: hand the quote to an email provider, then remove this note.
  // Nothing is stored or logged with personal data until that exists.
  console.info("[contact] quote request accepted", { mode: data.mode });

  return NextResponse.json({ ok: true });
}

function handleContact(input: Record<string, unknown>) {
  const data: ContactPayload = {
    name: asText(input.name),
    email: asText(input.email),
    phone: asText(input.phone),
    service: asText(input.service),
    message: asText(input.message),
  };

  const invalid = (
    ["name", "email", "phone", "service", "message"] as const
  ).filter((field) => {
    if (field === "email") return !isContactEmail(data.email);
    if (field === "phone") return !isContactPhone(data.phone);
    if (field === "service") return !isContactService(data.service);
    if (field === "message") return data.message.length < 10;
    return data.name.length < 2;
  });

  if (invalid.length > 0) {
    return NextResponse.json(
      { ok: false, error: "invalid-fields", fields: invalid },
      { status: 422 },
    );
  }

  const tooLong = (
    Object.keys(CONTACT_MAX_LENGTHS) as (keyof ContactPayload)[]
  ).filter((field) => data[field].length > CONTACT_MAX_LENGTHS[field]);

  if (tooLong.length > 0) {
    return NextResponse.json(
      { ok: false, error: "field-too-long", fields: tooLong },
      { status: 422 },
    );
  }

  // TODO: send the message with the email provider once it is chosen. Read
  // CONTACT_EMAIL_API_KEY, CONTACT_EMAIL_FROM and CONTACT_EMAIL_TO here, then
  // POST `data` to the provider. Until then, log only the routing value.
  console.info("[contact] message accepted", { service: data.service });

  return NextResponse.json({ ok: true });
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

  if (asText(input.form) === "contact") {
    return handleContact(input);
  }

  return handleQuote(input);
}
