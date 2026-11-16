"use client";

import Link from "next/link";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

type ButtonVariant = "primary" | "dark" | "ghost" | "slate";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  /** Opens in a new tab with rel="noreferrer noopener". */
  external?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

const base =
  "group relative inline-flex select-none items-center justify-center gap-2.5 rounded-xs font-sans font-semibold leading-none transition-[background-color,color,border-color,box-shadow] duration-200 ease-strong active:scale-[0.975] motion-reduce:active:scale-100";

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-[0.8125rem]",
  md: "h-12 px-6 text-small",
  lg: "h-14 px-8 text-body",
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-saffron-500 text-ink-900 hover:bg-saffron-400 hover:shadow-soft",
  dark: "bg-jungle-950 text-ivory-50 hover:bg-jungle-800 hover:shadow-soft",
  /** Slate reads as the engineering page's own ink on the amber band. */
  slate: "bg-slate-900 text-ivory-50 hover:bg-slate-700 hover:shadow-soft",
  ghost:
    "border border-current/25 bg-transparent text-current hover:border-current/60",
};

/**
 * Press feedback is CSS (off the main thread). The magnetic pull is a small
 * spring on a wrapper, pointer-only and disabled under reduced motion, so the
 * button never fights the browser for the main thread.
 */
export function Button({
  variant = "primary",
  size = "md",
  href,
  external = false,
  fullWidth = false,
  icon,
  iconPosition = "end",
  className,
  children,
  type = "button",
  disabled,
  ...rest
}: ButtonProps) {
  const reduceMotion = usePrefersReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 340, damping: 26, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 340, damping: 26, mass: 0.4 });
  const transform = useMotionTemplate`translate3d(${x}px, ${y}px, 0)`;

  const classes = cn(
    base,
    sizes[size],
    variants[variant],
    fullWidth && "w-full",
    disabled && "pointer-events-none opacity-55",
    className,
  );

  // The rest props are shared between a button and an anchor; the element type
  // only changes the event-handler generics.
  const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;

  const content = (
    <>
      {icon && iconPosition === "start" ? (
        <span aria-hidden="true" className="shrink-0">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
      {icon && iconPosition === "end" ? (
        <span
          aria-hidden="true"
          className="shrink-0 transition-transform duration-200 ease-strong motion-safe:group-hover:translate-x-0.5"
        >
          {icon}
        </span>
      ) : null}
    </>
  );

  const magneticHandlers = reduceMotion
    ? {}
    : {
        onPointerMove: (event: React.PointerEvent<HTMLSpanElement>) => {
          if (event.pointerType !== "mouse") return;
          const rect = event.currentTarget.getBoundingClientRect();
          const offsetX = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
          const offsetY = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
          rawX.set(Math.max(-1, Math.min(1, offsetX)) * 5);
          rawY.set(Math.max(-1, Math.min(1, offsetY)) * 4);
        },
        onPointerLeave: () => {
          rawX.set(0);
          rawY.set(0);
        },
      };

  return (
    <motion.span
      className={cn("inline-flex align-middle", fullWidth && "w-full")}
      style={reduceMotion ? undefined : { transform }}
      {...magneticHandlers}
    >
      {href ? (
        external ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className={classes}
            {...anchorProps}
          >
            {content}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ) : (
          <Link href={href} className={classes} {...anchorProps}>
            {content}
          </Link>
        )
      ) : (
        <button
          type={type}
          disabled={disabled}
          className={classes}
          {...rest}
        >
          {content}
        </button>
      )}
    </motion.span>
  );
}
