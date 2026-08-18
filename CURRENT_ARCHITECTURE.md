# Current architecture

PsychBase is a Next.js 16 App Router app (React 19, TypeScript, Tailwind CSS v4). There is no backend: chapter content is static JSON. Path alias `@/*` maps to the repo root.

## Routes

- **`/` (home)** — `app/page.tsx` renders `Content.tsx`, which still reads the mixed `app/lib/new_test.json` (definition cards plus chapter-header rows). Chapter rows are detected when `title` contains `"CHAPTER"` (case-insensitive). Click a definition card to expand EN/DE text.
- **`/questions`** — `app/questions/page.tsx` still reads the mixed `app/lib/questions.json` and `app/questions/questions.css`. Chapter rows are items with a non-empty `title` and empty `question`/`answer`. Other rows toggle the answer on click. Marked under construction.

`app/layout.tsx` wraps every page with `Navbar`. The navbar keeps two hardcoded chapter lists (definitions vs questions) and hash-links to row `id`s. It does not derive those lists from JSON.

## Normalized data (lib/data)

Chapter headers are no longer mixed into card arrays. Source of truth for helpers:

- `chapters.json` — `{ id, number, title }` (`number` is `null` for the appendix)
- `definitions.json` — `{ id, chapterId, termEn, definitionEn, termDe, definitionDe }`
- `questions.json` — `{ id, chapterId, question, answer }`

Built by `scripts/normalize-data.mjs` from the mixed files (do not hand-edit the large JSON). Kapitel 13's banner row also held question 13-1; that Q&A is a normal question in the normalized file.

## Data helpers (not wired to UI yet)

Types live in `lib/types.ts` (`Chapter`, `DefinitionCard`, `Question`). Helpers import the normalized files:

- `getChapters()` — catalog of ids, numbers, and short titles
- `getDefinitions()` — definition cards only
- `getQuestions()` — Q&A cards only

Pages and Navbar still import mixed JSON / hardcoded arrays directly. `app/lib/new_test.json` and `app/lib/questions.json` stay as compatibility for those pages.

## Design system

ShadCN is initialized (Tailwind v4, CSS variables, `cn` in `lib/utils.ts`). `app/globals.css` holds neobrutalist tokens (thick borders, hard offset shadows, radius 0, high-contrast colors). `<html>` has class `dark` so those dark tokens apply; existing pages still use their own hardcoded classes.

`components/ui` now has five neobrutalist primitives (not wired to pages yet): **button**, **card**, **separator**, **pagination**, **empty**. They use the existing tokens (`border`, `shadow-*`, `--radius`, `--border-width`) rather than hardcoded colors. Pagination composes Button.

## Unused / legacy

`app/lib/chapter2.json`, `app/lib/c7_to_c9.json`, `components/QuestionCard.tsx`, and `components/VerticalRule.tsx` are not imported by any route.

## Planned next

Wire pages/Navbar to the helpers, drop the mixed JSON, then `/dashboard/cards`, `/dashboard/questions`, a home picker, and the new `/components/ui` primitives.
