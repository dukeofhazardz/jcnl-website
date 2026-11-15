"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * True once the window has scrolled past `threshold`.
 *
 * useSyncExternalStore gives the correct value on the first client render, so a
 * reload mid-page does not flash the transparent header over a light section.
 * The server snapshot is always false.
 */
export function useScrolled(threshold: number): boolean {
  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener("scroll", onStoreChange, { passive: true });
    return () => window.removeEventListener("scroll", onStoreChange);
  }, []);

  const getSnapshot = useCallback(
    () => window.scrollY > threshold,
    [threshold],
  );

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
