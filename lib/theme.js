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
  light: { primary: "#db2777", secondary: "#f97316", accent: "#0d9488", grid: "#f4e3db", text: "#8a7380" },
  dark: { primary: "#f472b6", secondary: "#fb923c", accent: "#2dd4bf", grid: "#3a2633", text: "#b8a3ae" },
};

export function useChartColors() {
  const { theme } = useTheme();
  return CHART[theme];
}
