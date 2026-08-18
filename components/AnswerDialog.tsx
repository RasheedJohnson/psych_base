"use client";

import TypedAnswer from "@/components/TypedAnswer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { Question } from "@/lib/types";

type AnswerDialogProps = {
  question: Question | null;
  onClose: () => void;
};

/**
 * Narrow-screen Q&A: question in the dialog title, typed answer in the body.
 * Wide screens keep AnswerPanel instead — this is not mounted there.
 */
export default function AnswerDialog({ question, onClose }: AnswerDialogProps) {
  return (
    <Dialog
      open={question !== null}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="flex max-h-[min(90dvh,40rem)] w-full flex-col overflow-hidden sm:max-w-lg">
        {question ? (
          <>
            {/* pr-10 clears the close Button in the top-right corner. */}
            <DialogHeader className="pr-10">
              <DialogTitle className="text-left leading-snug whitespace-normal">
                {question.question}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="sr-only">
              Answer to the selected question.
            </DialogDescription>
            <Separator />
            <div className="min-h-0 overflow-y-auto">
              <TypedAnswer key={question.id} text={question.answer} />
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
