"use client";

import { useSyncExternalStore } from "react";

/** Same breakpoint as Tailwind `lg` — the questions layout becomes two columns. */
const WIDE_QUERY = "(min-width: 1024px)";

function subscribeToWide(onStoreChange: () => void) {
  const media = window.matchMedia(WIDE_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

/**
 * True when the viewport can show the two-column questions layout.
 * Server snapshot is `true` so SSR matches the wide layout; CSS hides the
 * answer column below `lg` until this hook catches up on the client.
 */
export function useWideScreen(): boolean {
  return useSyncExternalStore(
    subscribeToWide,
    () => window.matchMedia(WIDE_QUERY).matches,
    () => true
  );
}
