/**
 * Read Q&A items from the normalized JSON.
 * Not imported by UI yet — questions/page.tsx still reads app/lib/questions.json.
 */

import questions from "@/lib/data/questions.json";
import type { Question } from "./types";

/** Question cards only; chapter banners live in chapters.json. */
export function getQuestions(): Question[] {
  return questions;
}
