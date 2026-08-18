# File dictionary

## App routes and layout

| File | Purpose |
| --- | --- |
| `app/layout.tsx` | Root layout: metadata, Inter as `--font-sans`, `ThemeProvider` (light default, class-based), `getChapters()` into `Navbar`. |
| `app/page.tsx` | Home: `getChapters()` into `HomeModeSelect` (no definition list). |
| `app/globals.css` | Tailwind v4 entry, ShadCN imports, neobrutalist CSS variables (light `:root`, dark `.dark`), site-wide page pattern on `body`. |
| `app/dashboard/cards/page.tsx` | `/dashboard/cards` server page: `getChapters()` + `getDefinitions()` into `CardsPager`. |
| `app/dashboard/questions/page.tsx` | `/dashboard/questions` server page: `getChapters()` + `getQuestions()` into `QuestionList`. |

## Components

| File | Purpose |
| --- | --- |
| `components/Navbar.tsx` | Sticky neo nav: Home / Cards / Questions (hamburger on small screens; Cards/Questions keep the chapter hash), always-visible chapter `DropdownMenu`, and `ThemeToggle`. |
| `components/theme-provider.tsx` | Client wrapper around `next-themes` ThemeProvider; used once in the root layout. |
| `components/ThemeToggle.tsx` | Outline icon Button that flips light/dark via `next-themes`; Sun/Moon from lucide. |
| `components/HomeModeSelect.tsx` | Home picker: two ShadCN Cards with Buttons to Cards/Questions, hashed with the last selected chapter. |
| `components/CardsPager.tsx` | Cards dashboard client: `useChapterId` chapter, grid of flip cards, ShadCN Pagination; Empty if the catalog is missing. |
| `components/DefinitionFlipCard.tsx` | One flip plate: EN/DE term on the front, EN/DE definition on the back (ShadCN Card + Separator). |
| `components/QuestionList.tsx` | Questions dashboard client: `useChapterId` chapter, question Buttons; wide = `AnswerPanel`, narrow = `AnswerDialog`. Empty if the catalog is missing. |
| `components/AnswerPanel.tsx` | Wide right column: ShadCN Empty until a question is selected, then typewriter of the answer (Card + Separator). |
| `components/AnswerDialog.tsx` | Narrow-screen Q&A: ShadCN Dialog with the question as title and `TypedAnswer` in the body. |
| `components/TypedAnswer.tsx` | Shared typewriter paragraph used by `AnswerPanel` and `AnswerDialog`. |

## Hooks

| File | Purpose |
| --- | --- |
| `hooks/use-hash.ts` | `useHash()` — URL hash without `#`; `replaceLocationHash()` syncs a missing dashboard hash. |
| `hooks/use-chapter-id.ts` | `useChapterId()` — hash, else last stored chapter, else first catalog id. Used by Navbar, HomeModeSelect, CardsPager, QuestionList. |
| `hooks/use-wide-screen.ts` | `useWideScreen()` — true at Tailwind `lg` (1024px); questions two-column vs dialog. |

## Data

| File | Purpose |
| --- | --- |
| `lib/data/chapters.json` | Normalized chapter catalog: `{ id, number, title }`. |
| `lib/data/definitions.json` | Normalized definition cards (no header rows). |
| `lib/data/questions.json` | Normalized Q&A cards (no header rows). |
| `lib/types.ts` | Schema: `Chapter`, `DefinitionCard`, `Question`. |
| `lib/chapters.ts` | `getChapters()` plus `chapterShortLabel`, `chapterHeading`, `chapterIdFromHash`, `resolveChapterId`, `chapterPageHref`. |
| `lib/last-chapter.ts` | `localStorage` last-chapter id (`psychbase:chapter`) with same-tab subscriber notify. |
| `lib/get-definitions.ts` | `getDefinitions()` from `lib/data/definitions.json`; used by `/dashboard/cards`. |
| `lib/get-questions.ts` | `getQuestions()` from `lib/data/questions.json`; used by `/dashboard/questions`. |

## ShadCN / tooling

| File | Purpose |
| --- | --- |
| `components.json` | ShadCN CLI config (radix-nova, CSS variables, `@/*` aliases). |
| `lib/utils.ts` | `cn()` helper (clsx + tailwind-merge) used by `/components/ui`. |
| `package.json` | Scripts and deps (Next, React, Tailwind v4, ShadCN stack, next-themes). |
| `tsconfig.json` | TypeScript config; `@/*` → repo root. |
| `postcss.config.mjs` | PostCSS with `@tailwindcss/postcss`. |
| `next.config.mjs` | Empty Next config. |
| `eslint.config.mjs` | ESLint (Next core-web-vitals + TypeScript). |

## Docs

| File | Purpose |
| --- | --- |
| `README.md` | Project overview, setup, scripts, pages, and content counts. |
| `CURRENT_ARCHITECTURE.md` | Brief architecture overview. |
| `CURRENT_DIR_DESC.md` | This dictionary. |

## UI primitives

| File | Purpose |
| --- | --- |
| `components/ui/button.tsx` | ShadCN Button; raised neo variants (border + offset shadow + press). |
| `components/ui/card.tsx` | ShadCN Card family; ink border and hard shadow, no overflow clip. |
| `components/ui/separator.tsx` | ShadCN Separator; thickness from `--border-width`. |
| `components/ui/pagination.tsx` | ShadCN Pagination; composes Button (active = default, others = outline). |
| `components/ui/empty.tsx` | ShadCN Empty state; raised card plate + optional primary icon well. |
| `components/ui/dialog.tsx` | ShadCN Dialog; raised popover plate + hard shadow (used by `AnswerDialog`). |
| `components/ui/dropdown-menu.tsx` | ShadCN DropdownMenu; raised popover plate (used by Navbar chapters). |

## Remaining layout classNames (not old visual chrome)

These still have `className`s that are placement, wrapping, or 3D — not leftover zinc/slate/gradient soup. Wrapping them in extra primitives would mean undoing Card/Button defaults.

| File | Why the utilities stay |
| --- | --- |
| `components/Navbar.tsx` | Sticky bar, flex rows, `md:hidden` menu. `bg-card shadow-sm` is token fill; a Card wrapper would need padding/radius overrides. |
| `components/ThemeToggle.tsx` | Icon swap uses `dark:hidden` / `hidden dark:block` so the painted icon tracks the `<html>` class without a mount gate. |
| `components/HomeModeSelect.tsx` | Two-column grid and footer alignment (`h-full`, `mt-auto`, `w-full`). |
| `components/CardsPager.tsx` | Page max-width, card grid, pagination disabled opacity. |
| `components/DefinitionFlipCard.tsx` | 3D flip (`perspective`, `backface-visibility`, `rotateY`). Native button chrome is stripped so the Card is the plate. |
| `components/QuestionList.tsx` | Two-column layout, sticky answer, wrapping question Button text. |
| `components/AnswerPanel.tsx` | `w-full` on the answer Card; separator spacing. |
| `components/AnswerDialog.tsx` | Dialog max-height / scroll for long answers; title wrapping and close-button gutter. |
