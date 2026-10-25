"use client";

import { LuCat } from "react-icons/lu";
import { setOnekoEnabled, useOnekoEnabled } from "@/hooks/useOnekoPreference";

export default function OnekoToggle({
  className = "",
}: {
  className?: string;
}) {
  const enabled = useOnekoEnabled();

  return (
    <button
      type="button"
      onClick={() => setOnekoEnabled(!enabled)}
      aria-label={enabled ? "Turn off the cat" : "Turn on the cat"}
      aria-pressed={enabled}
      title={enabled ? "Cursor cat on" : "Cursor cat off"}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors hover:border-line-strong hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ${
        enabled ? "text-ink" : "text-muted"
      } ${className}`}
    >
      <span className="relative inline-flex" aria-hidden="true">
        <LuCat className="h-4 w-4" strokeWidth={1.75} />
        {!enabled && (
          <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
        )}
      </span>
    </button>
  );
}
