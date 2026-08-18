# Current architecture

PsychBase is a Next.js 16 App Router app (React 19, TypeScript, Tailwind CSS v4). There is no backend: chapter content is static JSON. Path alias `@/*` maps to the repo root.

## Routes

- **`/` (home)** — `app/page.tsx` renders `HomeModeSelect`: two ShadCN Cards with Buttons (Cards → `/dashboard/cards`, Questions → `/dashboard/questions`).
- **`/dashboard/cards`** — `app/dashboard/cards/page.tsx` reads `getChapters()` and `getDefinitions()`, then renders `CardsPager`. One chapter at a time (Navbar hash `#${chapter.id}`), flip cards, ShadCN Pagination. Empty catalog uses ShadCN Empty.
- **`/dashboard/questions`** — `app/dashboard/questions/page.tsx` reads `getChapters()` and `getQuestions()`, then renders `QuestionList`. One chapter at a time (same Navbar hash). Two columns: question Buttons on the left, `AnswerPanel` on the right (ShadCN Empty until a question is clicked, then a typewriter of the answer). One selected question at a time. Empty catalog uses ShadCN Empty.

`app/layout.tsx` wraps every page with `ThemeProvider` then `Navbar`. Light is the default theme (`enableSystem` is off so OS preference does not override). `ThemeToggle` in the Navbar flips the `.dark` class on `<html>`; tokens and the page wallpaper follow. The page wallpaper (ink grid + primary dots on `--background`) is set once on `body` in `app/globals.css`. Layout reads `getChapters()` and passes the catalog into Navbar.

Navbar primary links: Home `/`, Cards `/dashboard/cards`, Questions `/dashboard/questions`. The chapter strip is that catalog (short labels `00`–`16` and `C`); jumps go to the matching dashboard hash. Built from ShadCN `Button` and `Separator` (mobile menu is the same markup, no Sheet). Theme toggle is an outline icon Button on the right of the top row.

## Normalized data (lib/data)

Chapter headers are not mixed into card arrays. Source of truth:

- `chapters.json` — `{ id, number, title }` (`number` is `null` for the appendix)
- `definitions.json` — `{ id, chapterId, termEn, definitionEn, termDe, definitionDe }`
- `questions.json` — `{ id, chapterId, question, answer }`

Kapitel 13's banner row also held question 13-1; that Q&A is a normal question in the normalized file.

## Data helpers

Types live in `lib/types.ts` (`Chapter`, `DefinitionCard`, `Question`). Helpers import the normalized files:

- `getChapters()` — catalog of ids, numbers, and short titles (wired to Navbar and both dashboards)
- `getDefinitions()` — definition cards only (wired to `/dashboard/cards`)
- `getQuestions()` — Q&A cards only (wired to `/dashboard/questions`)

## Design system

ShadCN is initialized (Tailwind v4, CSS variables, `cn` in `lib/utils.ts`). `app/globals.css` holds neobrutalist tokens (thick borders, hard offset shadows, radius 0, high-contrast colors) plus the site-wide page pattern. Light tokens live on `:root`; dark tokens live on `.dark`. `next-themes` toggles that class and persists the choice.

`components/ui` has five neobrutalist primitives: **button**, **card**, **separator**, **pagination**, **empty**. They use the existing tokens (`border`, `shadow-*`, `--radius`, `--border-width`) rather than hardcoded colors. Pagination composes Button. Navbar uses button, separator, and ThemeToggle. Home picker uses card and button. Cards dashboard uses card, separator, pagination, and empty. Questions dashboard uses button, card, separator, and empty.

Live pages do not carry the old zinc/slate/gradient chrome. Remaining `className`s are layout (grids, sticky, wrapping) or 3D flip transforms on `DefinitionFlipCard`.
