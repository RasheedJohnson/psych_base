"use client";

import { useEffect, useSyncExternalStore } from "react";

import { replaceLocationHash, useHash } from "@/hooks/use-hash";
import { resolveChapterId } from "@/lib/chapters";
import {
  readLastChapterId,
  subscribeLastChapter,
  writeLastChapterId,
} from "@/lib/last-chapter";
import type { Chapter } from "@/lib/types";

/**
 * Selected chapter: URL hash if it is a catalog id, else the last stored
 * chapter, else the first catalog entry. `useSyncExternalStore` keeps SSR
 * on the empty stored value so hydration matches; localStorage applies after.
 * Hash-less dashboard URLs get the stored id written back into the hash.
 */
export function useChapterId(catalog: Chapter[]): string {
  const hash = useHash();
  const stored = useSyncExternalStore(
    subscribeLastChapter,
    readLastChapterId,
    () => ""
  );
  const chapterId = resolveChapterId(hash, stored, catalog);

  // An explicit (valid) hash is the user's choice — remember it for later routes.
  useEffect(() => {
    if (catalog.some((chapter) => chapter.id === hash)) {
      writeLastChapterId(hash);
    }
  }, [hash, catalog]);

  // Typed / bookmarked / Home-picker URLs often have no hash; restore it.
  useEffect(() => {
    if (!chapterId) {
      return;
    }
    if (!window.location.pathname.startsWith("/dashboard")) {
      return;
    }
    if (hash === chapterId) {
      return;
    }
    replaceLocationHash(chapterId);
  }, [hash, chapterId]);

  return chapterId;
}
