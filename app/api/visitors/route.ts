import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const NAMESPACE = process.env.VISITOR_NAMESPACE ?? "saad-dev-portfolio";
const KEY = "site-visits";

export async function GET(request: Request) {
  try {
    const readOnly = new URL(request.url).searchParams.get("mode") === "read";
    const action = readOnly ? "get" : "hit";
    const response = await fetch(
      `https://abacus.jasoncameron.dev/${action}/${encodeURIComponent(NAMESPACE)}/${KEY}`,
      {
        cache: "no-store",
        headers: { "User-Agent": "saad-dev-portfolio" },
      }
    );

    if (!response.ok) {
      throw new Error(`Counter responded with ${response.status}`);
    }

    const data: unknown = await response.json();
    const value =
      typeof data === "object" && data !== null && "value" in data
        ? Number((data as { value: unknown }).value)
        : NaN;

    if (!Number.isFinite(value)) {
      throw new Error("Counter returned no value");
    }

    return NextResponse.json(
      { count: value },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { count: null },
      { headers: { "Cache-Control": "no-store" } }
    );
  }
}
