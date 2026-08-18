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
