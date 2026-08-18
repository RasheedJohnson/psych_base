"use client";

import { useMemo, useState, useSyncExternalStore } from "react";

import AnswerPanel from "@/components/AnswerPanel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Chapter, Question } from "@/lib/types";

type QuestionListProps = {
  chapters: Chapter[];
  questions: Question[];
};

type ChapterQuestionsProps = {
  chapter: Chapter;
  questions: Question[];
};

/** Subscribe to the URL hash. Next.js Link uses pushState, so hashchange may not fire. */
function subscribeToHash(onStoreChange: () => void) {
  const onClick = (event: MouseEvent) => {
    const anchor = (event.target as Element | null)?.closest("a");
    if (!anchor?.getAttribute("href")?.includes("#")) {
      return;
    }
    window.setTimeout(onStoreChange, 0);
    window.setTimeout(onStoreChange, 50);
  };

  window.addEventListener("hashchange", onStoreChange);
  window.addEventListener("popstate", onStoreChange);
  document.addEventListener("click", onClick);

  return () => {
    window.removeEventListener("hashchange", onStoreChange);
    window.removeEventListener("popstate", onStoreChange);
    document.removeEventListener("click", onClick);
  };
}

function hashSnapshot(): string {
  return window.location.hash.replace(/^#/, "");
}

function chapterIdFromHash(hash: string, chapters: Chapter[]): string {
  if (chapters.some((chapter) => chapter.id === hash)) {
    return hash;
  }
  return chapters[0]?.id ?? "";
}

function chapterHeading(chapter: Chapter): string {
  if (chapter.number === null) {
    return chapter.title;
  }
  return `${String(chapter.number).padStart(2, "0")} — ${chapter.title}`;
}

/**
 * Selection lives here so a new `key={chapter.id}` remounts with Empty on the right.
 */
function ChapterQuestions({ chapter, questions }: ChapterQuestionsProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = questions.find((item) => item.id === selectedId) ?? null;

  return (
    <section
      id={chapter.id}
      aria-label={chapterHeading(chapter)}
      className="mx-auto grid max-w-6xl scroll-mt-32 grid-cols-1 gap-4 p-4 lg:grid-cols-2 lg:items-start"
    >
      <div className="flex min-w-0 flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>{chapterHeading(chapter)}</CardTitle>
            <CardDescription>
              {questions.length === 0
                ? "No questions in this chapter."
                : `${questions.length} questions · click one to type the answer`}
            </CardDescription>
          </CardHeader>
        </Card>

        <ul className="flex flex-col gap-2">
          {questions.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <li key={item.id}>
                <Button
                  type="button"
                  variant={isSelected ? "default" : "outline"}
                  size="lg"
                  aria-pressed={isSelected}
                  className="h-auto w-full justify-start whitespace-normal py-2 text-left"
                  onClick={() => setSelectedId(item.id)}
                >
                  {item.question}
                </Button>
              </li>
            );
          })}
        </ul>
      </div>

      <aside
        aria-label="Answer"
        className="flex min-h-64 min-w-0 lg:sticky lg:top-32"
      >
        <AnswerPanel
          key={selected?.id ?? "empty"}
          question={selected}
        />
      </aside>
    </section>
  );
}

/**
 * Questions dashboard client: one chapter at a time (Navbar hash), list on the
 * left, answer typewriter on the right. Keeps the page as a data-loading wrapper.
 */
export default function QuestionList({
  chapters,
  questions,
}: QuestionListProps) {
  const hash = useSyncExternalStore(subscribeToHash, hashSnapshot, () => "");
  const chapterId = chapterIdFromHash(hash, chapters);

  const questionsByChapter = useMemo(() => {
    const grouped = new Map<string, Question[]>();
    for (const item of questions) {
      const bucket = grouped.get(item.chapterId);
      if (bucket) {
        bucket.push(item);
      } else {
        grouped.set(item.chapterId, [item]);
      }
    }
    return grouped;
  }, [questions]);

  const chapter =
    chapters.find((item) => item.id === chapterId) ?? chapters[0];

  if (!chapter) {
    return (
      <section className="mx-auto max-w-6xl p-4">
        <Card>
          <CardHeader>
            <CardTitle>Questions</CardTitle>
            <CardDescription>No chapters to show.</CardDescription>
          </CardHeader>
        </Card>
      </section>
    );
  }

  return (
    <ChapterQuestions
      key={chapter.id}
      chapter={chapter}
      questions={questionsByChapter.get(chapter.id) ?? []}
    />
  );
}
