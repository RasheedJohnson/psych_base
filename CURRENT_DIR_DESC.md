# File dictionary

## App routes and layout

| File | Purpose |
| --- | --- |
| `app/layout.tsx` | Root layout: metadata, Inter as `--font-sans`, `dark` on `<html>`, `getChapters()` into `Navbar`. |
| `app/page.tsx` | Home: thin wrapper around `HomeModeSelect` (no definition list). |
| `app/globals.css` | Tailwind v4 entry, ShadCN imports, neobrutalist CSS variables, site-wide page pattern on `body`. |
| `app/dashboard/cards/page.tsx` | `/dashboard/cards` server page: `getChapters()` + `getDefinitions()` into `CardsPager`. |
| `app/dashboard/questions/page.tsx` | `/dashboard/questions` server page: `getChapters()` + `getQuestions()` into `QuestionList`. |

## Components

| File | Purpose |
| --- | --- |
| `components/Navbar.tsx` | Sticky neo nav: Home / Cards / Questions plus chapter catalog; ShadCN Button + Separator. |
| `components/HomeModeSelect.tsx` | Home picker: two ShadCN Cards with Buttons to `/dashboard/cards` and `/dashboard/questions`. |
| `components/CardsPager.tsx` | Cards dashboard client: hash-selected chapter, grid of flip cards, ShadCN Pagination. |
| `components/DefinitionFlipCard.tsx` | One flip plate: EN/DE term on the front, EN/DE definition on the back (ShadCN Card + Separator). |
| `components/QuestionList.tsx` | Questions dashboard client: hash-selected chapter, question Buttons, selected id into `AnswerPanel`. |
| `components/AnswerPanel.tsx` | Right column: ShadCN Empty until a question is selected, then typewriter of the answer (Card + Separator). |
| `components/Content.tsx` | Unused/legacy home definition list from mixed `new_test.json`. |
| `components/HorizontalRule.tsx` | Unused/legacy gradient divider (was `/questions`; still imported only by unused `Content.tsx`). |
| `components/VerticalRule.tsx` | Unused/legacy vertical divider. |
| `components/QuestionCard.tsx` | Unused/legacy question/answer presentational card. |
| `components/ui/button.tsx` | ShadCN Button; raised neo variants (border + offset shadow + press). |
| `components/ui/card.tsx` | ShadCN Card family; ink border and hard shadow, no overflow clip. |
| `components/ui/separator.tsx` | ShadCN Separator; thickness from `--border-width`. |
| `components/ui/pagination.tsx` | ShadCN Pagination; composes Button (active = default, others = outline). |
| `components/ui/empty.tsx` | ShadCN Empty state; raised card plate + optional primary icon well. |

## Data

| File | Purpose |
| --- | --- |
| `lib/data/chapters.json` | Normalized chapter catalog: `{ id, number, title }`. |
| `lib/data/definitions.json` | Normalized definition cards (no header rows). |
| `lib/data/questions.json` | Normalized Q&A cards (no header rows). |
| `lib/types.ts` | Schema: `Chapter`, `DefinitionCard`, `Question`. |
| `lib/chapters.ts` | `getChapters()` from `lib/data/chapters.json`; used by root layout → Navbar and both dashboards. |
| `lib/get-definitions.ts` | `getDefinitions()` from `lib/data/definitions.json`; used by `/dashboard/cards`. |
| `lib/get-questions.ts` | `getQuestions()` from `lib/data/questions.json`; used by `/dashboard/questions`. |
| `scripts/normalize-data.mjs` | One-off migrator: mixed JSON → `lib/data/*.json`. |
| `app/lib/new_test.json` | Mixed definitions + chapter headers; still used by unused `Content.tsx`. |
| `app/lib/questions.json` | Unused/legacy mixed Q&A + chapter banners (old `/questions` route). |
| `app/lib/chapter2.json` | Unused/legacy chapter 2 definitions. |
| `app/lib/c7_to_c9.json` | Unused/legacy stub for chapters 7–9. |
| `app/lib/addid.py` | One-off script for assigning ids; not used by the Next app. |

## ShadCN / tooling

| File | Purpose |
| --- | --- |
| `components.json` | ShadCN CLI config (radix-nova, CSS variables, `@/*` aliases). |
| `lib/utils.ts` | `cn()` helper (clsx + tailwind-merge) used by `/components/ui`. |
| `package.json` | Scripts and deps (Next, React, Tailwind v4, ShadCN stack). |
| `tsconfig.json` | TypeScript config; `@/*` → repo root. |
| `postcss.config.mjs` | PostCSS with `@tailwindcss/postcss`. |
| `next.config.mjs` | Empty Next config. |
| `eslint.config.mjs` | ESLint (Next core-web-vitals + TypeScript). |

## Docs

| File | Purpose |
| --- | --- |
| `CURRENT_ARCHITECTURE.md` | Brief architecture overview. |
| `CURRENT_DIR_DESC.md` | This dictionary. |
