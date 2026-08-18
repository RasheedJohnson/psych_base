/**
 * Chapter catalog derived from header rows in the current JSON files.
 *
 * Navbar still hardcodes two title arrays; later it can call getChapters()
 * instead. Do not treat subsection stubs ("CHAPTER - ", "Chapter 1 - 2:") as
 * catalog entries — those are in-chapter banners, not chapters.
 */

import definitionRows from "@/app/lib/new_test.json";
import questionRows from "@/app/lib/questions.json";
import type { Chapter, ChapterId } from "./types";

/** "CHAPTER 2: The Biology of Mind" → number + short title. */
const NUMBERED_DEFINITION_HEADING = /^chapter\s+(\d+)\s*:\s*(.+)$/i;

/** "CHAPTER Appendix: C" — unnumbered extra material at the end of the book. */
const APPENDIX_DEFINITION_HEADING = /^chapter\s+appendix:\s*(.+)$/i;

/** "Learning Objective Questions – Kapitel 01" (en dash or hyphen). */
const NUMBERED_QUESTION_HEADING =
  /^learning objective questions\s+[–-]\s+kapitel\s+(\d+)$/i;

/** "Prologue 00" — questions banner for chapter 0. */
const PROLOGUE_QUESTION_HEADING = /^prologue\s+\d+$/i;

function numberedId(n: number): ChapterId {
  return String(n);
}

function appendixId(label: string): ChapterId {
  return `appendix-${label.toLowerCase().replace(/\s+/g, "-")}`;
}

function emptyChapter(id: ChapterId, number: number | null, title: string): Chapter {
  return {
    id,
    number,
    title,
    definitionHeading: null,
    questionsHeading: null,
  };
}

/**
 * Build the catalog by merging main banners from both JSON files.
 * Definitions run first so numbered titles come from the textbook headings.
 */
export function getChapters(): Chapter[] {
  const byId = new Map<ChapterId, Chapter>();

  for (const row of definitionRows) {
    const numbered = row.title.match(NUMBERED_DEFINITION_HEADING);
    if (numbered) {
      const number = Number(numbered[1]);
      const id = numberedId(number);
      const chapter = byId.get(id) ?? emptyChapter(id, number, numbered[2].trim());
      chapter.title = numbered[2].trim();
      chapter.definitionHeading = row.title;
      byId.set(id, chapter);
      continue;
    }

    const appendix = row.title.match(APPENDIX_DEFINITION_HEADING);
    if (appendix) {
      const label = appendix[1].trim();
      const id = appendixId(label);
      const chapter = byId.get(id) ?? emptyChapter(id, null, `Appendix ${label}`);
      chapter.definitionHeading = row.title;
      byId.set(id, chapter);
    }
  }

  for (const row of questionRows) {
    if (row.title === "") continue;

    const numbered = row.title.match(NUMBERED_QUESTION_HEADING);
    if (numbered) {
      const number = Number(numbered[1]);
      const id = numberedId(number);
      const chapter = byId.get(id) ?? emptyChapter(id, number, `Chapter ${number}`);
      chapter.questionsHeading = row.title;
      byId.set(id, chapter);
      continue;
    }

    if (PROLOGUE_QUESTION_HEADING.test(row.title)) {
      const id = numberedId(0);
      const chapter = byId.get(id) ?? emptyChapter(id, 0, "Prologue");
      chapter.questionsHeading = row.title;
      byId.set(id, chapter);
    }
  }

  return [...byId.values()].sort(compareChapters);
}

/** Numbered chapters first (0, 1, …); unnumbered extras last. */
function compareChapters(a: Chapter, b: Chapter): number {
  if (a.number === null && b.number === null) return a.id.localeCompare(b.id);
  if (a.number === null) return 1;
  if (b.number === null) return -1;
  return a.number - b.number;
}
