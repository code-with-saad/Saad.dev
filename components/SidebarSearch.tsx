"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { LuSearch } from "react-icons/lu";
import { SECTIONS } from "@/data/sections";

const RESULTS_ID = "sidebar-search-results";

export default function SidebarSearch() {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    if (!needle) return SECTIONS;

    return SECTIONS.filter((item) =>
      `${item.index} ${item.label}`.toLowerCase().includes(needle)
    );
  }, [query]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (
        !(event.ctrlKey || event.metaKey) ||
        event.altKey ||
        event.shiftKey ||
        event.key.toLowerCase() !== "k"
      ) {
        return;
      }

      const input = inputRef.current;

      if (!input || input.offsetParent === null) return;

      event.preventDefault();
      setOpen(true);
      input.focus();
      input.select();
    };

    window.addEventListener("keydown", handleShortcut);

    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () =>
      document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const goTo = (id: string) => {
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", `#${id}`);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      inputRef.current?.blur();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (!open) {
        setOpen(true);
        setActiveIndex(0);
        return;
      }

      setActiveIndex((index) =>
        results.length === 0 ? 0 : (index + 1) % results.length
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (!open) {
        setOpen(true);
        setActiveIndex(Math.max(0, results.length - 1));
        return;
      }

      setActiveIndex((index) =>
        results.length === 0
          ? 0
          : (index - 1 + results.length) % results.length
      );
      return;
    }

    if (event.key === "Enter" && open && results[activeIndex]) {
      event.preventDefault();
      goTo(results[activeIndex].id);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative mt-5"
      onBlur={(event) => {
        const next = event.relatedTarget;

        if (!(next instanceof Node) || !event.currentTarget.contains(next)) {
          setOpen(false);
        }
      }}
    >
      <label className="flex h-10 cursor-text items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-muted transition-colors focus-within:border-line-strong">
        <LuSearch className="h-4 w-4 shrink-0" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search"
          aria-label="Search sections"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={RESULTS_ID}
          aria-autocomplete="list"
          aria-keyshortcuts="Control+K"
          aria-activedescendant={
            open && results[activeIndex]
              ? `search-option-${results[activeIndex].id}`
              : undefined
          }
          autoComplete="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
        />
        <kbd className="shrink-0 rounded border border-line bg-canvas px-1.5 py-0.5 font-mono text-[10px] leading-none text-muted">
          Ctrl K
        </kbd>
      </label>

      {open && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 overflow-hidden rounded-lg border border-line bg-surface">
          <ul
            id={RESULTS_ID}
            role="listbox"
            aria-label="Search results"
            className="max-h-64 overflow-y-auto py-1"
          >
            {results.length === 0 ? (
              <li role="presentation" className="px-3 py-2 text-sm text-muted">
                No sections found.
              </li>
            ) : (
              results.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <li
                    key={item.id}
                    id={`search-option-${item.id}`}
                    role="option"
                    aria-selected={isActive}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      goTo(item.id);
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex cursor-pointer items-center gap-3 px-3 py-2 text-sm ${
                      isActive
                        ? "bg-line text-ink"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] tracking-[0.06em] ${
                        isActive ? "text-accent" : "text-muted"
                      }`}
                    >
                      {item.index}
                    </span>
                    <span>{item.label}</span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
