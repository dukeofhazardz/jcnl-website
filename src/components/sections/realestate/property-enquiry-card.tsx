import { CalendarCheck, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ClientTodo } from "@/components/ui/client-todo";
import { contact } from "@/config/site";
import { realEstatePage } from "@/content/real-estate";
import {
  formatPropertyPrice,
  propertyContactHref,
  propertyWhatsappHref,
  type Property,
} from "@/content/properties";

const copy = realEstatePage.detail.enquiry;

/** Three real actions and the price. No form, no false urgency. */
export function PropertyEnquiryCard({ property }: { property: Property }) {
  return (
    <Card
      tone="raised"
      className="border border-line p-5 sm:p-6 lg:sticky lg:top-[calc(var(--header-h)+2rem)]"
    >
      <p className="text-micro font-semibold uppercase text-accent-text">
        {copy.eyebrow}
      </p>

      <p className="mt-3 font-display text-title leading-tight tracking-[-0.02em] text-ink-900">
        {formatPropertyPrice(property.price)}
      </p>

      {property.price === null ? (
        <p className="mt-2 text-small text-ink-500">{copy.priceNote}</p>
      ) : null}

      <div className="mt-6 grid gap-2.5">
        <Button
          href={propertyWhatsappHref(property)}
          external
          variant="primary"
          size="md"
          icon={<MessageCircle aria-hidden="true" size={17} strokeWidth={1.75} />}
          iconPosition="start"
          className="w-full"
        >
          {copy.whatsapp}
        </Button>

        <Button
          href={contact.phone.href}
          variant="ghost"
          size="md"
          icon={<Phone aria-hidden="true" size={17} strokeWidth={1.75} />}
          iconPosition="start"
          className="w-full border-ink-900/25 text-ink-900 hover:border-ink-900/60 hover:bg-ink-900/5"
        >
          {copy.call}
        </Button>

        <Button
          href={propertyContactHref(property.slug)}
          variant="ghost"
          size="md"
          icon={
            <CalendarCheck aria-hidden="true" size={17} strokeWidth={1.75} />
          }
          iconPosition="start"
          className="w-full border-ink-900/25 text-ink-900 hover:border-ink-900/60 hover:bg-ink-900/5"
        >
          {copy.viewing}
        </Button>
      </div>

      <p className="mt-5 border-t border-line pt-4 text-small text-ink-500">
        {copy.note}
      </p>

      {property.isPlaceholder ? (
        <div className="mt-5 rounded-sm border border-accent-text/25 bg-accent-soft/60 p-4">
          <ClientTodo>{copy.sampleTitle}</ClientTodo>
          <p className="mt-3 text-small text-ink-700">{copy.sampleBody}</p>
        </div>
      ) : null}
    </Card>
  );
}
