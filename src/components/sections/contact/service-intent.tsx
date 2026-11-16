"use client";

import { Info, Mail, MessageCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { contact, whatsappHref } from "@/config/site";
import {
  findBusinessIntent,
  serviceIntentCopy,
} from "@/content/business-services";

/**
 * Carries a subject from a page CTA into the contact page. The two Business
 * Services paths link to `/contact?service=…`; this reads that value and writes
 * it into the WhatsApp message and the email subject, so the visitor does not
 * have to repeat it. Any other value renders nothing.
 */
export function ServiceIntent() {
  const params = useSearchParams();
  const intent = findBusinessIntent(params.get("service"));

  if (!intent) return null;

  const mailto = `${contact.email.href}?subject=${encodeURIComponent(intent.label)}`;

  return (
    <div className="mb-8 border-l-2 border-accent bg-accent-soft/60 p-5">
      <p className="flex items-center gap-2 text-micro font-semibold uppercase text-accent-text">
        <Info aria-hidden="true" size={13} strokeWidth={2} className="shrink-0" />
        {serviceIntentCopy.eyebrow}
      </p>
      <p className="mt-2 font-display text-title leading-tight">
        {intent.label}
      </p>
      <p className="mt-2 max-w-[46ch] text-small text-ink-700">
        {serviceIntentCopy.body}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
        <a
          href={whatsappHref(intent.whatsappMessage)}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 text-small font-semibold text-accent-text underline-offset-4 hover-fine:underline"
        >
          <MessageCircle aria-hidden="true" size={15} strokeWidth={1.75} />
          {serviceIntentCopy.whatsapp}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a
          href={mailto}
          className="inline-flex items-center gap-1.5 text-small font-semibold text-accent-text underline-offset-4 hover-fine:underline"
        >
          <Mail aria-hidden="true" size={15} strokeWidth={1.75} />
          {serviceIntentCopy.email}
        </a>
      </div>
    </div>
  );
}
