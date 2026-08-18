/**
 * Read Q&A items from the current mixed JSON list.
 * Not imported by UI yet — questions/page.tsx still reads questions.json directly.
 */

import questionRows from "@/app/lib/questions.json";
import type { Question } from "./types";

/**
 * Chapter banners live in the same array as questions. The questions page
 * treats a non-empty title as a heading (question/answer are meant to be
 * empty on those rows). Filter them so callers get Q&A cards only.
 *
 * Note: Kapitel 13's banner row also holds question 13-1. Until that JSON is
 * split, this helper follows the page rule and drops the whole row.
 */
function isHeaderRow(row: { title: string }): boolean {
  return row.title !== "";
}

/** Question cards only: no chapter header rows. */
export function getQuestions(): Question[] {
  return questionRows.filter((row) => !isHeaderRow(row)).map((row) => ({
    id: row.id,
    question: row.question,
    answer: row.answer,
  }));
}
