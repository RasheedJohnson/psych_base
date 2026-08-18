# File dictionary

## App routes and layout

| File | Purpose |
| --- | --- |
| `app/layout.tsx` | Root layout: metadata, Inter as `--font-sans`, `dark` on `<html>`, global `Navbar`. |
| `app/page.tsx` | Home: title + `HorizontalRule` + `Content`. |
| `app/globals.css` | Tailwind v4 entry, ShadCN imports, neobrutalist CSS variables, `cn`-ready theme map. |
| `app/questions/page.tsx` | `/questions` client page: accordion-style Q&A from `questions.json`. |
| `app/questions/questions.css` | Page-local styles for chapter titles and question cards. |

## Components

| File | Purpose |
| --- | --- |
| `components/Navbar.tsx` | Sticky nav with hardcoded chapter lists and DEFINITIONS / QUESTIONS toggle. |
| `components/Content.tsx` | Home definition list from `new_test.json`; chapter vs card by title containing `"CHAPTER"`. |
| `components/HorizontalRule.tsx` | Gradient divider used on home and questions. |
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
| `app/lib/new_test.json` | Home definitions (EN/DE). Chapter headers mixed into the same array. |
| `app/lib/questions.json` | `/questions` items. Chapter rows: `title` set, `question`/`answer` empty. |
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
