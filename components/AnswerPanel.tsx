"use client";

import { useEffect, useState } from "react";
import { CircleHelp } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import type { Question } from "@/lib/types";

/** One character per tick so the answer is readable as it appears. */
const TYPE_MS = 16;

type AnswerPanelProps = {
  question: Question | null;
};

/**
 * Right column: Empty until a question is selected, then type its answer.
 * Parent remounts this with key={question.id} so a new pick starts from "".
 */
export default function AnswerPanel({ question }: AnswerPanelProps) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (!question) {
      return;
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTyped(question.answer.slice(0, index));
      if (index >= question.answer.length) {
        window.clearInterval(timer);
      }
    }, TYPE_MS);

    return () => window.clearInterval(timer);
  }, [question]);

  if (!question) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CircleHelp />
          </EmptyMedia>
          <EmptyTitle>No question selected</EmptyTitle>
          <EmptyDescription>
            Click a question on the left to type its answer here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  const stillTyping = typed.length < question.answer.length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <Separator className="mb-3" />
        <p>
          {typed}
          {stillTyping ? <span aria-hidden="true">|</span> : null}
        </p>
      </CardContent>
    </Card>
  );
}
