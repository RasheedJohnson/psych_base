import type { Metadata } from "next";

import CardsPager from "@/components/CardsPager";
import { getChapters } from "@/lib/chapters";
import { getDefinitions } from "@/lib/get-definitions";

export const metadata: Metadata = {
  title: "Cards",
};

/**
 * Definition cards dashboard.
 * Data is read on the server; paging, hash chapter jumps, and flips are client-side.
 */
export default function CardsPage() {
  const chapters = getChapters();
  const definitions = getDefinitions();

  return (
    <main>
      <CardsPager chapters={chapters} definitions={definitions} />
    </main>
  );
}
