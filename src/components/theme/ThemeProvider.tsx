"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  applyDocumentTheme,
  getEffectiveTheme,
  loadStoredPreference,
  savePreference,
  type ThemePreference,
} from "@/lib/theme";

type ThemeContextValue = {
  preference: ThemePreference;
  setPreference: (next: ThemePreference) => void;
  effective: "light" | "dark";
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useThemeMode() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useThemeMode must be used within ThemeProvider");
  }
  return ctx;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<ThemePreference>("auto");

  useEffect(() => {
    setPreferenceState(loadStoredPreference());
  }, []);

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next);
    savePreference(next);
    applyDocumentTheme(getEffectiveTheme(next));
  }, []);

  /** Re-evaluate auto mode on timer and when tab regains focus. */
  useEffect(() => {
    const sync = () => {
      const p = loadStoredPreference();
      setPreferenceState(p);
      applyDocumentTheme(getEffectiveTheme(p));
    };

    const id = window.setInterval(() => {
      const p = loadStoredPreference();
      if (p === "auto") {
        applyDocumentTheme(getEffectiveTheme("auto"));
      }
    }, 30_000);

    window.addEventListener("focus", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.clearInterval(id);
      window.removeEventListener("focus", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    applyDocumentTheme(getEffectiveTheme(preference));
  }, [preference]);

  const value = useMemo(
    () => ({
      preference,
      setPreference,
      effective: getEffectiveTheme(preference),
    }),
    [preference, setPreference],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
