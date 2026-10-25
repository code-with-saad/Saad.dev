"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "portfolio-visit-count";
const SEEN_KEY = "portfolio-visited";

function hasVisited() {
  try {
    return localStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
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
    // Only the first visit from a browser bumps the shared total; later views
    // just read it, so reloads cannot inflate the count.
    const url = hasVisited() ? "/api/visitors?mode=read" : "/api/visitors";

    fetch(url, { signal: controller.signal })
      .then((response) => response.json())
      .then((data: { count?: number | null }) => {
        if (typeof data.count !== "number") return;

        try {
          localStorage.setItem(SEEN_KEY, "1");
        } catch {}

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
          <span className="text-ink">{count.toLocaleString("en-US")}</span>{" "}
          {count === 1 ? "visit" : "visits"} so far
        </>
      )}
    </p>
  );
}
