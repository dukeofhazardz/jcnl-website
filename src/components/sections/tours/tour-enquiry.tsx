import { EnquiryBand } from "@/components/sections/enquiry-band";

/** Closing band. Two real actions, both one tap away. */
export function TourEnquiry() {
  return (
    <EnquiryBand
      eyebrow="Start the trip"
      heading="Tell us where you are going."
      body="Call the travel desk or send a WhatsApp message with your dates. If you already know the product you want, say so: Tour360, TRAVELCredit, VISA-Assist247 or LESS 20.0."
      whatsappLabel="WhatsApp the travel desk"
      whatsappMessage="Hello JCNL, I would like to plan a trip. Product:"
      textTone="ink"
    />
  );
}
