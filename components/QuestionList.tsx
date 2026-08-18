"use client";

import { useMemo, useState } from "react";

import AnswerDialog from "@/components/AnswerDialog";
import AnswerPanel from "@/components/AnswerPanel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { useHash } from "@/hooks/use-hash";
import { useWideScreen } from "@/hooks/use-wide-screen";
import { chapterHeading, chapterIdFromHash } from "@/lib/chapters";
import type { Chapter, Question } from "@/lib/types";

type QuestionListProps = {
  chapters: Chapter[];
  questions: Question[];
};

type ChapterQuestionsProps = {
  chapter: Chapter;
  questions: Question[];
};

/**
 * Selection lives here so a new `key={chapter.id}` remounts with Empty on the
 * right (wide) or a closed dialog (narrow).
 */
function ChapterQuestions({ chapter, questions }: ChapterQuestionsProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = questions.find((item) => item.id === selectedId) ?? null;
  /* Tailwind `lg`: two columns + AnswerPanel; below that, one column + dialog. */
  const isWide = useWideScreen();

  return (
    <section
      id={chapter.id}
      aria-label={chapterHeading(chapter)}
      className="mx-auto grid max-w-6xl scroll-mt-24 grid-cols-1 gap-4 p-4 lg:grid-cols-2 lg:items-start"
    >
      <div className="flex min-w-0 flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>{chapterHeading(chapter)}</CardTitle>
            <CardDescription>
              {questions.length === 0
                ? "No questions in this chapter."
                : `${questions.length} questions · click one to see the answer`}
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

      {isWide ? (
        /* `hidden lg:flex` keeps SSR HTML from stacking the panel on phones. */
        <aside
          aria-label="Answer"
          className="hidden min-h-64 min-w-0 lg:sticky lg:top-24 lg:flex"
        >
          <AnswerPanel
            key={selected?.id ?? "empty"}
            question={selected}
          />
        </aside>
      ) : (
        <AnswerDialog
          question={selected}
          onClose={() => setSelectedId(null)}
        />
      )}
    </section>
  );
}

/**
 * Questions dashboard client: one chapter at a time (Navbar hash). Wide
 * screens keep the list + AnswerPanel columns; narrow screens open a dialog.
 */
export default function QuestionList({
  chapters,
  questions,
}: QuestionListProps) {
  const hash = useHash();
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
        <Empty>
          <EmptyHeader>
            <EmptyTitle>Questions</EmptyTitle>
            <EmptyDescription>No chapters to show.</EmptyDescription>
          </EmptyHeader>
        </Empty>
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
