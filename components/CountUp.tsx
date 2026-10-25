"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

export default function CountUp({
  value,
  suffix = "",
  duration = 1100,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const start = () => {
      const started = performance.now();

      const tick = (now: number) => {
        const progress = Math.min(1, (now - started) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(value * eased));

        if (progress < 1) frame = requestAnimationFrame(tick);
      };

      frame = requestAnimationFrame(tick);
    };

    const rect = node.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      start();
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        start();
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
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
