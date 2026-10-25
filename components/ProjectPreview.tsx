"use client";

import Image from "next/image";
import { useState } from "react";

type ProjectPreviewProps = {
  name: string;
  images: string[];
  host: string | null;
};

export default function ProjectPreview({
  name,
  images,
  host,
}: ProjectPreviewProps) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-line bg-surface">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-line-strong" />
            <span className="h-2 w-2 rounded-full bg-line-strong" />
            <span className="h-2 w-2 rounded-full bg-line-strong" />
          </span>
          <span className="ml-3 min-w-0 truncate rounded border border-line bg-canvas px-2 py-1 font-mono text-[10px] leading-none text-muted">
            {host ?? "Preview"}
          </span>
        </div>

        <div className="relative aspect-[16/10] w-full bg-surface-2">
          {current ? (
            <Image
              key={current}
              src={current}
              alt={
                images.length > 1
                  ? `${name} screenshot ${active + 1}`
                  : `${name} screenshot`
              }
              fill
              priority
              sizes="(min-width: 900px) 900px, 100vw"
              quality={90}
              className="object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                {name}
              </span>
            </div>
          )}
        </div>
      </div>

      {images.length > 1 ? (
        <div
          role="group"
          aria-label={`${name} screenshots`}
          className="mt-3 flex flex-wrap gap-2.5"
        >
          {images.map((src, index) => {
            const isActive = index === active;

            return (
              <button
                key={src}
                type="button"
                aria-label={`Show screenshot ${index + 1}`}
                aria-pressed={isActive}
                onClick={() => setActive(index)}
                className={`relative h-14 w-20 overflow-hidden rounded-md border bg-surface-2 transition-colors ${
                  isActive
                    ? "border-accent"
                    : "border-line hover:border-line-strong"
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas`}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
