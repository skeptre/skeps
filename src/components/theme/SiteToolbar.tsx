"use client";

import ThemeToggle from "./ThemeToggle";
import TimeZoneClock from "./TimeZoneClock";

export default function SiteToolbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm dark:bg-zinc-950/95">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-8 sm:py-4 lg:px-10">
        <TimeZoneClock />
        <ThemeToggle />
      </div>
    </header>
  );
}
