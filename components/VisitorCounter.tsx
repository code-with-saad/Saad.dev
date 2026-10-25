"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "portfolio-visit-count";

function ordinal(value: number) {
  const mod100 = value % 100;
  if (mod100 >= 11 && mod100 <= 13) return "th";

  switch (value % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const cached = Number(sessionStorage.getItem(SESSION_KEY));

    if (Number.isFinite(cached) && cached > 0) {
      const frame = requestAnimationFrame(() => setCount(cached));
      return () => cancelAnimationFrame(frame);
    }

    const controller = new AbortController();

    fetch("/api/visitors", { signal: controller.signal })
      .then((response) => response.json())
      .then((data: { count?: number | null }) => {
        if (typeof data.count !== "number") return;
        sessionStorage.setItem(SESSION_KEY, String(data.count));
        setCount(data.count);
      })
      .catch(() => {});

    return () => controller.abort();
  }, []);

  return (
    <p
      aria-live="polite"
      className="min-h-[14px] font-mono text-[10px] leading-relaxed text-muted"
    >
      {count === null ? null : (
        <>
          You&apos;re the{" "}
          <span className="text-ink">
            {count.toLocaleString("en-US")}
            {ordinal(count)}
          </span>{" "}
          visitor
        </>
      )}
    </p>
  );
}
