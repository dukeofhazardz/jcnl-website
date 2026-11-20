import { Check } from "lucide-react";
import type { ReactNode } from "react";

import { ClientTodo } from "@/components/ui/client-todo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading } from "@/components/ui/typography";
import { realEstatePage } from "@/content/real-estate";
import {
  CLIENT_TO_PROVIDE,
  propertyLocationLabel,
  propertyStatusLabels,
  propertyTypeLabels,
  type Property,
} from "@/content/properties";
import { PropertyEnquiryCard } from "@/components/sections/realestate/property-enquiry-card";
import { PropertyGallery } from "@/components/sections/realestate/property-gallery";

const copy = realEstatePage.detail;

function SpecRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-ink-900/10 py-3">
      <dt className="text-micro uppercase text-ink-500">{label}</dt>
      <dd className="text-right text-small text-ink-900">{children}</dd>
    </div>
  );
}

/** Gallery, facts and prose on the left; the sticky enquiry card on the right. */
export function PropertyDetail({ property }: { property: Property }) {
  const location = propertyLocationLabel(property);
  const locationKnown = location !== CLIENT_TO_PROVIDE;
  const paragraphs = property.description
    .split(/\n{2,}/)
    .map((entry) => entry.trim())
    .filter(Boolean);

  return (
    <Section
      tone="white"
      topDivider="arch"
      spacing="md"
      labelledBy="property-about"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <h2 className="sr-only">{copy.galleryLabel}</h2>
            <PropertyGallery
              images={property.images}
              title={property.title}
            />

            <p className="mt-8 max-w-[62ch] text-lead text-ink-700">
              {property.summary}
            </p>

            <dl className="mt-8 grid gap-x-10 border-t border-ink-900/12 sm:grid-cols-2">
              <SpecRow label={copy.specs.type}>
                {propertyTypeLabels[property.type]}
              </SpecRow>
              <SpecRow label={copy.specs.status}>
                {propertyStatusLabels[property.status]}
              </SpecRow>
              <SpecRow label={copy.specs.location}>
                {locationKnown ? location : <ClientTodo />}
              </SpecRow>
              <SpecRow label={copy.specs.size}>
                {property.sizeSqm ? (
                  `${property.sizeSqm.toLocaleString("en-NG")} m²`
                ) : (
                  <ClientTodo />
                )}
              </SpecRow>
              {property.bedrooms !== undefined ? (
                <SpecRow label={copy.specs.bedrooms}>
                  {property.bedrooms}
                </SpecRow>
              ) : null}
              {property.bathrooms !== undefined ? (
                <SpecRow label={copy.specs.bathrooms}>
                  {property.bathrooms}
                </SpecRow>
              ) : null}
            </dl>

            <div className="mt-12">
              <Heading
                as="h2"
                size="lg"
                id="property-about"
                className="max-w-[24ch]"
              >
                {copy.aboutHeading}
              </Heading>

              <div className="mt-5 max-w-[64ch] space-y-4 text-body text-ink-700">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="mt-12 border-t border-ink-900/12 pt-8">
              <h2 className="font-display text-title text-ink-900">
                {copy.featuresHeading}
              </h2>

              {property.features.length > 0 ? (
                <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {property.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-small text-ink-700"
                    >
                      <Check
                        aria-hidden="true"
                        size={16}
                        strokeWidth={2}
                        className="mt-0.5 shrink-0 text-accent-text"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-4 rounded-sm border border-dashed border-ink-900/20 p-4">
                  <ClientTodo />
                  <p className="mt-2 text-small text-ink-500">
                    {copy.featuresEmpty}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-10 border-t border-ink-900/12 pt-6">
              <h2 className="text-micro font-semibold uppercase text-ink-500">
                {copy.titleDocumentLabel}
              </h2>
              <p className="mt-3 text-body text-ink-900">
                {property.titleDocument ?? (
                  <ClientTodo>{copy.titleDocumentEmpty}</ClientTodo>
                )}
              </p>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <PropertyEnquiryCard property={property} />
          </aside>
        </div>
      </Container>
    </Section>
  );
}
