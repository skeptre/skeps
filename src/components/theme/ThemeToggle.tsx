"use client";

import { useEffect, useId, useRef, useState } from "react";

import type { ThemePreference } from "@/lib/theme";
import { useThemeMode } from "./ThemeProvider";

const OPTIONS: {
  value: ThemePreference;
  label: string;
  description: string;
}[] = [
  {
    value: "auto",
    label: "Automatic",
    description: "Light by day, dark by night, uses your device’s local time.",
  },
  {
    value: "light",
    label: "Light",
    description: "Always use the light theme.",
  },
  {
    value: "dark",
    label: "Dark",
    description: "Always use the dark theme.",
  },
];

function triggerSummary(pref: ThemePreference) {
  switch (pref) {
    case "auto":
      return "Auto";
    case "light":
      return "Light";
    case "dark":
      return "Dark";
  }
}

export default function ThemeToggle() {
  const { preference, setPreference } = useThemeMode();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const el = rootRef.current;
      if (el && !el.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const triggerClass =
    "inline-flex items-center gap-2 rounded-xl border-2 border-zinc-400 bg-white px-3 py-2 text-xs font-semibold text-zinc-900 shadow-sm hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800";

  const panelClass =
    "absolute right-0 top-[calc(100%+0.5rem)] z-[60] w-[min(100vw-2rem,18rem)] origin-top-right rounded-xl border-2 border-zinc-400 bg-white p-1.5 shadow-lg shadow-zinc-900/10 dark:border-zinc-600 dark:bg-zinc-900 dark:shadow-black/40";

  return (
    <div className="relative shrink-0" ref={rootRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((o) => !o)}
        className={triggerClass}
        >
          <span className="text-zinc-500 dark:text-zinc-400">Theme</span>
          <span className="tabular-nums">{triggerSummary(preference)}</span>
          <svg
            aria-hidden
          className="h-4 w-4 text-zinc-500 dark:text-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open ? (
        <div
          id={menuId}
          role="listbox"
          aria-label="Choose theme"
          className={panelClass}
        >
          {OPTIONS.map((opt) => {
            const selected = preference === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={selected}
                className={`flex w-full flex-col gap-0.5 rounded-lg px-3 py-2.5 text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                  selected
                    ? "bg-zinc-100 ring-1 ring-zinc-300 dark:bg-zinc-800 dark:ring-zinc-600"
                    : ""
                }`}
                onClick={() => {
                  setPreference(opt.value);
                  setOpen(false);
                }}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                    {opt.label}
                  </span>
                  {selected ? (
                    <span className="text-zinc-600 dark:text-zinc-300" aria-hidden>
                      ✓
                    </span>
                  ) : null}
                </span>
                <span className="text-[0.75rem] leading-snug text-zinc-500 dark:text-zinc-400">
                  {opt.description}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
