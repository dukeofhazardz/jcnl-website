import { Info } from "lucide-react";

import { CLIENT_TO_PROVIDE } from "@/content/engineering";
import { cn } from "@/lib/cn";

type ClientTodoTone = "light" | "dark";

const tones: Record<ClientTodoTone, string> = {
  /** On ivory, sand or the amber band. */
  light: "border-accent-text/45 bg-accent-soft/70 text-accent-text",
  /** On the slate band, where accent-text would disappear. */
  dark: "border-[var(--accent)]/60 bg-[var(--accent)]/10 text-[var(--accent)]",
};

/**
 * A visible marker for a fact the client still has to supply. It is rendered as
 * literal bracketed text so it reads correctly in a screen reader and in print,
 * and so nobody mistakes a placeholder for finished copy.
 */
export function ClientTodo({
  children,
  tone = "light",
  className,
}: {
  /** What is missing, e.g. "Scope and package". Falls back to the bare mark. */
  children?: string;
  tone?: ClientTodoTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-xs border border-dashed px-2 py-1 text-micro font-semibold uppercase",
        tones[tone],
        className,
      )}
    >
      <Info aria-hidden="true" size={12} strokeWidth={2} className="shrink-0" />
      <span className="min-w-0">
        {CLIENT_TO_PROVIDE}
        {children ? <span className="font-normal"> · {children}</span> : null}
      </span>
    </span>
  );
}
