/**
 * Cargo & Freight page content.
 *
 * Every claim below comes from the client brief: the newly inaugurated Dry and
 * Wet Cargo Freight and Forwarding platform, its self-sustaining operation,
 * delivery by air and by sea or water through partner collaborations, and
 * parcel and cargo management with orders placed on request and delivered to
 * the destination the customer specifies. No volumes, transit times, ports,
 * certifications or clients are stated, because none have been supplied.
 */

export const freightPlatform = {
  eyebrow: "The platform",
  heading: "Dry and wet cargo, through one platform.",
  paragraphs: [
    "JCNL has inaugurated a Dry and Wet Cargo Freight and Forwarding platform. It handles both kinds of cargo and forwards them to the destination the customer names.",
    "The platform is self-sustaining, so customers can do business at their leisure. Delivery runs by air and by sea or water, through strong partner collaborations.",
  ],
  traits: [
    {
      label: "New",
      body: "A Dry and Wet Cargo Freight and Forwarding platform, inaugurated by JCNL.",
    },
    {
      label: "Self-sustaining",
      body: "Business runs at the customer's pace, not against a counter.",
    },
    {
      label: "Partner-led",
      body: "Air, sea and water delivery through partner collaborations.",
    },
  ],
} as const;

export type FreightModeId = "air" | "sea";

export type FreightMode = {
  id: FreightModeId;
  label: string;
  body: string;
  tags: readonly string[];
};

export const freightModes = {
  eyebrow: "Two ways to move",
  heading: "By air, or by sea and water.",
  intro:
    "Both routes use partner collaborations. The same desk takes the order and follows it to the destination you specify.",
  items: [
    {
      id: "air",
      label: "Air",
      body: "Delivery by air, through strong partner collaborations. The cargo desk takes the order and the goods move to the destination you specify.",
      tags: ["Orders on request"],
    },
    {
      id: "sea",
      label: "Sea and water",
      body: "Delivery by sea and water, through the same partner collaborations. The cargo desk follows the shipment to the destination you specify.",
      tags: ["Dry and wet cargo"],
    },
  ] satisfies readonly FreightMode[],
} as const;

export const freightSteps = {
  eyebrow: "How it moves",
  heading: "Request, collect, move, deliver.",
  intro: "Four steps from the request to the destination.",
  items: [
    {
      title: "Request",
      body: "The cargo desk takes the order.",
    },
    {
      title: "Collect",
      body: "The cargo desk takes the goods in hand.",
    },
    {
      title: "Move",
      body: "Air, sea or water, through partner collaborations.",
    },
    {
      title: "Deliver",
      body: "To the destination the customer specified.",
    },
  ],
} as const;

export const freightContact = {
  eyebrow: "The cargo desk",
  heading: "Call, WhatsApp or email.",
  body: "Reach the cargo desk directly. Cargo enquiries go to both addresses below.",
} as const;

export const freightQuote = {
  eyebrow: "Request a quote",
  heading: "Tell us what is moving.",
  body: "Give the route, the cargo and the mode. The cargo desk takes it from there.",
  success:
    "Request received. If you need an answer sooner, call or WhatsApp the cargo desk.",
  error:
    "That did not send. Try again, or send the same details on WhatsApp.",
} as const;
