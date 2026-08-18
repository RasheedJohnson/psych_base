"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

/**
 * Outline icon Button that flips light/dark.
 * Both icons stay in the DOM; the unused one is hidden with the existing
 * `.dark` variant so the painted icon matches the class on <html> immediately.
 * The click reads that class (not useTheme state) so the first tap is correct
 * even before next-themes finishes hydrating.
 */
export default function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      aria-label="Toggle color theme"
      onClick={() => {
        const isDark = document.documentElement.classList.contains("dark");
        setTheme(isDark ? "light" : "dark");
      }}
    >
      <Sun className="dark:hidden" />
      <Moon className="hidden dark:block" />
    </Button>
  );
}
