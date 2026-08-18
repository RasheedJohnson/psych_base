"use client";

import { useSyncExternalStore } from "react";

/** Fired after replaceState so hash subscribers re-read without a hashchange. */
const HASH_SYNC_EVENT = "psychbase:hash-sync";

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
  window.addEventListener(HASH_SYNC_EVENT, onStoreChange);
  document.addEventListener("click", onClick);

  return () => {
    window.removeEventListener("hashchange", onStoreChange);
    window.removeEventListener("popstate", onStoreChange);
    window.removeEventListener(HASH_SYNC_EVENT, onStoreChange);
    document.removeEventListener("click", onClick);
  };
}

/**
 * Put a chapter id in the hash without a new history entry. Used when a
 * dashboard URL has no hash but we already know the last selected chapter.
 */
export function replaceLocationHash(chapterId: string) {
  if (!chapterId) {
    return;
  }
  const current = window.location.hash.replace(/^#/, "");
  if (current === chapterId) {
    return;
  }
  const url = `${window.location.pathname}${window.location.search}#${chapterId}`;
  window.history.replaceState(window.history.state, "", url);
  window.dispatchEvent(new Event(HASH_SYNC_EVENT));
}

function hashSnapshot(): string {
  return window.location.hash.replace(/^#/, "");
}

/** Current URL hash without `#`. Empty on the server. */
export function useHash(): string {
  return useSyncExternalStore(subscribeToHash, hashSnapshot, () => "");
}
