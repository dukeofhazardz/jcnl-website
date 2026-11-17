import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { site } from "@/config/site";
import { siteImages } from "@/content/images";
import { defaultTitle } from "@/lib/metadata";
import { jsonLdString, organizationJsonLd } from "@/lib/structured-data";

import "./globals.css";

/**
 * Fraunces carries the headlines: a variable serif with enough character to
 * feel authored rather than default. Hanken Grotesk does the reading.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK"],
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s — ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "JCNL",
    "JESRUDEB@CONNECT NIGERIA LIMITED",
    "logistics Nigeria",
    "business services Lagos",
    "cargo and freight Nigeria",
    "integrated farms Nigeria",
    "civil engineering Nigeria",
    "visa and tours Nigeria",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_NG",
    url: site.url,
    title: defaultTitle,
    description: site.description,
    images: [
      {
        url: siteImages.socialCard.src,
        width: siteImages.socialCard.width,
        height: siteImages.socialCard.height,
        alt: siteImages.socialCard.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
    images: [siteImages.socialCard.src],
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf7ee",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-NG" className={`${fraunces.variable} ${hanken.variable}`}>
      <body className="flex min-h-svh flex-col bg-surface text-ink">
        {/* Scroll reveals start transparent. Without JS they must be readable. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <div aria-hidden="true" className="grain-overlay" />

        <Header />

        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>

        <Footer />
        <WhatsAppFab />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(organizationJsonLd()) }}
        />
      </body>
    </html>
  );
}
