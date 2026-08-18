"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useHash } from "@/hooks/use-hash";
import {
  chapterHeading,
  chapterIdFromHash,
  chapterShortLabel,
} from "@/lib/chapters";
import type { Chapter } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Primary routes. */
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/dashboard/cards", label: "Cards" },
  { href: "/dashboard/questions", label: "Questions" },
] as const;

type NavbarProps = {
  /** Catalog from getChapters() — not hardcoded title strings. */
  chapters: Chapter[];
};

/** Home is exact; other routes also match nested paths. */
function linkIsActive(href: string, pathname: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Chapter jumps follow the current content type (cards vs questions).
 */
function chapterHref(pathname: string, chapterId: string): string {
  const base = pathname.includes("question")
    ? "/dashboard/questions"
    : "/dashboard/cards";
  return `${base}#${chapterId}`;
}

function NavButton({
  href,
  active,
  size = "sm",
  variant,
  title,
  onNavigate,
  children,
}: {
  href: string;
  active?: boolean;
  size?: "sm";
  variant?: "default" | "outline";
  title?: string;
  onNavigate?: () => void;
  children: ReactNode;
}) {
  return (
    <Button
      asChild
      size={size}
      variant={variant ?? (active ? "default" : "outline")}
    >
      <Link
        href={href}
        title={title}
        aria-current={active ? "page" : undefined}
        onClick={onNavigate}
      >
        {children}
      </Link>
    </Button>
  );
}

/** Fresh node list each call so desktop and mobile trees do not share instances. */
function RouteButtons({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  return NAV_LINKS.map((link) => (
    <NavButton
      key={link.href}
      href={link.href}
      active={linkIsActive(link.href, pathname)}
      onNavigate={onNavigate}
    >
      {link.label}
    </NavButton>
  ));
}

/**
 * Chapter catalog as a dropdown. Trigger shows the short label on dashboards
 * (00–16 / C) and "Chapters" elsewhere.
 */
function ChapterMenu({
  chapters,
  pathname,
  hash,
  onNavigate,
}: {
  chapters: Chapter[];
  pathname: string;
  hash: string;
  onNavigate: () => void;
}) {
  const onDashboard = pathname.startsWith("/dashboard");
  const chapterId = chapterIdFromHash(hash, chapters);
  const current = chapters.find((chapter) => chapter.id === chapterId);
  const triggerLabel =
    onDashboard && current ? chapterShortLabel(current) : "Chapters";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" size="sm" aria-label="Chapters">
          {triggerLabel}
          <ChevronDown aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-56 max-w-[min(20rem,calc(100vw-2rem))]"
      >
        {chapters.map((chapter) => {
          const isActive = onDashboard && chapter.id === chapterId;
          return (
            <DropdownMenuItem
              key={chapter.id}
              asChild
              className={cn(
                "cursor-pointer whitespace-normal",
                isActive && "bg-primary text-primary-foreground"
              )}
            >
              <Link
                href={chapterHref(pathname, chapter.id)}
                title={chapter.title}
                aria-current={isActive ? "true" : undefined}
                onClick={onNavigate}
              >
                {chapterHeading(chapter)}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Navbar = ({ chapters }: NavbarProps) => {
  const pathname = usePathname();
  const hash = useHash();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav
      aria-label="Main"
      className="sticky top-0 z-20 bg-card shadow-sm"
    >
      {/* Brand + primary routes + chapter dropdown + mobile toggle */}
      <div className="flex items-center justify-between gap-3 p-3">
        <NavButton href="/" variant="default" onNavigate={closeMenu}>
          V&apos;s PsychDB
        </NavButton>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <RouteButtons pathname={pathname} onNavigate={closeMenu} />
          </div>

          <ChapterMenu
            chapters={chapters}
            pathname={pathname}
            hash={hash}
            onNavigate={closeMenu}
          />

          <ThemeToggle />

          <Button
            type="button"
            size="icon"
            variant="outline"
            className="md:hidden"
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((isOpen) => !isOpen)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile menu: primary routes only — chapters stay in the top bar. */}
      {open ? (
        <div id="nav-menu" className="flex flex-col gap-3 p-3 md:hidden">
          <Separator />
          <div className="flex flex-wrap gap-2">
            <RouteButtons pathname={pathname} onNavigate={closeMenu} />
          </div>
        </div>
      ) : null}

      {/* Bottom edge is a Separator so the bar does not need a one-off border-b. */}
      <Separator />
    </nav>
  );
};

export default Navbar;
