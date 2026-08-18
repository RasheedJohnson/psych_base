/**
 * One-off: split mixed definition/question JSON into chapters + cards.
 *
 * Reads:
 *   app/lib/new_test.json     (definitions + chapter/section header rows)
 *   app/lib/questions.json    (Q&A + chapter banner rows)
 *
 * Writes:
 *   lib/data/chapters.json
 *   lib/data/definitions.json
 *   lib/data/questions.json
 *
 * Run from the repo root: node scripts/normalize-data.mjs
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const NUMBERED_DEFINITION_HEADING = /^chapter\s+(\d+)\s*:\s*(.+)$/i;
const APPENDIX_DEFINITION_HEADING = /^chapter\s+appendix:\s*(.+)$/i;
const NUMBERED_QUESTION_HEADING =
  /^learning objective questions\s+[–-]\s+kapitel\s+(\d+)$/i;
const PROLOGUE_QUESTION_HEADING = /^prologue\s+\d+$/i;

function numberedId(n) {
  return String(n);
}

function appendixId(label) {
  return `appendix-${label.toLowerCase().replace(/\s+/g, "-")}`;
}

function emptyChapter(id, number, title) {
  return { id, number, title };
}

function isBlank(value) {
  return String(value ?? "").trim() === "";
}

/** True when every display field is empty — leftover placeholder, not a card. */
function isEmptyDefinitionRow(row) {
  return (
    isBlank(row.title) &&
    isBlank(row.content) &&
    isBlank(row.de_title) &&
    isBlank(row.de_content)
  );
}

function compareChapters(a, b) {
  if (a.number === null && b.number === null) return a.id.localeCompare(b.id);
  if (a.number === null) return 1;
  if (b.number === null) return -1;
  return a.number - b.number;
}

function writeJson(relPath, data) {
  const abs = join(root, relPath);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function main() {
  const definitionRows = JSON.parse(
    readFileSync(join(root, "app/lib/new_test.json"), "utf8"),
  );
  const questionRows = JSON.parse(
    readFileSync(join(root, "app/lib/questions.json"), "utf8"),
  );

  const byId = new Map();
  const definitions = [];
  let currentDefinitionChapterId = null;
  let skippedDefinitionHeaders = 0;
  let skippedEmptyDefinitions = 0;

  for (const row of definitionRows) {
    const numbered = row.title.match(NUMBERED_DEFINITION_HEADING);
    if (numbered) {
      const number = Number(numbered[1]);
      const id = numberedId(number);
      const title = numbered[2].trim();
      const chapter = byId.get(id) ?? emptyChapter(id, number, title);
      chapter.title = title;
      chapter.number = number;
      byId.set(id, chapter);
      currentDefinitionChapterId = id;
      skippedDefinitionHeaders += 1;
      continue;
    }

    const appendix = row.title.match(APPENDIX_DEFINITION_HEADING);
    if (appendix) {
      const label = appendix[1].trim();
      const id = appendixId(label);
      const chapter =
        byId.get(id) ?? emptyChapter(id, null, `Appendix ${label}`);
      byId.set(id, chapter);
      currentDefinitionChapterId = id;
      skippedDefinitionHeaders += 1;
      continue;
    }

    // In-chapter banners ("CHAPTER - ", "Chapter 1 - 2:") are not catalog
    // entries and not definition cards.
    if (String(row.title).toLowerCase().includes("chapter")) {
      skippedDefinitionHeaders += 1;
      continue;
    }

    if (isEmptyDefinitionRow(row)) {
      skippedEmptyDefinitions += 1;
      continue;
    }

    if (currentDefinitionChapterId === null) {
      throw new Error(`Definition id ${row.id} has no preceding chapter header`);
    }

    definitions.push({
      id: row.id,
      chapterId: currentDefinitionChapterId,
      termEn: row.title,
      definitionEn: row.content,
      termDe: row.de_title,
      definitionDe: row.de_content,
    });
  }

  const questions = [];
  let currentQuestionChapterId = null;
  let skippedQuestionHeaders = 0;
  let rescuedHeaderQuestions = 0;

  for (const row of questionRows) {
    const numbered = row.title.match(NUMBERED_QUESTION_HEADING);
    if (numbered) {
      const number = Number(numbered[1]);
      const id = numberedId(number);
      const chapter = byId.get(id) ?? emptyChapter(id, number, `Chapter ${number}`);
      byId.set(id, chapter);
      currentQuestionChapterId = id;
      skippedQuestionHeaders += 1;
      // Kapitel 13's banner row also holds question 13-1 — keep the Q&A.
      if (!isBlank(row.question) || !isBlank(row.answer)) {
        questions.push({
          id: row.id,
          chapterId: id,
          question: row.question,
          answer: row.answer,
        });
        rescuedHeaderQuestions += 1;
      }
      continue;
    }

    if (PROLOGUE_QUESTION_HEADING.test(row.title)) {
      const id = numberedId(0);
      const chapter = byId.get(id) ?? emptyChapter(id, 0, "Prologue");
      byId.set(id, chapter);
      currentQuestionChapterId = id;
      skippedQuestionHeaders += 1;
      if (!isBlank(row.question) || !isBlank(row.answer)) {
        questions.push({
          id: row.id,
          chapterId: id,
          question: row.question,
          answer: row.answer,
        });
        rescuedHeaderQuestions += 1;
      }
      continue;
    }

    if (row.title !== "") {
      throw new Error(`Unrecognized question header id ${row.id}: ${row.title}`);
    }

    if (currentQuestionChapterId === null) {
      throw new Error(`Question id ${row.id} has no preceding chapter header`);
    }

    questions.push({
      id: row.id,
      chapterId: currentQuestionChapterId,
      question: row.question,
      answer: row.answer,
    });
  }

  const chapters = [...byId.values()].sort(compareChapters);

  writeJson("lib/data/chapters.json", chapters);
  writeJson("lib/data/definitions.json", definitions);
  writeJson("lib/data/questions.json", questions);

  console.log(
    [
      `chapters:     ${chapters.length}`,
      `definitions:  ${definitions.length}  (skipped ${skippedDefinitionHeaders} headers, ${skippedEmptyDefinitions} empty)`,
      `questions:    ${questions.length}  (skipped ${skippedQuestionHeaders} headers, rescued ${rescuedHeaderQuestions} from header rows)`,
    ].join("\n"),
  );
}

main();
