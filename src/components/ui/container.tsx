import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type ContainerWidth = "default" | "narrow" | "prose" | "full";

const widths: Record<ContainerWidth, string> = {
  default: "max-w-[var(--page-max)]",
  narrow: "max-w-[56rem]",
  prose: "max-w-[68ch]",
  full: "max-w-none",
};

export function Container({
  children,
  className,
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: ContainerWidth;
}) {
  return (
    <div className={cn("mx-auto w-full px-gutter", widths[width], className)}>
      {children}
    </div>
  );
}
