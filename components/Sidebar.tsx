"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Download, Menu, Search, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const NAME = "Muhammad Saad";
const NAME_LINES = NAME.split(" ");
const ROLE = "SOFTWARE ENGINEER";
const GITHUB_URL = "https://github.com/code-with-saad";
const LINKEDIN_URL = "https://www.linkedin.com/in/codewithsaad";
const RESUME_URL = "/resume.pdf";

const NAV_ITEMS = [
  { id: "intro", index: "00", label: "Intro" },
  { id: "about", index: "01", label: "About" },
  { id: "work", index: "02", label: "Selected work" },
  { id: "experience", index: "03", label: "Experience" },
  { id: "stack", index: "04", label: "Stack" },
  { id: "contact", index: "05", label: "Contact" },
];

type NavListProps = {
  active: string;
  size?: "md" | "lg";
  onNavigate?: (id: string) => void;
};

function NavList({ active, size = "md", onNavigate }: NavListProps) {
  return (
    <ul className="space-y-0.5">
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;

        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={() => onNavigate?.(item.id)}
              aria-current={isActive ? "location" : undefined}
              className={`group relative flex items-center gap-4 pl-10 ${
                size === "lg" ? "py-3" : "py-1.5"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 ${
                  isActive ? "bg-accent" : "bg-transparent"
                }`}
              />
              <span
                className={`font-mono text-[11px] tracking-[0.06em] ${
                  isActive ? "text-accent" : "text-muted"
                }`}
              >
                {item.index}
              </span>
              <span
                className={`${size === "lg" ? "text-xl" : "text-[15px]"} ${
                  isActive
                    ? "font-semibold text-ink"
                    : "text-muted group-hover:text-ink"
                }`}
              >
                {item.label}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function Portrait() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative w-[128px]">
      <div
        aria-hidden="true"
        className="absolute -bottom-2 -right-2 h-full w-full rounded-2xl bg-accent"
      />
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-line bg-surface-2">
        {failed ? (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-3xl font-extrabold tracking-tight text-accent">
              MS
            </span>
          </div>
        ) : (
          <Image
            src="/saad.jpg"
            alt="Portrait of Muhammad Saad"
            width={128}
            height={128}
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
}

function SidebarActions() {
  return (
    <>
      <div className="flex items-center gap-5">
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          GitHub
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          LinkedIn
        </a>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <a
          href={RESUME_URL}
          download
          className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-line bg-surface-2 px-3 text-[13px] font-medium text-ink transition-colors hover:bg-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Résumé PDF
        </a>
        <ThemeToggle />
      </div>
    </>
  );
}

export default function Sidebar() {
  const [active, setActive] = useState("intro");
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter((section): section is HTMLElement => section !== null);

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0
          );
        });

        let next = "";
        let best = 0;

        NAV_ITEMS.forEach(({ id }) => {
          const ratio = ratios.get(id) ?? 0;
          if (ratio > best) {
            best = ratio;
            next = id;
          }
        });

        if (next) setActive(next);
      },
      {
        rootMargin: "-12% 0px -60% 0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1],
      }
    );

    sections.forEach((section) => observer.observe(section));

    const handleScroll = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) setActive("contact");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 900px)");
    const handleDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    desktop.addEventListener("change", handleDesktop);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      desktop.removeEventListener("change", handleDesktop);
    };
  }, [menuOpen]);

  const navigate = (id: string) => {
    setActive(id);
    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-80 flex-col overflow-y-auto border-r border-line bg-canvas px-8 py-7 min-[900px]:flex">
        <a
          href="#intro"
          aria-label="Muhammad Saad, back to intro"
          className="block w-[128px] rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
        >
          <Portrait />
        </a>

        <h1 className="mt-7 font-display text-[40px] font-extrabold leading-[0.98] tracking-[-0.045em] text-ink">
          {NAME_LINES.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink">
          {ROLE}
        </p>

        <div className="mt-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-accent"
            />
            Open to work
          </span>
        </div>

        <div
          aria-hidden="true"
          className="mt-6 flex h-10 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm text-muted"
        >
          <Search className="h-4 w-4 shrink-0" />
          <span className="flex-1 truncate">Search</span>
          <kbd className="rounded border border-line bg-canvas px-1.5 py-0.5 font-mono text-[10px] leading-none text-muted">
            ⌘K
          </kbd>
        </div>

        <nav aria-label="Sections" className="mt-10">
          <NavList active={active} onNavigate={navigate} />
        </nav>

        <div className="mt-auto pt-10">
          <SidebarActions />
        </div>
      </aside>

      <header className="sticky top-0 z-40 border-b border-line bg-canvas min-[900px]:hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <h1 className="font-display text-lg font-extrabold tracking-tight">
            <a
              href="#intro"
              className="rounded-md text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-canvas"
            >
              {NAME}
            </a>
          </h1>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className="fixed inset-0 z-50 flex flex-col bg-canvas min-[900px]:hidden"
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <p className="font-display text-lg font-extrabold tracking-tight text-ink">
              {NAME}
            </p>
            <div className="flex items-center gap-2">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeMenu}
                aria-label="Close navigation"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <nav
            aria-label="Sections"
            className="flex-1 overflow-y-auto px-5 py-8"
          >
            <NavList active={active} size="lg" onNavigate={navigate} />
          </nav>

          <div className="border-t border-line px-5 py-6">
            <SidebarActions />
          </div>
        </div>
      )}
    </>
  );
}
