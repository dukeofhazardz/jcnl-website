"use client";

import { useSyncExternalStore } from "react";

function subscribe(onStoreChange: () => void) {
  document.addEventListener("visibilitychange", onStoreChange);
  return () => document.removeEventListener("visibilitychange", onStoreChange);
}

function getSnapshot() {
  return document.visibilityState === "hidden";
}

/**
 * True while the tab is in the background.
 *
 * useSyncExternalStore keeps the server snapshot (`false`) during hydration, so
 * markup never differs between server and client. The carousel uses it to stop
 * its timer while nobody is looking.
 */
export function useDocumentHidden(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
