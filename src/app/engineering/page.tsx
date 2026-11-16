import type { Metadata } from "next";

import { StubPage } from "@/components/sections/stub-page";

export const metadata: Metadata = {
  title: "Engineering",
  description:
    "Civil engineering works and construction, delivered as part of the JCNL service range.",
  alternates: { canonical: "/engineering" },
};

export default function EngineeringPage() {
  return <StubPage page="engineering" />;
}
