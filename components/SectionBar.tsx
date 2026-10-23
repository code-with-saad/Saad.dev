"use client";

import { useEffect, useRef } from "react";
import { SECTIONS } from "@/data/sections";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function SectionBar() {
  const [active] = useActiveSection();
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const item = scroller.querySelector<HTMLElement>(
      `[data-section="${active}"]`
    );
    if (!item) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const left =
      scroller.scrollLeft +
      itemRect.left -
      scrollerRect.left -
      (scrollerRect.width - itemRect.width) / 2;

    scroller.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [active]);

  return (
    <div className="sticky top-[73px] z-30 border-b border-line bg-canvas min-[900px]:top-0">
      <div className="px-5 min-[900px]:pl-[78px] min-[900px]:pr-10">
        <div className="min-[900px]:max-w-[900px]">
          <nav aria-label="Section shortcuts">
            <div
              ref={scrollerRef}
              className="section-scroll flex overflow-x-auto pb-1.5"
            >
              {SECTIONS.map((item) => {
                const isActive = active === item.id;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    data-section={item.id}
                    aria-current={isActive ? "location" : undefined}
                    className="relative flex h-12 shrink-0 items-center gap-2 px-3 text-[13px] transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                  >
                    <span
                      className={`font-mono text-[10px] tracking-[0.06em] ${
                        isActive ? "text-accent" : "text-muted"
                      }`}
                    >
                      {item.index}
                    </span>
                    <span
                      className={
                        isActive ? "font-semibold text-ink" : "text-muted"
                      }
                    >
                      {item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-0 h-[2px] ${
                        isActive ? "bg-accent" : "bg-transparent"
                      }`}
                    />
                  </a>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
