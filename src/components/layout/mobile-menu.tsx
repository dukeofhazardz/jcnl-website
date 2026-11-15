"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Phone, Mail, MessageCircle, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

import { nav, contact, whatsappHref } from "@/config/site";
import { cn } from "@/lib/cn";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  // Lock scroll and move focus into the panel. Restore both on close.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  // Escape to close, Tab cycles inside the panel.
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      ref={panelRef}
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduceMotion ? undefined : { opacity: 0 }}
      transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
      className="fixed inset-0 z-[70] flex flex-col overflow-y-auto overscroll-contain bg-jungle-950 text-ivory-50"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(135deg,transparent_0_38px,var(--color-ivory-50)_38px_39px)]"
      />

      <div className="relative flex items-center justify-between px-gutter pt-5">
        <div className="flex flex-col">
          <span className="font-display text-[1.55rem] leading-none tracking-[-0.03em] text-ivory-50">
            JCNL
          </span>
          <span className="mt-1.5 text-[8px] uppercase tracking-[0.18em] text-ivory-100/55">
            A Logistics &amp; Business Services Company
          </span>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xs border border-ivory-50/20 text-ivory-50 transition-colors duration-200 ease-strong hover:border-ivory-50/50 hover:bg-ivory-50/5"
        >
          <X aria-hidden="true" size={20} strokeWidth={1.5} />
        </button>
      </div>

      <nav aria-label="Primary" className="relative mt-8 flex-1 px-gutter">
        <ul>
          {nav.map((item, index) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <motion.li
                key={item.href}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.4,
                        delay: 0.04 + index * 0.035,
                        ease: [0.16, 1, 0.3, 1],
                      }
                }
                className="border-b border-ivory-50/10"
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group flex items-baseline justify-between gap-4 py-4",
                    active ? "text-saffron-300" : "text-ivory-50",
                  )}
                >
                  <span className="font-display text-[clamp(1.7rem,6.5vw,2.4rem)] leading-none tracking-[-0.03em]">
                    {item.label}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    size={18}
                    strokeWidth={1.5}
                    className="shrink-0 translate-y-[-0.15em] text-ivory-100/40 transition-transform duration-200 ease-strong group-hover:translate-x-0.5 group-hover:-translate-y-[0.2em]"
                  />
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      <div className="relative mt-10 border-t border-ivory-50/10 px-gutter py-6">
        <p className="text-micro uppercase text-ivory-100/65">Talk to us</p>
        <ul className="mt-4 grid gap-3 text-small">
          <li>
            <a
              href={contact.phone.href}
              className="inline-flex items-center gap-3 text-ivory-100/85 transition-colors hover:text-saffron-300"
            >
              <Phone aria-hidden="true" size={16} strokeWidth={1.5} />
              {contact.phone.display}
            </a>
          </li>
          <li>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-3 text-ivory-100/85 transition-colors hover:text-saffron-300"
            >
              <MessageCircle aria-hidden="true" size={16} strokeWidth={1.5} />
              WhatsApp {contact.whatsapp.display}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a
              href={contact.email.href}
              className="inline-flex items-center gap-3 text-ivory-100/85 transition-colors hover:text-saffron-300"
            >
              <Mail aria-hidden="true" size={16} strokeWidth={1.5} />
              {contact.email.display}
            </a>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
