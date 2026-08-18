import type { Metadata } from "next";

import QuestionList from "@/components/QuestionList";
import { getChapters } from "@/lib/chapters";
import { getQuestions } from "@/lib/get-questions";

export const metadata: Metadata = {
  title: "Questions",
};

/**
 * Practice questions dashboard.
 * Data is read on the server; chapter hash, selection, and typewriter are client-side.
 */
export default function QuestionsPage() {
  const chapters = getChapters();
  const questions = getQuestions();

  return (
    <main>
      <QuestionList chapters={chapters} questions={questions} />
    </main>
  );
}
