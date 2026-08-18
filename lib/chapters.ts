/**
 * Chapter catalog from lib/data/chapters.json.
 *
 * Navbar still hardcodes two title arrays; later it can call getChapters()
 * instead of those lists.
 */

import chapters from "@/lib/data/chapters.json";
import type { Chapter } from "./types";

/** All chapters, numbered first, extras last. */
export function getChapters(): Chapter[] {
  return chapters;
}
