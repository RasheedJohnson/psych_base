/**
 * Chapter catalog from lib/data/chapters.json.
 * Used by root layout → Navbar and both dashboards.
 */

import chapters from "@/lib/data/chapters.json";
import type { Chapter } from "./types";

/** All chapters, numbered first, extras last. */
export function getChapters(): Chapter[] {
  return chapters;
}

/** 00–16 for numbered chapters; C for unnumbered extras (appendix). */
export function chapterShortLabel(chapter: Chapter): string {
  if (chapter.number === null) {
    return "C";
  }
  return String(chapter.number).padStart(2, "0");
}

/** Catalog heading, e.g. "08 — Memory" or "C — Appendix C". */
export function chapterHeading(chapter: Chapter): string {
  return `${chapterShortLabel(chapter)} — ${chapter.title}`;
}

/** Hash is a chapter id, or the first chapter when the hash is empty/unknown. */
export function chapterIdFromHash(hash: string, catalog: Chapter[]): string {
  if (catalog.some((chapter) => chapter.id === hash)) {
    return hash;
  }
  return catalog[0]?.id ?? "";
}
