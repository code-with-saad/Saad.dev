"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

const START_DELAY = 240;

export default function CountUp({
  value,
  suffix = "",
  duration = 2200,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let timer = 0;

    const stop = () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };

    const start = () => {
      const started = performance.now();

      const tick = (now: number) => {
        const progress = Math.min(1, (now - started) / duration);
        const eased =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        setDisplay(Math.round(value * eased));

        if (progress < 1) frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
    };

    const schedule = () => {
      timer = window.setTimeout(start, START_DELAY);
    };

    const rect = node.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      schedule();
      return stop;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        schedule();
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [duration, value]);

  return (
    <span
      ref={ref}
      className={`count-up ${className}`}
      data-count-value={value}
      aria-label={`${value}${suffix}`}
    >
      <span aria-hidden="true" data-count-display className="tabular-nums">
        {display}
      </span>
      {suffix}
    </span>
  );
}
