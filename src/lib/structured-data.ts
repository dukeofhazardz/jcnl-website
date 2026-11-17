import { contact, offices, site, socials } from "@/config/site";

/**
 * Organization structured data. Only facts from the brief: name, founding year,
 * two offices, published channels. No ratings, awards or client claims.
 */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: new URL(site.logo.black.src, site.url).toString(),
    slogan: site.tagline,
    foundingDate: String(site.established),
    description: site.description,
    telephone: contact.phone.display,
    email: contact.email.display,
    address: offices.map((office) => ({
      "@type": "PostalAddress",
      streetAddress: office.lines.slice(0, 2).join(", "),
      addressLocality: office.city,
      addressCountry: "NG",
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        name: "Main line",
        telephone: contact.phone.display,
        email: contact.email.display,
        areaServed: "NG",
        availableLanguage: ["en"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        name: "WhatsApp and calls",
        telephone: contact.whatsapp.display,
        areaServed: "NG",
        availableLanguage: ["en"],
      },
    ],
    sameAs: socials.map((social) => social.href),
  };
}

/** Serialise JSON-LD for a <script> tag without allowing a closing tag break. */
export function jsonLdString(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
