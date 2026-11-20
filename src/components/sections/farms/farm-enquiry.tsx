import { EnquiryBand } from "@/components/sections/enquiry-band";

/** Closing band. The sky field carries ink text, so it uses the default tone. */
export function FarmEnquiry() {
  return (
    <EnquiryBand
      eyebrow="Talk to the farm team"
      heading="Ask about the farm."
      body="Call or send a WhatsApp message with your question about the farm at Idiagbon Village, Iju-Ota."
      whatsappLabel="WhatsApp about the farm"
      whatsappMessage="Hello JCNL, I would like to ask about the Integrated Fish and Livestock Farm at Idiagbon Village."
    />
  );
}
