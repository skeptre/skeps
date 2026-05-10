export const THEME_STORAGE_KEY = "theme-preference";

export type ThemePreference = "auto" | "light" | "dark";

/** Dark from 18:00 inclusive through 05:59 (local time). */
export function isAutoDarkFromHour(hour: number): boolean {
  return hour >= 18 || hour < 6;
}

export function getEffectiveTheme(
  preference: ThemePreference | null,
  date: Date = new Date(),
): "light" | "dark" {
  const hour = date.getHours();
  if (preference === "light") return "light";
  if (preference === "dark") return "dark";
  return isAutoDarkFromHour(hour) ? "dark" : "light";
}

export function applyDocumentTheme(theme: "light" | "dark") {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function loadStoredPreference(): ThemePreference {
  if (typeof window === "undefined") return "auto";
  const raw = localStorage.getItem(THEME_STORAGE_KEY);
  if (raw === "light" || raw === "dark" || raw === "auto") return raw;
  return "auto";
}

export function savePreference(preference: ThemePreference) {
  localStorage.setItem(THEME_STORAGE_KEY, preference);
}

export const THEME_BOOTSTRAP_SCRIPT = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var p=localStorage.getItem(k);var h=new Date().getHours();var a=h>=18||h<6;var d=p==="dark"?true:p==="light"?false:a;document.documentElement.classList.toggle("dark",d);}catch(e){}})();`;
