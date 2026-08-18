/**
 * Read definition cards from the normalized JSON.
 * Not imported by UI yet — Content.tsx still reads app/lib/new_test.json.
 */

import definitions from "@/lib/data/definitions.json";
import type { DefinitionCard } from "./types";

/** Definition cards only; chapter/section headers live in chapters.json. */
export function getDefinitions(): DefinitionCard[] {
  return definitions;
}
