"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { navigateWithReveal } from "@/lib/reveal";

type RevealLinkProps = {
  href: string;
  revealSelector: string;
  className?: string;
  "aria-label"?: string;
  children: ReactNode;
};

export default function RevealLink({
  href,
  revealSelector,
  className,
  "aria-label": ariaLabel,
  children,
}: RevealLinkProps) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();

    navigateWithReveal({
      navigate: () => router.push(href),
      selector: revealSelector,
    });
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  );
}
