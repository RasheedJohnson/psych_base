"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribe to the URL hash. Next.js Link uses pushState, so hashchange may
 * not fire — also listen for hash-link clicks and re-read after the router
 * has had a tick to update location.
 */
function subscribeToHash(onStoreChange: () => void) {
  const onClick = (event: MouseEvent) => {
    const anchor = (event.target as Element | null)?.closest("a");
    if (!anchor?.getAttribute("href")?.includes("#")) {
      return;
    }
    window.setTimeout(onStoreChange, 0);
    window.setTimeout(onStoreChange, 50);
  };

  window.addEventListener("hashchange", onStoreChange);
  window.addEventListener("popstate", onStoreChange);
  document.addEventListener("click", onClick);

  return () => {
    window.removeEventListener("hashchange", onStoreChange);
    window.removeEventListener("popstate", onStoreChange);
    document.removeEventListener("click", onClick);
  };
}

function hashSnapshot(): string {
  return window.location.hash.replace(/^#/, "");
}

/** Current URL hash without `#`. Empty on the server. */
export function useHash(): string {
  return useSyncExternalStore(subscribeToHash, hashSnapshot, () => "");
}
