import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/Logo";
import {
  contact,
  copyrightRange,
  mailHref,
  mapsHref,
  nav,
  offices,
  site,
  socials,
  taglineDisplay,
  whatsappHref,
} from "@/config/site";

/** Small gold rule above a column label: the only gold in the footer. */
function FooterHeading({ children }: { children: string }) {
  return (
    <h2 className="flex items-center gap-2.5 text-micro font-semibold uppercase text-ink-500">
      <span aria-hidden="true" className="h-px w-4 bg-gold-400" />
      {children}
    </h2>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-line bg-white text-ink-900">
      {/* The @ from the registered name, used once as a watermark. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[6vw] -top-[14vw] select-none font-display text-[42vw] leading-none text-sky-500/[0.05] lg:text-[34vw]"
      >
        @
      </div>

      <Container className="relative">
        <div className="grid gap-14 py-section lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            {/* White ground at every breakpoint: the logo carries a fine white
                glow and must never sit on a tint. */}
            <Logo size="lg" />

            <p className="mt-8 max-w-[19ch] font-display text-[clamp(2rem,4.2vw,3.4rem)] leading-[0.95] tracking-[-0.035em] text-ink-950">
              {taglineDisplay}
            </p>

            <p className="mt-6 max-w-[42ch] text-small text-ink-500">
              Indigenous Nigerian, established {site.established}. Offices in
              Lagos and Abuja, serving private and public sector clients.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <FooterHeading>Explore</FooterHeading>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-small lg:grid-cols-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block text-ink-700 underline-offset-4 transition-colors duration-200 hover:text-sky-700 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <FooterHeading>Offices</FooterHeading>
            <ul className="mt-5 space-y-6">
              {offices.map((office) => (
                <li key={office.city}>
                  <p className="text-small font-semibold text-ink-950">
                    {office.city}
                  </p>
                  <address className="mt-1.5 not-italic text-[0.8125rem] leading-relaxed text-ink-500">
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <a
                    href={mapsHref(office.query)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-2 inline-flex items-center gap-1 text-[0.8125rem] text-sky-700 underline-offset-4 hover:underline"
                  >
                    Directions
                    <ArrowUpRight aria-hidden="true" size={13} strokeWidth={1.75} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <FooterHeading>Contact</FooterHeading>
            <ul className="mt-5 space-y-3.5 text-[0.8125rem]">
              <li>
                <a
                  href={contact.phone.href}
                  className="inline-flex items-start gap-2.5 text-ink-700 transition-colors hover:text-sky-700"
                >
                  <Phone
                    aria-hidden="true"
                    size={15}
                    strokeWidth={1.6}
                    className="mt-0.5 shrink-0 text-ink-500"
                  />
                  {contact.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-start gap-2.5 text-ink-700 transition-colors hover:text-sky-700"
                >
                  <MessageCircle
                    aria-hidden="true"
                    size={15}
                    strokeWidth={1.6}
                    className="mt-0.5 shrink-0 text-ink-500"
                  />
                  {contact.whatsapp.display}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.email.href}
                  className="inline-flex items-start gap-2.5 break-words text-ink-700 transition-colors hover:text-sky-700"
                >
                  <Mail
                    aria-hidden="true"
                    size={15}
                    strokeWidth={1.6}
                    className="mt-0.5 shrink-0 text-ink-500"
                  />
                  {contact.email.display}
                </a>
              </li>
              <li className="pt-1">
                <p className="text-ink-500">Cargo enquiries</p>
                <ul className="mt-1.5 space-y-1">
                  {contact.cargoEmails.map((email) => (
                    <li key={email}>
                      <a
                        href={mailHref(email)}
                        className="break-words text-ink-700 underline-offset-4 transition-colors hover:text-sky-700 hover:underline"
                      >
                        {email}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            <ul className="mt-6 flex items-center gap-4 text-[0.8125rem]">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-1.5 text-ink-700 transition-colors hover:text-sky-700"
                  >
                    {social.label}
                    <span className="text-ink-500">{social.handle}</span>
                    <ArrowUpRight aria-hidden="true" size={12} strokeWidth={1.75} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Extra bottom padding keeps the fixed WhatsApp button off the last line. */}
        <div className="border-t border-line pb-24 pt-7 lg:pb-28">
          <div className="flex flex-col gap-3 text-[0.8125rem] text-ink-500 lg:flex-row lg:items-baseline lg:justify-between">
            <p>
              © {copyrightRange} {site.name}. {site.registration}.
            </p>
            <Link
              target="_blank"
              href="https://www.dukehouse.tech"
              className="underline-offset-4 transition-colors hover:text-sky-700 hover:underline"
            >
              SITE BY DUKEHOUSE TECH.
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
