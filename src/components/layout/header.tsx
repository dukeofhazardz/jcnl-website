"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "motion/react";
import { Menu, MessageCircle } from "lucide-react";
import { useCallback, useState } from "react";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/Logo";
import { nav, whatsappHref } from "@/config/site";
import { cn } from "@/lib/cn";
import { useScrolled } from "@/lib/use-scrolled";

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled(24);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] h-[var(--header-h)] transition-[background-color,color,box-shadow] duration-300 ease-strong",
          solid
            ? "bg-ivory-50/92 text-ink-900 shadow-[0_1px_0_rgb(21_19_15_/_0.09)] backdrop-blur-md"
            : "bg-transparent text-ivory-50",
        )}
      >
        {/* Legibility scrim, only while the header sits over a hero. */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 transition-opacity duration-300",
            "bg-linear-to-b from-ink-900/45 to-transparent",
            solid ? "opacity-0" : "opacity-100",
          )}
        />

        <div className="page-container flex h-full items-center justify-between gap-4">
          {/* One link, two stacked images. The cream mark shows over the hero
              and the black mark fades in once the ivory header turns solid. */}
          <Logo
            variant={solid ? "black" : "cream"}
            size="md"
            crossfade
            priority
          />

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {nav.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "group relative inline-flex px-2.5 py-2 text-[0.8125rem] font-medium transition-colors duration-200",
                        active ? "" : "hover:opacity-100 opacity-85",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-2.5 -bottom-px h-px origin-left bg-current transition-transform duration-300 ease-strong",
                          active
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              href={whatsappHref()}
              external
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
              icon={<MessageCircle aria-hidden="true" size={16} strokeWidth={1.75} />}
              iconPosition="start"
            >
              WhatsApp us
            </Button>

            <a
              href={whatsappHref()}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Chat with JCNL on WhatsApp (opens in a new tab)"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xs bg-saffron-500 text-ink-900 transition-colors duration-200 hover:bg-saffron-400 sm:hidden"
            >
              <MessageCircle aria-hidden="true" size={18} strokeWidth={1.75} />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label="Open menu"
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-xs border transition-colors duration-200 xl:hidden",
                solid
                  ? "border-ink-900/20 text-ink-900 hover:border-ink-900/50 hover:bg-ink-900/5"
                  : "border-ivory-50/25 text-ivory-50 hover:border-ivory-50/60 hover:bg-ivory-50/10",
              )}
            >
              <Menu aria-hidden="true" size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>{menuOpen ? <MobileMenu onClose={closeMenu} /> : null}</AnimatePresence>
    </>
  );
}
