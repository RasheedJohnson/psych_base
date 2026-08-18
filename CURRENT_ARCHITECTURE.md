# Current architecture

PsychBase is a Next.js 16 App Router app (React 19, TypeScript, Tailwind CSS v4). There is no backend: chapter content is static JSON. Path alias `@/*` maps to the repo root.

## Routes

- **`/` (home)** — `app/page.tsx` renders `HomeModeSelect`: two ShadCN Cards with Buttons (Cards → `/dashboard/cards`, Questions → `/dashboard/questions`). Does not render `Content.tsx`.
- **`/questions`** — `app/questions/page.tsx` still reads the mixed `app/lib/questions.json` and `app/questions/questions.css`. Chapter rows are items with a non-empty `title` and empty `question`/`answer`. Other rows toggle the answer on click. Marked under construction.
- **`/dashboard/cards`** — `app/dashboard/cards/page.tsx` reads `getChapters()` and `getDefinitions()`, then renders `CardsPager`. One chapter at a time (Navbar hash `#${chapter.id}`), flip cards, ShadCN Pagination.
- **`/dashboard/questions`** — linked from Navbar and the home picker; page is not created yet (404 until later).

`app/layout.tsx` wraps every page with `Navbar`. The page wallpaper (ink grid + primary dots on `--background`) is set once on `body` in `app/globals.css`. Layout reads `getChapters()` and passes the catalog into Navbar.

Navbar primary links: Home `/`, Cards `/dashboard/cards`, Questions `/dashboard/questions`. The chapter strip is that catalog (short labels `00`–`16` and `C`); jumps go to the matching dashboard hash. Built from ShadCN `Button` and `Separator` (mobile menu is the same markup, no Sheet).

## Normalized data (lib/data)

Chapter headers are no longer mixed into card arrays. Source of truth for helpers:

- `chapters.json` — `{ id, number, title }` (`number` is `null` for the appendix)
- `definitions.json` — `{ id, chapterId, termEn, definitionEn, termDe, definitionDe }`
- `questions.json` — `{ id, chapterId, question, answer }`

Built by `scripts/normalize-data.mjs` from the mixed files (do not hand-edit the large JSON). Kapitel 13's banner row also held question 13-1; that Q&A is a normal question in the normalized file.

## Data helpers

Types live in `lib/types.ts` (`Chapter`, `DefinitionCard`, `Question`). Helpers import the normalized files:

- `getChapters()` — catalog of ids, numbers, and short titles (wired to Navbar and `/dashboard/cards`)
- `getDefinitions()` — definition cards only (wired to `/dashboard/cards`)
- `getQuestions()` — Q&A cards only (not wired to UI yet)

`/questions` still imports mixed JSON directly. `app/lib/new_test.json` stays as compatibility for unused `Content.tsx`. `app/lib/questions.json` stays as compatibility for `/questions`.

## Design system

ShadCN is initialized (Tailwind v4, CSS variables, `cn` in `lib/utils.ts`). `app/globals.css` holds neobrutalist tokens (thick borders, hard offset shadows, radius 0, high-contrast colors) plus the site-wide page pattern. `<html>` has class `dark` so those dark tokens apply; `/questions` still uses its own hardcoded classes.

`components/ui` has five neobrutalist primitives: **button**, **card**, **separator**, **pagination**, **empty**. They use the existing tokens (`border`, `shadow-*`, `--radius`, `--border-width`) rather than hardcoded colors. Pagination composes Button. Navbar uses button and separator. Home picker uses card and button. Cards dashboard uses card, separator, and pagination (Button via Pagination).

## Unused / legacy

`app/lib/chapter2.json`, `app/lib/c7_to_c9.json`, `components/Content.tsx`, `components/QuestionCard.tsx`, and `components/VerticalRule.tsx` are not imported by any route.

## Planned next

Create `/dashboard/questions`, wire it to `getQuestions()`, drop the mixed JSON, then delete unused `Content.tsx` and add more `/components/ui` primitives on pages.
