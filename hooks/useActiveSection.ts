"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "@/data/sections";

const ACTIVATION_LINE = 150;

export function useActiveSection() {
  const [active, setActive] = useState(SECTIONS[0].id);

  useEffect(() => {
    const sections = SECTIONS.map(({ id }) =>
      document.getElementById(id)
    ).filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;

      const atBottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight - 2;

      if (atBottom) {
        setActive(SECTIONS[SECTIONS.length - 1].id);
        return;
      }

      let next = sections[0].id;

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= ACTIVATION_LINE) {
          next = section.id;
        }
      }

      setActive(next);
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return [active, setActive] as const;
}
