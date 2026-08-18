/**
 * Read definition cards from the current mixed JSON list.
 * Not imported by UI yet — Content.tsx still reads new_test.json directly.
 */

import definitionRows from "@/app/lib/new_test.json";
import type { DefinitionCard } from "./types";

/**
 * Chapter/section banners live in the same array as cards. Content.tsx treats
 * any title containing "chapter" (any case) as a heading — including stubs
 * like "CHAPTER - " and "Chapter 1 - 2:". Those rows are not definition cards,
 * so they are filtered out here.
 */
function isHeaderRow(row: { title: string }): boolean {
  return row.title.toLowerCase().includes("chapter");
}

/** Definition cards only: no chapter or section header rows. */
export function getDefinitions(): DefinitionCard[] {
  return definitionRows.filter((row) => !isHeaderRow(row)).map((row) => ({
    id: row.id,
    title: row.title,
    content: row.content,
    deTitle: row.de_title,
    deContent: row.de_content,
  }));
}
