"use client";

import { CircleHelp } from "lucide-react";

import TypedAnswer from "@/components/TypedAnswer";
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

type AnswerPanelProps = {
  question: Question | null;
};

/**
 * Right column on wide screens: Empty until a question is selected, then type
 * its answer. Parent remounts this with key={question.id} so a new pick starts
 * from "".
 */
export default function AnswerPanel({ question }: AnswerPanelProps) {
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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <Separator className="mb-3" />
        <TypedAnswer text={question.answer} />
      </CardContent>
    </Card>
  );
}
