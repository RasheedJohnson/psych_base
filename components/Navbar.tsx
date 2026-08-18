"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Chapter } from "@/lib/types";

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

/** 00–16 for numbered chapters; C for unnumbered extras (appendix). */
function chapterLabel(chapter: Chapter): string {
  if (chapter.number === null) {
    return "C";
  }
  return String(chapter.number).padStart(2, "0");
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
  size?: "sm" | "xs";
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

function ChapterButtons({
  chapters,
  pathname,
  onNavigate,
}: {
  chapters: Chapter[];
  pathname: string;
  onNavigate: () => void;
}) {
  return chapters.map((chapter) => (
    <NavButton
      key={chapter.id}
      href={chapterHref(pathname, chapter.id)}
      size="xs"
      variant="outline"
      title={chapter.title}
      onNavigate={onNavigate}
    >
      {chapterLabel(chapter)}
    </NavButton>
  ));
}

const Navbar = ({ chapters }: NavbarProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav
      aria-label="Main"
      className="sticky top-0 z-20 bg-card shadow-sm"
    >
      {/* Brand + primary routes + mobile toggle */}
      <div className="flex items-center justify-between gap-3 p-3">
        <NavButton href="/" variant="default" onNavigate={closeMenu}>
          V&apos;s PsychDB
        </NavButton>

        {/* Routes stay on the right with the theme toggle; hamburger is mobile-only. */}
        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <RouteButtons pathname={pathname} onNavigate={closeMenu} />
          </div>

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

      {/* Desktop chapter catalog */}
      <div className="hidden md:block">
        <Separator />
        <div className="flex flex-wrap gap-2 p-3">
          <ChapterButtons
            chapters={chapters}
            pathname={pathname}
            onNavigate={closeMenu}
          />
        </div>
      </div>

      {/* Mobile menu: same Button markup, no Sheet */}
      {open ? (
        <div id="nav-menu" className="flex flex-col gap-3 p-3 md:hidden">
          <Separator />
          <div className="flex flex-wrap gap-2">
            <RouteButtons pathname={pathname} onNavigate={closeMenu} />
          </div>
          <Separator />
          <div className="flex flex-wrap gap-2">
            <ChapterButtons
              chapters={chapters}
              pathname={pathname}
              onNavigate={closeMenu}
            />
          </div>
        </div>
      ) : null}

      {/* Bottom edge is a Separator so the bar does not need a one-off border-b. */}
      <Separator />
    </nav>
  );
};

export default Navbar;
