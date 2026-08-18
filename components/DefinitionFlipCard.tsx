"use client";

import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { DefinitionCard } from "@/lib/types";

type DefinitionFlipCardProps = {
  card: DefinitionCard;
};

/**
 * One definition as a 3D flip plate.
 * Front = terms (EN title, DE subtitle). Back = definitions (EN, then DE).
 */
export default function DefinitionFlipCard({ card }: DefinitionFlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      /* Native button chrome is stripped so the ShadCN Card is the plate. */
      className="w-full cursor-pointer border-0 bg-transparent p-0 text-left text-inherit [perspective:56rem] focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      aria-pressed={flipped}
      aria-label={
        flipped ? `Definition of ${card.termEn}` : `Term ${card.termEn}`
      }
      onClick={() => setFlipped((isFlipped) => !isFlipped)}
    >
      {/* Inner rotates 180° on Y; each face is painted on one side of the slab. */}
      <div
        className={cn(
          "relative h-72 transition-transform duration-500 [transform-style:preserve-3d]",
          flipped && "[transform:rotateY(180deg)]"
        )}
      >
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(0deg)]">
          <Card className="h-full justify-center">
            <CardHeader>
              <CardTitle>{card.termEn}</CardTitle>
              <CardDescription>{card.termDe}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <Card className="h-full">
            {/* min-h-0 lets long copy scroll inside the plate without clipping the card shadow. */}
            <CardContent className="min-h-0 flex-1 overflow-y-auto">
              <p>{card.definitionEn}</p>
              <Separator className="my-3" />
              <CardDescription>{card.definitionDe}</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </button>
  );
}
