# Current architecture

PsychBase is a Next.js 16 App Router app (React 19, TypeScript, Tailwind CSS v4). There is no backend: chapter content is static JSON imported into client components. Path alias `@/*` maps to the repo root.

## Routes

- **`/` (home)** — `app/page.tsx` renders `Content.tsx`, which reads `app/lib/new_test.json`. That array mixes definition cards with chapter-header rows. Chapter rows are detected when `title` contains `"CHAPTER"` (case-insensitive). Click a definition card to expand EN/DE text.
- **`/questions`** — `app/questions/page.tsx` reads `app/lib/questions.json` and `app/questions/questions.css`. Chapter rows are items with a non-empty `title` and empty `question`/`answer`. Other rows toggle the answer on click. Marked under construction.

`app/layout.tsx` wraps every page with `Navbar`. The navbar keeps two hardcoded chapter lists (definitions vs questions) and hash-links to row `id`s. It does not derive those lists from JSON.

## Data helpers (not wired to UI yet)

Clean types live in `lib/types.ts` (`Chapter`, `DefinitionCard`, `Question`). Read helpers still parse the mixed JSON:

- `getChapters()` — catalog of ids, numbers, titles, and the exact heading strings Navbar hardcodes today (plus appendix from the definitions file).
- `getDefinitions()` — definition cards only (header/section rows stripped).
- `getQuestions()` — Q&A cards only (header rows stripped).

Pages and Navbar still import JSON / hardcoded arrays directly.

## Design system

ShadCN is initialized (Tailwind v4, CSS variables, `cn` in `lib/utils.ts`). `app/globals.css` holds neobrutalist tokens (thick borders, hard offset shadows, radius 0, high-contrast colors). `<html>` has class `dark` so those dark tokens apply; existing pages still use their own hardcoded classes.

`components/ui` now has five neobrutalist primitives (not wired to pages yet): **button**, **card**, **separator**, **pagination**, **empty**. They use the existing tokens (`border`, `shadow-*`, `--radius`, `--border-width`) rather than hardcoded colors. Pagination composes Button.

## Unused / legacy

`app/lib/chapter2.json`, `app/lib/c7_to_c9.json`, `components/QuestionCard.tsx`, and `components/VerticalRule.tsx` are not imported by any route.

## Planned next

Wire pages/Navbar to the helpers, rewrite the mixed JSON into the clean schema, then `/dashboard/cards`, `/dashboard/questions`, a home picker, and the new `/components/ui` primitives.
