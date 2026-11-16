import type { Metadata } from "next";

import { StubPage } from "@/components/sections/stub-page";

export const metadata: Metadata = {
  title: "Cargo & Freight",
  description:
    "Cargo and freight enquiries. Send them to the dedicated JCNL cargo addresses, or call the office and speak to the team.",
  alternates: { canonical: "/cargo-and-freight" },
};

export default function CargoAndFreightPage() {
  return <StubPage page="freight" />;
}
