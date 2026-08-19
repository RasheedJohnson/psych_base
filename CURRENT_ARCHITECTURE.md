# Current architecture

PsychBase is a Next.js 16 App Router app (React 19, TypeScript, Tailwind CSS v4). There is no backend: chapter content is static JSON. Path alias `@/*` maps to the repo root.

## Routes

- **`/` (home)** — `app/page.tsx` reads `getChapters()` and renders `HomeModeSelect`: two ShadCN Cards with Buttons (Cards → `/dashboard/cards`, Questions → `/dashboard/questions`), each carrying the last selected chapter hash.
- **`/dashboard/cards`** — `app/dashboard/cards/page.tsx` reads `getChapters()` and `getDefinitions()`, then renders `CardsPager`. One chapter at a time (`useChapterId`: Navbar hash, else last stored chapter), flip cards, ShadCN Pagination. Empty catalog uses ShadCN Empty.
- **`/dashboard/questions`** — `app/dashboard/questions/page.tsx` reads `getChapters()` and `getQuestions()`, then renders `QuestionList`. One chapter at a time (same `useChapterId`). Wide screens (`lg` and up): two columns — question Buttons on the left, `AnswerPanel` on the right (ShadCN Empty until a question is clicked, then a typewriter of the answer). Narrow screens (one column): the same Buttons open `AnswerDialog` (question in the dialog title, typed answer in the body). One selected question at a time. Empty catalog uses ShadCN Empty.

`app/layout.tsx` wraps every page with `ThemeProvider` then `Navbar`. Light is the default theme (`enableSystem` is off so OS preference does not override). `ThemeToggle` in the Navbar flips the `.dark` class on `<html>`; tokens and the page wallpaper follow. The page wallpaper (ink grid + primary dots on `--background`) is set once on `body` in `app/globals.css`. Layout reads `getChapters()` and passes the catalog into Navbar.

Navbar primary links: Home `/`, Cards `/dashboard/cards`, Questions `/dashboard/questions`. Cards and Questions append `#${chapterId}` so the selected chapter survives route changes. Chapters are a ShadCN DropdownMenu in the top bar (labels `00`–`16` and `C`); jumps go to the matching dashboard hash. Built from ShadCN `Button`, `Separator`, and `DropdownMenu` (mobile hamburger is the same route Buttons, no Sheet). Theme toggle is an outline icon Button on the right of the top row.

Chapter selection is the URL hash when it is a catalog id. The last valid hash is also stored in `localStorage` (`psychbase:chapter`) so Home → dashboard and hash-less dashboard URLs reopen the same chapter. `useChapterId()` is the shared resolver (Navbar, home picker, both dashboards).

## Normalized data (lib/data)

Chapter headers are not mixed into card arrays. Source of truth:

- `chapters.json` — `{ id, number, title }` (`number` is `null` for the appendix)
- `definitions.json` — `{ id, chapterId, termEn, definitionEn, termDe, definitionDe }`
- `questions.json` — `{ id, chapterId, question, answer }`

Kapitel 13's banner row also held question 13-1; that Q&A is a normal question in the normalized file.

## Data helpers

Types live in `lib/types.ts` (`Chapter`, `DefinitionCard`, `Question`). Helpers import the normalized files:

- `getChapters()` — catalog of ids, numbers, and short titles (wired to Navbar, home picker, and both dashboards)
- `chapterShortLabel` / `chapterHeading` / `chapterIdFromHash` / `resolveChapterId` / `chapterPageHref` — shared chapter display, hash/stored lookup, and dashboard URLs with hash
- `getDefinitions()` — definition cards only (wired to `/dashboard/cards`)
- `getQuestions()` — Q&A cards only (wired to `/dashboard/questions`)

Hash subscription is `useHash()` (`hooks/use-hash.ts`). Chapter selection is `useChapterId()` (`hooks/use-chapter-id.ts`): hash, else `localStorage` last chapter, else first catalog id. The questions two-column vs dialog split uses `useWideScreen()` (`hooks/use-wide-screen.ts`, Tailwind `lg` / 1024px).

## Design system

ShadCN is initialized (Tailwind v4, CSS variables, `cn` in `lib/utils.ts`). `app/globals.css` holds neobrutalist tokens (thick borders, hard offset shadows, slight `--radius`, high-contrast colors) plus the site-wide page pattern. Light tokens live on `:root`; dark tokens live on `.dark`. `next-themes` toggles that class and persists the choice. Corner rounding is only the `--radius` token: primitives already use `rounded-*`, and `box-shadow` follows the element's radius so raised plates keep matching rounded shadows.

`components/ui` has seven neobrutalist primitives: **button**, **card**, **separator**, **pagination**, **empty**, **dialog**, **dropdown-menu**. They use the existing tokens (`border`, `shadow-*`, `--radius`, `--border-width`) rather than hardcoded colors. Pagination composes Button. Dialog close and dropdown trigger compose Button. Navbar uses button, separator, dropdown-menu, and ThemeToggle. Home picker uses card and button. Cards dashboard uses card, separator, pagination, and empty. Questions dashboard uses button, card, separator, empty, and dialog.

Live pages do not carry the old zinc/slate/gradient chrome. Remaining `className`s are layout (grids, sticky, wrapping) or 3D flip transforms on `DefinitionFlipCard`.
