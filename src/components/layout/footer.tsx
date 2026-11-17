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

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-ivory-50/10 bg-jungle-950 text-ivory-100">
      {/* The @ from the registered name, used once as a watermark. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[6vw] -top-[14vw] select-none font-display text-[42vw] leading-none text-ivory-50/[0.045] lg:text-[34vw]"
      >
        @
      </div>

      <Container className="relative">
        <div className="grid gap-14 py-section lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            {/* The footer ground is jungle-950 at every breakpoint. */}
            <Logo variant="cream" size="lg" />

            <p className="mt-8 max-w-[19ch] font-display text-[clamp(2rem,4.2vw,3.4rem)] leading-[0.95] tracking-[-0.035em] text-ivory-50">
              {taglineDisplay}
            </p>

            <p className="mt-6 max-w-[42ch] text-small text-ivory-100/65">
              Indigenous Nigerian, established {site.established}. Offices in
              Lagos and Abuja, serving private and public sector clients.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="text-micro font-semibold uppercase text-ivory-100/65">
              Explore
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-small lg:grid-cols-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block text-ivory-100/75 underline-offset-4 transition-colors duration-200 hover:text-saffron-300 hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-micro font-semibold uppercase text-ivory-100/65">
              Offices
            </h2>
            <ul className="mt-5 space-y-6">
              {offices.map((office) => (
                <li key={office.city}>
                  <p className="text-small font-semibold text-ivory-50">
                    {office.city}
                  </p>
                  <address className="mt-1.5 not-italic text-[0.8125rem] leading-relaxed text-ivory-100/65">
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
                    className="mt-2 inline-flex items-center gap-1 text-[0.8125rem] text-saffron-400 underline-offset-4 hover:underline"
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
            <h2 className="text-micro font-semibold uppercase text-ivory-100/65">
              Contact
            </h2>
            <ul className="mt-5 space-y-3.5 text-[0.8125rem]">
              <li>
                <a
                  href={contact.phone.href}
                  className="inline-flex items-start gap-2.5 text-ivory-100/75 transition-colors hover:text-saffron-300"
                >
                  <Phone
                    aria-hidden="true"
                    size={15}
                    strokeWidth={1.6}
                    className="mt-0.5 shrink-0 text-ivory-100/45"
                  />
                  {contact.phone.display}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-start gap-2.5 text-ivory-100/75 transition-colors hover:text-saffron-300"
                >
                  <MessageCircle
                    aria-hidden="true"
                    size={15}
                    strokeWidth={1.6}
                    className="mt-0.5 shrink-0 text-ivory-100/45"
                  />
                  {contact.whatsapp.display}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  href={contact.email.href}
                  className="inline-flex items-start gap-2.5 break-words text-ivory-100/75 transition-colors hover:text-saffron-300"
                >
                  <Mail
                    aria-hidden="true"
                    size={15}
                    strokeWidth={1.6}
                    className="mt-0.5 shrink-0 text-ivory-100/45"
                  />
                  {contact.email.display}
                </a>
              </li>
              <li className="pt-1">
                <p className="text-ivory-100/65">Cargo enquiries</p>
                <ul className="mt-1.5 space-y-1">
                  {contact.cargoEmails.map((email) => (
                    <li key={email}>
                      <a
                        href={mailHref(email)}
                        className="break-words text-ivory-100/75 underline-offset-4 transition-colors hover:text-saffron-300 hover:underline"
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
                    className="inline-flex items-center gap-1.5 text-ivory-100/75 transition-colors hover:text-saffron-300"
                  >
                    {social.label}
                    <span className="text-ivory-100/65">{social.handle}</span>
                    <ArrowUpRight aria-hidden="true" size={12} strokeWidth={1.75} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Extra bottom padding keeps the fixed WhatsApp button off the last line. */}
        <div className="border-t border-ivory-50/10 pb-24 pt-7 lg:pb-28">
          <div className="flex flex-col gap-3 text-[0.8125rem] text-ivory-100/60 lg:flex-row lg:items-baseline lg:justify-between">
            <p>© {copyrightRange} {site.name}.</p>
            <Link
              target="_blank"
              href="https://www.dukehouse.tech"
              className="underline-offset-4 transition-colors hover:text-saffron-300 hover:underline"
            >
              SITE BY DUKEHOUSE TECH.
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
