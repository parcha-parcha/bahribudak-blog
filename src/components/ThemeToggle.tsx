"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    let saved: string | null = null;

    try {
      saved = localStorage.getItem("theme");
    } catch {}

    const isDark = saved === "dark";
    document.documentElement.classList.toggle("dark", isDark);

    const timer = window.setTimeout(() => {
      setDark(isDark);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);

    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}

    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Açık temaya geç" : "Koyu temaya geç"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E2DA] text-[#111315] transition-colors hover:border-[#E45A2B] hover:bg-[#F6F4EF] dark:border-white/15 dark:text-[#E45A2B] dark:hover:bg-white/10"
    >
      {dark ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
