"use client";

import { useMemo, useState, useSyncExternalStore } from "react";

import DefinitionFlipCard from "@/components/DefinitionFlipCard";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Chapter, DefinitionCard } from "@/lib/types";

/** Two rows of three on large screens; chapters with fewer cards just leave gaps. */
const PAGE_SIZE = 6;

type CardsPagerProps = {
  chapters: Chapter[];
  definitions: DefinitionCard[];
};

type ChapterDeckProps = {
  chapter: Chapter;
  cards: DefinitionCard[];
};

/** Subscribe to the URL hash. Next.js Link uses pushState, so hashchange may not fire. */
function subscribeToHash(onStoreChange: () => void) {
  const onClick = (event: MouseEvent) => {
    const anchor = (event.target as Element | null)?.closest("a");
    if (!anchor?.getAttribute("href")?.includes("#")) {
      return;
    }
    // 0ms if the hash is already updated; 50ms if the router is still pushing.
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

/** Compact window: 1 … 4 5 6 … 11. Small totals print every page. */
function visiblePages(current: number, total: number): Array<number | "ellipsis"> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const show = new Set([1, total, current - 1, current, current + 1]);
  const nums = [...show]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);

  const items: Array<number | "ellipsis"> = [];
  let previous = 0;
  for (const page of nums) {
    if (previous && page - previous > 1) {
      items.push("ellipsis");
    }
    items.push(page);
    previous = page;
  }
  return items;
}

/** Page state lives here so a new `key={chapter.id}` remounts at page 1. */
function ChapterDeck({ chapter, cards }: ChapterDeckProps) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(cards.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageCards = cards.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const start = cards.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const end = Math.min(currentPage * PAGE_SIZE, cards.length);
  const hashHref = `#${chapter.id}`;
  const atFirst = currentPage <= 1;
  const atLast = currentPage >= totalPages;

  function goToPage(next: number) {
    setPage(Math.min(Math.max(next, 1), totalPages));
    // Keep the heading in view when the pager sits below the grid.
    document.getElementById(chapter.id)?.scrollIntoView({ block: "start" });
  }

  return (
    <section
      id={chapter.id}
      aria-label={chapterHeading(chapter)}
      className="mx-auto flex max-w-6xl scroll-mt-32 flex-col gap-4 p-4"
    >
      <Card>
        <CardHeader>
          <CardTitle>{chapterHeading(chapter)}</CardTitle>
          <CardDescription>
            {cards.length === 0
              ? "No cards in this chapter."
              : `${start}–${end} of ${cards.length} · click a card to flip`}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pageCards.map((card) => (
          <DefinitionFlipCard key={card.id} card={card} />
        ))}
      </div>

      {totalPages > 1 ? (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={hashHref}
                aria-disabled={atFirst}
                tabIndex={atFirst ? -1 : undefined}
                className={atFirst ? "pointer-events-none opacity-50" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  if (!atFirst) {
                    goToPage(currentPage - 1);
                  }
                }}
              />
            </PaginationItem>

            {visiblePages(currentPage, totalPages).map((item, index) =>
              item === "ellipsis" ? (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem key={item}>
                  <PaginationLink
                    href={hashHref}
                    isActive={item === currentPage}
                    onClick={(event) => {
                      event.preventDefault();
                      goToPage(item);
                    }}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            <PaginationItem>
              <PaginationNext
                href={hashHref}
                aria-disabled={atLast}
                tabIndex={atLast ? -1 : undefined}
                className={atLast ? "pointer-events-none opacity-50" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  if (!atLast) {
                    goToPage(currentPage + 1);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </section>
  );
}

/**
 * One chapter at a time (hash from Navbar), then paginate that chapter's cards.
 * Keeps app/dashboard/cards/page.tsx as a data-loading server wrapper.
 */
export default function CardsPager({ chapters, definitions }: CardsPagerProps) {
  const hash = useSyncExternalStore(subscribeToHash, hashSnapshot, () => "");
  const chapterId = chapterIdFromHash(hash, chapters);

  // Group once; 683 cards is cheap but this avoids reshuffling on every flip/page click.
  const cardsByChapter = useMemo(() => {
    const grouped = new Map<string, DefinitionCard[]>();
    for (const definition of definitions) {
      const bucket = grouped.get(definition.chapterId);
      if (bucket) {
        bucket.push(definition);
      } else {
        grouped.set(definition.chapterId, [definition]);
      }
    }
    return grouped;
  }, [definitions]);

  const chapter =
    chapters.find((item) => item.id === chapterId) ?? chapters[0];

  if (!chapter) {
    return (
      <section className="mx-auto max-w-6xl p-4">
        <Empty>
          <EmptyHeader>
            <EmptyTitle>Cards</EmptyTitle>
            <EmptyDescription>No chapters to show.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </section>
    );
  }

  return (
    <ChapterDeck
      key={chapter.id}
      chapter={chapter}
      cards={cardsByChapter.get(chapter.id) ?? []}
    />
  );
}
