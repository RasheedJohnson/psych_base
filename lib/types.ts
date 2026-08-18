/**
 * Clean content schema for the app.
 *
 * The on-disk JSON still mixes chapter-header rows into the same arrays as
 * cards. Helpers in this folder strip those rows and map into these types.
 * Pages are not wired to this schema yet.
 */

/** Stable id: "0"–"16" for numbered chapters, slug for extras (e.g. appendix). */
export type ChapterId = string;

/** One textbook chapter. Headings are the exact JSON title strings used as hash ids. */
export type Chapter = {
  id: ChapterId;
  /** 0–16 for numbered chapters; null for unnumbered material (appendix). */
  number: number | null;
  /** Short name, e.g. "Memory" or "Appendix C". */
  title: string;
  /** Home-page hash target from new_test.json, if that file has a main banner. */
  definitionHeading: string | null;
  /** /questions hash target from questions.json, if that file has a banner. */
  questionsHeading: string | null;
};

/** One EN/DE definition card (not a chapter/section banner). */
export type DefinitionCard = {
  id: number;
  title: string;
  content: string;
  deTitle: string;
  deContent: string;
};

/** One Q&A item (not a chapter banner). */
export type Question = {
  id: number;
  question: string;
  answer: string;
};
