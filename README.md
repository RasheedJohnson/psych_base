# PsychBase

A static study app for a psychology textbook. It shows bilingual (EN/DE) definition cards and practice questions, one chapter at a time.

The in-app name is **V's PsychDB**. There is no backend: all content is JSON in the repo.

## Features

- **Cards** — flip cards with English and German terms and definitions, six per page
- **Questions** — one question at a time; wide screens show the answer beside the list, narrow screens open a dialog
- **Chapters** — 00–16 plus appendix C; the last selected chapter stays selected when you move between Home, Cards, and Questions
- **Theme** — light by default, with a toggle in the nav (choice is persisted)

## Stack

| | |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) 16 (App Router) |
| UI | React 19, TypeScript, [Tailwind CSS](https://tailwindcss.com/) v4, [ShadCN](https://ui.shadcn.com/) (neobrutalist tokens) |
| Theme | [next-themes](https://github.com/pacocoursey/next-themes) (class on `<html>`, system preference off) |

Path alias `@/*` maps to the repo root.

## Requirements

- Node.js 20.9 or newer (Next.js 16)
- npm (this repo uses `package-lock.json`)

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

No environment variables are required.

## Pages

| Path | What you get |
| --- | --- |
| `/` | Home — pick Cards or Questions |
| `/dashboard/cards` | Definition cards for the selected chapter |
| `/dashboard/questions` | Practice questions for the selected chapter |

Use the chapter menu in the nav (`00`–`16` and `C`) to jump. Cards and Questions links keep that chapter in the URL hash. If the hash is missing, the last chapter is restored from `localStorage`.

## Content

Source files live in `lib/data/`:

| File | Records | Shape |
| --- | --- | --- |
| `chapters.json` | 18 | `{ id, number, title }` (`number` is `null` for the appendix) |
| `definitions.json` | 683 | `{ id, chapterId, termEn, definitionEn, termDe, definitionDe }` |
| `questions.json` | 316 | `{ id, chapterId, question, answer }` |

Types are in `lib/types.ts`. Loaders: `getChapters()`, `getDefinitions()`, `getQuestions()`.

## Docs

| File | What it covers |
| --- | --- |
| [CURRENT_ARCHITECTURE.md](CURRENT_ARCHITECTURE.md) | Routes, data model, chapter selection, design system |
| [CURRENT_DIR_DESC.md](CURRENT_DIR_DESC.md) | File-by-file map of the live app |
