import { NextResponse } from "next/server";

export const revalidate = 3600;

const USERNAME = "code-with-saad";
const TIMEOUT_MS = 8000;

type ContributionDay = { date: string; level: number };

type GitHubPayload = {
  login: string;
  repos: number | null;
  followers: number | null;
  stars: number | null;
  contributions: number | null;
  days: ContributionDay[] | null;
};

function apiHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "saad-dev-portfolio",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function fetchProfile() {
  const response = await fetch(`https://api.github.com/users/${USERNAME}`, {
    headers: apiHeaders(),
    next: { revalidate },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`GitHub profile responded with ${response.status}`);
  }

  const data = (await response.json()) as {
    public_repos?: number;
    followers?: number;
  };

  return {
    repos: Number.isFinite(data.public_repos) ? Number(data.public_repos) : null,
    followers: Number.isFinite(data.followers) ? Number(data.followers) : null,
  };
}

async function fetchStars() {
  const response = await fetch(
    `https://api.github.com/users/${USERNAME}/repos?per_page=100&type=owner&sort=updated`,
    {
      headers: apiHeaders(),
      next: { revalidate },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub repositories responded with ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("GitHub repositories returned no list");
  }

  return data.reduce(
    (total, repo) =>
      total +
      (typeof repo === "object" &&
      repo !== null &&
      "stargazers_count" in repo &&
      Number.isFinite(Number(repo.stargazers_count))
        ? Number(repo.stargazers_count)
        : 0),
    0
  );
}

async function fetchContributions() {
  const response = await fetch(
    `https://github.com/users/${USERNAME}/contributions`,
    {
      headers: { "User-Agent": "saad-dev-portfolio" },
      next: { revalidate },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    }
  );

  if (!response.ok) {
    throw new Error(`Contribution graph responded with ${response.status}`);
  }

  const html = await response.text();
  const total = html.match(
    /([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i
  );

  const days: ContributionDay[] = [];

  for (const tag of html.match(/<td[^>]*ContributionCalendar-day[^>]*>/g) ?? []) {
    const date = tag.match(/data-date="(\d{4}-\d{2}-\d{2})"/)?.[1];
    const level = tag.match(/data-level="([0-4])"/)?.[1];

    if (date && level) {
      days.push({ date, level: Number(level) });
    }
  }

  if (days.length < 100) {
    throw new Error("Contribution graph was empty");
  }

  days.sort((a, b) => a.date.localeCompare(b.date));

  return {
    contributions: total ? Number(total[1].replace(/,/g, "")) : null,
    days,
  };
}

export async function GET() {
  const [profile, stars, activity] = await Promise.allSettled([
    fetchProfile(),
    fetchStars(),
    fetchContributions(),
  ]);

  const payload: GitHubPayload = {
    login: USERNAME,
    repos: profile.status === "fulfilled" ? profile.value.repos : null,
    followers: profile.status === "fulfilled" ? profile.value.followers : null,
    stars: stars.status === "fulfilled" ? stars.value : null,
    contributions:
      activity.status === "fulfilled" ? activity.value.contributions : null,
    days: activity.status === "fulfilled" ? activity.value.days : null,
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
