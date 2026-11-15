import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GeometricPattern } from "@/components/ui/geometric-pattern";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { nav, whatsappHref } from "@/config/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  const links = nav.filter((item) => item.href !== "/");

  return (
    <div data-accent="brand">
      <section className="relative isolate flex min-h-[72svh] flex-col justify-end overflow-hidden bg-field pb-14 pt-[calc(var(--header-h)+4rem)] text-ivory-50">
        <GeometricPattern
          variant="lattice"
          className="absolute inset-0 -z-10 text-[var(--accent-soft)] opacity-[0.07]"
        />
        <Container>
          <Eyebrow tone="light">Error 404</Eyebrow>
          <Heading as="h1" size="display" className="mt-6 max-w-[16ch] text-ivory-50">
            This page is not here.
          </Heading>
          <p className="mt-6 max-w-[46ch] text-lead text-ivory-100/75">
            The address may have changed, or the page may still be in
            preparation. Everything on the site is one link away.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button
              href={whatsappHref()}
              external
              variant="primary"
              icon={<MessageCircle aria-hidden="true" size={17} strokeWidth={1.75} />}
              iconPosition="start"
            >
              WhatsApp us
            </Button>
            <Button href="/" variant="ghost" className="text-ivory-50">
              Back to home
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-ivory-50 py-section-sm">
        <Container>
          <h2 className="text-micro font-semibold uppercase text-ink-500">
            All pages
          </h2>
          <ul className="mt-6 grid gap-x-8 border-t border-ink-900/15 sm:grid-cols-2">
            {links.map((item) => (
              <li key={item.href} className="border-b border-ink-900/15">
                <Link
                  href={item.href}
                  className="group flex items-center justify-between gap-4 py-4 text-body text-ink-900 transition-colors duration-200 hover:text-accent-text"
                >
                  {item.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    size={16}
                    strokeWidth={1.6}
                    className="text-ink-500 transition-transform duration-200 ease-strong motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </div>
  );
}
