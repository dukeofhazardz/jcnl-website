/**
 * Contact page content.
 *
 * Copy only. Addresses, phone numbers and email addresses come from
 * `src/config/site.ts`, because those are brand facts. Nothing here claims an
 * opening time, a response time or a coverage area that the client has not
 * supplied.
 */

export type ContactServiceValue =
  | "visa-and-tours"
  | "business-services"
  | "cargo-and-freight"
  | "integrated-farms"
  | "engineering"
  | "real-estate"
  | "other";

export type ContactServiceOption = {
  value: ContactServiceValue;
  label: string;
};

/** The service dropdown, in navigation order, with a catch-all last. */
export const contactServiceOptions: readonly ContactServiceOption[] = [
  { value: "visa-and-tours", label: "Visa & Tours" },
  { value: "business-services", label: "Business Services" },
  { value: "cargo-and-freight", label: "Cargo & Freight" },
  { value: "integrated-farms", label: "Integrated Farms" },
  { value: "engineering", label: "Engineering" },
  { value: "real-estate", label: "Real Estate" },
  { value: "other", label: "Other" },
] as const;

/**
 * Query values that may arrive from a link elsewhere on the site.
 *
 * The navigation slugs are the canonical values. Short page keys, the two
 * Business Services enquiry paths and a few plain words all resolve to the
 * closest option, so an older or hand-written link still preselects the right
 * row instead of failing silently.
 */
const serviceAliases: Readonly<Record<string, ContactServiceValue>> = {
  "visa-and-tours": "visa-and-tours",
  visa: "visa-and-tours",
  tours: "visa-and-tours",
  "business-services": "business-services",
  business: "business-services",
  "investment-collaboration": "business-services",
  "trade-finance": "business-services",
  "cargo-and-freight": "cargo-and-freight",
  cargo: "cargo-and-freight",
  freight: "cargo-and-freight",
  "integrated-farms": "integrated-farms",
  farms: "integrated-farms",
  farming: "integrated-farms",
  engineering: "engineering",
  "real-estate": "real-estate",
  realestate: "real-estate",
  property: "real-estate",
  properties: "real-estate",
  other: "other",
};

/** Resolve a `?service=` value to a dropdown value, or an empty string. */
export function resolveContactService(
  value: string | null,
): ContactServiceValue | "" {
  if (!value) return "";
  return serviceAliases[value.trim().toLowerCase()] ?? "";
}

/** Human label for a stored dropdown value. */
export function contactServiceLabel(value: string): string {
  return (
    contactServiceOptions.find((option) => option.value === value)?.label ?? ""
  );
}

export function isContactService(value: string): boolean {
  return contactServiceOptions.some((option) => option.value === value);
}

/** Shared by the form and the route, so both accept the same addresses. */
export function isContactEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

/** Shared by the form and the route. Seven digits is the floor. */
export function isContactPhone(value: string): boolean {
  const phone = value.trim();
  return (
    /^[+()\d\s-]{7,24}$/.test(phone) &&
    phone.replace(/\D/g, "").length >= 7
  );
}

export const contactPage = {
  offices: {
    eyebrow: "Offices",
    heading: "Abuja and Lagos.",
    intro:
      "Walk in, or send a message first. Both offices use the same phone, WhatsApp and email.",
    mapsLabel: "Open in Maps",
  },

  channels: {
    eyebrow: "Direct lines",
    heading: "Call, WhatsApp or email.",
    intro:
      "The team answers the phone and WhatsApp from both offices. Cargo enquiries have two addresses of their own.",
    labels: {
      call: "Call",
      whatsapp: "WhatsApp",
      email: "Email",
      cargo: "Cargo enquiries",
    },
    notes: {
      call: "The office line.",
      whatsapp: "Opens WhatsApp with a message ready to send.",
      email: "For documents and longer detail.",
      social: "The company account.",
      cargo: "Cargo and freight go to either address.",
    },
  },

  form: {
    eyebrow: "Message",
    heading: "Tell us what you need.",
    body: "Leave a name, a way to reply and the service this is about. The team reads it and answers on the channel you choose.",
    note: "All fields are required. We use your details to answer this message.",
    fields: {
      name: {
        label: "Name",
        placeholder: "Your full name",
      },
      email: {
        label: "Email",
        placeholder: "you@example.com",
      },
      phone: {
        label: "Phone",
        placeholder: "+234 800 000 0000",
      },
      service: {
        label: "Service of interest",
        placeholder: "Choose a service",
      },
      message: {
        label: "Message",
        placeholder:
          "The route, the project or the question. Add the detail that helps.",
      },
    },
    validation: {
      name: "Enter your name.",
      email: "Enter an email address we can reply to.",
      phone: "Enter a phone number we can call.",
      service: "Choose the service this is about.",
      message: "Add a line about what you need.",
    },
    legend: "Contact details",
    preselected: "Service chosen from the page you came from.",
    submit: "Send message",
    submitting: "Sending…",
    whatsapp: "Send on WhatsApp",
    announcement: "Sending your message.",
    invalidAnnouncement: "Check the fields marked below.",
    success: {
      heading: "Message received.",
      body: "Thank you. The team will reply on the details you gave. If it is urgent, call or WhatsApp.",
      whatsapp: "Send the same details on WhatsApp",
      reset: "Send another message",
    },
    error: "That did not send. Try again, or send the same details on WhatsApp.",
  },

  whatsapp: {
    eyebrow: "Fastest route",
    heading: "Chat on WhatsApp.",
    body: "One tap opens the conversation. The team reads it on the same number that takes calls.",
    button: "Chat on WhatsApp",
    callLead: "Prefer to call?",
    note: "Opens WhatsApp in a new tab.",
  },

  tagline: {
    eyebrow: "JCNL",
    lead: "Two offices. One team.",
    support: "Abuja and Lagos, Nigeria. Established 2003.",
  },
} as const;
