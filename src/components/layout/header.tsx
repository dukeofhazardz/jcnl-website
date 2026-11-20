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
  const scrolled = useScrolled(16);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] h-[var(--header-h)] border-b bg-white transition-[border-color,box-shadow] duration-300 ease-strong",
          scrolled
            ? "border-line shadow-soft"
            : "border-line/60 shadow-none",
        )}
      >
        <div className="page-container flex h-full items-center justify-between gap-3 lg:gap-4">
          <Logo size="md" priority />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-0">
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
                        "group relative inline-flex px-1.5 py-2 text-[0.72rem] font-medium text-ink-700 transition-colors duration-200 hover:text-ink-950 xl:px-2 xl:text-[0.78rem] 2xl:px-2.5 2xl:text-[0.8125rem]",
                        active && "text-ink-950",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-1.5 -bottom-px h-[2px] origin-left bg-sky-500 transition-transform duration-300 ease-strong xl:inset-x-2 2xl:inset-x-2.5",
                          active
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                      {active ? (
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-px left-1.5 h-[2px] w-2 bg-red-500 xl:left-2 2xl:left-2.5"
                        />
                      ) : null}
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
              className="hidden xl:inline-flex"
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
              className="inline-flex h-11 w-11 items-center justify-center rounded-xs bg-sky-700 text-white transition-colors duration-200 hover:bg-sky-800 xl:hidden"
            >
              <MessageCircle aria-hidden="true" size={18} strokeWidth={1.75} />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              aria-label="Open menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xs border border-ink-950/15 text-ink-900 transition-colors duration-200 hover:border-sky-700/60 hover:bg-sky-50 lg:hidden"
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
