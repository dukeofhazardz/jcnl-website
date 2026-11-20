import { Info } from "lucide-react";

import { CLIENT_TO_PROVIDE } from "@/content/engineering";
import { cn } from "@/lib/cn";

type ClientTodoTone = "light" | "dark";

const tones: Record<ClientTodoTone, string> = {
  /** On white, sky tint or the sky field. */
  light: "border-sky-700/45 bg-white/70 text-sky-800",
  /** On the deep ink band, where sky-700 would disappear. */
  dark: "border-sky-300/60 bg-sky-300/10 text-sky-300",
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
