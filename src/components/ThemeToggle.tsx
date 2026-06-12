"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Sunucu/istemci uyumsuzluğunu önlemek için mount olana kadar boş yer tut.
  if (!mounted) return <div className="h-10 w-10" aria-hidden />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Açık temaya geç" : "Koyu temaya geç"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1a3a5c]/15 text-[#0f1a3a] transition-colors hover:bg-[#f5c518]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5c518] dark:border-white/15 dark:text-[#f5c518] dark:hover:bg-white/10"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
