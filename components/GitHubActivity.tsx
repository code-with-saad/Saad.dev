"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { LuArrowUpRight, LuGithub } from "react-icons/lu";
import CountUp from "@/components/CountUp";

type ContributionDay = { date: string; level: number };

type GitHubPayload = {
  login: string;
  repos: number | null;
  followers: number | null;
  stars: number | null;
  contributions: number | null;
  days: ContributionDay[] | null;
};

type Layout = {
  weeks: (ContributionDay | null)[][];
  months: { index: number; label: string }[];
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const CELL = 10;
const GAP = 3;
const PITCH = CELL + GAP;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

const LEVELS = [
  "bg-line/60",
  "bg-accent/30",
  "bg-accent/55",
  "bg-accent/80",
  "bg-accent",
];

function buildLayout(days: ContributionDay[]): Layout {
  const start = new Date(`${days[0].date}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() - start.getUTCDay());

  const weeks: (ContributionDay | null)[][] = [];

  for (const day of days) {
    const date = new Date(`${day.date}T00:00:00Z`);
    const index = Math.floor((date.getTime() - start.getTime()) / WEEK_MS);

    while (weeks.length <= index) {
      weeks.push(Array<ContributionDay | null>(7).fill(null));
    }

    weeks[index][date.getUTCDay()] = day;
  }

  const months: Layout["months"] = [];
  let lastMonth = -1;
  let lastLabel = -10;

  weeks.forEach((week, index) => {
    const first = week.find((day): day is ContributionDay => day !== null);
    if (!first) return;

    const month = new Date(`${first.date}T00:00:00Z`).getUTCMonth();
    if (month === lastMonth) return;

    lastMonth = month;

    if (index === 0 || index - lastLabel < 3) return;

    months.push({ index, label: MONTHS[month] });
    lastLabel = index;
  });

  return { weeks, months };
}

export default function GitHubActivity() {
  const [data, setData] = useState<GitHubPayload | null>(null);
  const [failed, setFailed] = useState(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/github", { signal: controller.signal })
      .then((response) =>
        response.ok ? response.json() : Promise.reject(new Error("Request failed"))
      )
      .then((payload: GitHubPayload) => setData(payload))
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      });

    return () => controller.abort();
  }, []);

  const layout = useMemo(() => {
    const days = data?.days;
    if (!days || days.length === 0) return null;
    return buildLayout(days);
  }, [data]);

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollLeft = node.scrollWidth;
  }, [layout]);

  const stats: { label: string; value: number }[] = [];

  if (typeof data?.contributions === "number") {
    stats.push({ label: "Contributions", value: data.contributions });
  }
  if (typeof data?.repos === "number") {
    stats.push({ label: "Repositories", value: data.repos });
  }
  if (typeof data?.followers === "number") {
    stats.push({ label: "Followers", value: data.followers });
  }
  if (typeof data?.stars === "number") {
    stats.push({ label: "Stars earned", value: data.stars });
  }

  if (failed || (data && !layout && stats.length === 0)) return null;

  const login = data?.login ?? "code-with-saad";

  return (
    <div className="rounded-xl border border-line bg-surface p-4 min-[560px]:p-5">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <h3 className="eyebrow text-muted">
          <LuGithub className="h-4 w-4 text-accent" aria-hidden="true" />
          GitHub activity
        </h3>
        <a
          href={`https://github.com/${login}`}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1 font-mono text-[11px] text-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
        >
          @{login}
          <LuArrowUpRight
            className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </div>

      {!data && !failed ? (
        <>
          <div className="mt-5 grid grid-cols-2 gap-4 min-[560px]:grid-cols-4">
            {[0, 1, 2, 3].map((key) => (
              <div key={key} className="h-8 animate-pulse rounded bg-surface-2" />
            ))}
          </div>
          <div className="mt-5 h-[84px] animate-pulse rounded bg-surface-2" />
        </>
      ) : null}

      {stats.length > 0 ? (
        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 min-[560px]:grid-cols-4">
          {stats.map(({ label, value }) => (
            <div key={label}>
              <p className="font-display text-[22px] font-semibold leading-none text-ink">
                <CountUp value={value} />
              </p>
              <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                {label}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      {layout ? (
        <>
          <div
            ref={scrollerRef}
            className="mt-5 overflow-x-auto pb-1 sm:[scrollbar-width:thin]"
          >
            <div className="w-max">
              <div
                className="relative mb-1.5 h-3"
                style={{ width: layout.weeks.length * PITCH + 18 }}
              >
                {layout.months.map(({ index, label }) => (
                  <span
                    key={`${label}-${index}`}
                    className="absolute top-0 font-mono text-[9px] uppercase leading-none tracking-[0.08em] text-muted"
                    style={{ left: index * PITCH }}
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div
                className="flex gap-[3px]"
                role="img"
                aria-label={`GitHub contribution graph for the last year${
                  typeof data?.contributions === "number"
                    ? `, ${data.contributions} contributions`
                    : ""
                }`}
              >
                {layout.weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[3px]">
                    {week.map((day, dayIndex) =>
                      day ? (
                        <span
                          key={day.date}
                          title={day.date}
                          className={`h-2.5 w-2.5 rounded-[2px] ${
                            LEVELS[day.level] ?? LEVELS[0]
                          }`}
                        />
                      ) : (
                        <span
                          key={`empty-${weekIndex}-${dayIndex}`}
                          className="h-2.5 w-2.5"
                        />
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
              Last 12 months
            </p>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                Less
              </span>
              {LEVELS.map((tone) => (
                <span
                  key={tone}
                  aria-hidden="true"
                  className={`h-2 w-2 rounded-[1px] ${tone}`}
                />
              ))}
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                More
              </span>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
