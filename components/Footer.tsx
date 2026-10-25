import Link from "next/link";

const FOOTER_LINK_CLASS =
  "rounded-sm transition-colors duration-200 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

export default function Footer({ className = "" }: { className?: string }) {
  return (
    <footer className={`border-t border-line py-7 ${className}`}>
      <div className="flex items-center justify-between gap-4">
        <p className="font-mono text-[10px] leading-relaxed text-muted">
          &copy; 2026 Muhammad Saad
        </p>

        <nav aria-label="Legal" className="flex items-center gap-5">
          <Link
            href="/privacy"
            className={`font-mono text-[10px] text-muted ${FOOTER_LINK_CLASS}`}
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className={`font-mono text-[10px] text-muted ${FOOTER_LINK_CLASS}`}
          >
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
