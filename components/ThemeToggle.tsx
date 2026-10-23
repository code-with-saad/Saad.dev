"use client";

import { useEffect, useSyncExternalStore } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

type Theme = "dark" | "light";

const STORAGE_KEY = "theme";
const SWITCH_MS = 240;
const listeners = new Set<() => void>();
let switchTimer: ReturnType<typeof setTimeout> | undefined;

function systemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: Theme, animate = true) {
  const root = document.documentElement;

  if (animate) {
    root.classList.add("theme-switching");
    if (switchTimer) clearTimeout(switchTimer);
    switchTimer = setTimeout(() => {
      root.classList.remove("theme-switching");
    }, SWITCH_MS + 20);
  }

  root.dataset.theme = theme;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    applyTheme(event.newValue === "light" ? "light" : "dark");
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    applyTheme(readStoredTheme() ?? systemTheme(), false);
  }, []);

  const nextTheme: Theme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      applyTheme(nextTheme);
      return;
    }
    applyTheme(nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${nextTheme} theme`}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-line-strong hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${className}`}
    >
      {theme === "dark" ? (
        <LuSun
          className="h-4 w-4"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      ) : (
        <LuMoon
          className="h-4 w-4"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      )}
    </button>
  );
}
