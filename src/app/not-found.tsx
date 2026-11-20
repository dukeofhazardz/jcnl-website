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
    <div>
      <section className="relative isolate flex min-h-[62svh] flex-col justify-end overflow-hidden border-b border-line bg-white pb-14 pt-16">
        <GeometricPattern
          variant="lattice"
          className="absolute inset-0 -z-10 text-sky-500 opacity-[0.07]"
        />
        <Container>
          <Eyebrow>Error 404</Eyebrow>
          <Heading as="h1" size="display" className="mt-6 max-w-[16ch] text-ink-950">
            This page is not here.
          </Heading>
          <p className="mt-6 max-w-[46ch] text-lead text-ink-700">
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
            <Button href="/" variant="ghost">
              Back to home
            </Button>
          </div>
        </Container>
      </section>

      <section className="bg-white py-section-sm">
        <Container>
          <h2 className="text-micro font-semibold uppercase text-ink-500">
            All pages
          </h2>
          <ul className="mt-6 grid gap-x-8 border-t border-ink-950/15 sm:grid-cols-2">
            {links.map((item) => (
              <li key={item.href} className="border-b border-ink-950/15">
                <Link
                  href={item.href}
                  className="group flex items-center justify-between gap-4 py-4 text-body text-ink-950 transition-colors duration-200 hover:text-sky-700"
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
