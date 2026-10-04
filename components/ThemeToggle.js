"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa6";
import { applyTheme, useTheme } from "@/lib/theme";

export default function ThemeToggle({ className = "" }) {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const onClick = (e) => {
    const next = dark ? "light" : "dark";
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
      className={`btn btn-ghost btn-circle btn-sm overflow-hidden border border-base-300 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: -16, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: 16, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="grid place-items-center text-base"
        >
          {dark ? <FaSun className="text-secondary" /> : <FaMoon className="text-primary" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
