import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/** Same destinations as Navbar. Dashboard pages may 404 until they exist. */
const MODES = [
  {
    href: "/dashboard/cards",
    title: "Cards",
    description: "Definition cards from the textbook, grouped by chapter.",
  },
  {
    href: "/dashboard/questions",
    title: "Questions",
    description: "Practice questions from the textbook, grouped by chapter.",
  },
] as const;

/**
 * Home picker: Cards vs Questions.
 * Layout classes here are only for placing the two Cards; look-and-feel
 * comes from the ShadCN Card and Button primitives.
 */
export default function HomeModeSelect() {
  return (
    <section
      aria-label="Study mode"
      className="mx-auto grid max-w-4xl grid-cols-1 gap-4 p-4 sm:grid-cols-2"
    >
      {MODES.map((mode) => (
        <Card key={mode.href} className="h-full">
          <CardHeader>
            <CardTitle>{mode.title}</CardTitle>
            <CardDescription>{mode.description}</CardDescription>
          </CardHeader>
          {/* mt-auto keeps both footers aligned when card heights match. */}
          <CardFooter className="mt-auto">
            <Button asChild size="lg" className="w-full">
              <Link href={mode.href}>{mode.title}</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </section>
  );
}
