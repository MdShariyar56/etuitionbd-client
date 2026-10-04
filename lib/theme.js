"use client";

import { useCallback, useSyncExternalStore } from "react";
import { THEME_KEY, THEMES } from "./themeScript";

function subscribe(callback) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getSnapshot = () => (document.documentElement.getAttribute("data-theme") === THEMES.dark ? "dark" : "light");
const getServerSnapshot = () => "light";

export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", THEMES[theme]);
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const toggle = useCallback(() => applyTheme(theme === "dark" ? "light" : "dark"), [theme]);
  return { theme, toggle };
}

const CHART = {
  light: { primary: "#4f46e5", secondary: "#f59e0b", accent: "#0d9488", grid: "#e4e8f2", text: "#64748b" },
  dark: { primary: "#818cf8", secondary: "#fbbf24", accent: "#2dd4bf", grid: "#1f2a44", text: "#94a3b8" },
};

export function useChartColors() {
  const { theme } = useTheme();
  return CHART[theme];
}
