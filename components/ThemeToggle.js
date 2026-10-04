"use client";

import { LuMoon, LuSun } from "react-icons/lu";
import { applyTheme, useTheme } from "@/lib/theme";

export default function ThemeToggle({ className = "" }) {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const onClick = (e) => {
    const next = document.documentElement.getAttribute("data-theme") === "etuition-dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) return applyTheme(next);

    const x = e.clientX || window.innerWidth / 2;
    const y = e.clientY || 0;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const transition = document.startViewTransition(() => applyTheme(next));
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className={`theme-toggle btn btn-ghost btn-circle btn-sm relative overflow-hidden border border-base-300 ${className}`}
    >
      <LuMoon className="tt-moon absolute text-base text-primary" />
      <LuSun className="tt-sun absolute text-base text-secondary" />
    </button>
  );
}
