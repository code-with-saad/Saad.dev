"use client";

import {
  LuCircleHelp,
  LuLayers,
  LuLayoutGrid,
  LuMail,
  LuUser,
} from "react-icons/lu";
import { useActiveSection } from "@/hooks/useActiveSection";

const ITEMS = [
  { id: "about", label: "About", Icon: LuUser },
  { id: "work", label: "Work", Icon: LuLayoutGrid },
  { id: "stack", label: "Stack", Icon: LuLayers },
  { id: "faq", label: "FAQ", Icon: LuCircleHelp },
  { id: "contact", label: "Contact", Icon: LuMail },
];

export default function MobileNav() {
  const [active, setActive] = useActiveSection();

  return (
    <nav
      aria-label="Quick navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas pb-[env(safe-area-inset-bottom)] min-[900px]:hidden"
    >
      <ul className="grid h-14 grid-cols-5">
        {ITEMS.map(({ id, label, Icon }) => {
          const isActive = active === id;

          return (
            <li key={id} className="min-w-0">
              <a
                href={`#${id}`}
                onClick={() => setActive(id)}
                aria-current={isActive ? "location" : undefined}
                className={`relative flex h-full flex-col items-center justify-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent ${
                  isActive ? "text-accent" : "text-muted hover:text-ink"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-1/2 top-0 h-[2px] w-6 -translate-x-1/2 ${
                    isActive ? "bg-accent" : "bg-transparent"
                  }`}
                />
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                <span className="font-mono text-[9px] uppercase leading-none tracking-[0.12em]">
                  {label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
