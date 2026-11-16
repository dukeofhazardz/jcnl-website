"use client";

import { AnimatePresence, motion } from "motion/react";
import { MessageCircle } from "lucide-react";

import { whatsappHref } from "@/config/site";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { useScrolled } from "@/lib/use-scrolled";

/**
 * Persistent WhatsApp hand-off. Appears once the visitor has moved past the
 * first screen so it never competes with the hero.
 */
export function WhatsAppFab() {
  const visible = useScrolled(420);
  const reduceMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 0.95, y: 6 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-5 z-50"
        >
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Chat with JCNL on WhatsApp (opens in a new tab)"
            className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-cta-600 text-ivory-50 shadow-float transition-[background-color,transform] duration-200 ease-strong hover:bg-cta-500 active:scale-[0.96] motion-reduce:active:scale-100"
          >
            <MessageCircle aria-hidden="true" size={24} strokeWidth={1.6} />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-xs bg-ivory-50 px-3 py-2 text-[0.8125rem] font-medium text-ink-900 opacity-0 shadow-float transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:block"
            >
              WhatsApp us
            </span>
          </a>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
