# Current architecture

PsychBase is a Next.js 16 App Router app (React 19, TypeScript, Tailwind CSS v4). There is no backend: chapter content is static JSON imported into client components. Path alias `@/*` maps to the repo root.

## Routes

- **`/` (home)** — `app/page.tsx` renders `Content.tsx`, which reads `app/lib/new_test.json`. That array mixes definition cards with chapter-header rows. Chapter rows are detected when `title` contains `"CHAPTER"` (case-insensitive). Click a definition card to expand EN/DE text.
- **`/questions`** — `app/questions/page.tsx` reads `app/lib/questions.json` and `app/questions/questions.css`. Chapter rows are items with a non-empty `title` and empty `question`/`answer`. Other rows toggle the answer on click. Marked under construction.

`app/layout.tsx` wraps every page with `Navbar`. The navbar keeps two hardcoded chapter lists (definitions vs questions) and hash-links to row `id`s. It does not derive those lists from JSON.

## Design system

ShadCN is initialized (Tailwind v4, CSS variables, `cn` in `lib/utils.ts`). There are **no** `components/ui` primitives yet. `app/globals.css` holds neobrutalist tokens (thick borders, hard offset shadows, radius 0, high-contrast colors). `<html>` has class `dark` so those dark tokens apply; existing pages still use their own hardcoded classes.

## Unused / legacy

`app/lib/chapter2.json`, `app/lib/c7_to_c9.json`, `components/QuestionCard.tsx`, and `components/VerticalRule.tsx` are not imported by any route.

## Planned next

`/dashboard/cards`, `/dashboard/questions`, a home picker, and neobrutalist ShadCN UI under `/components/ui`.
