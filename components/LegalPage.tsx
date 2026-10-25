import type { ReactNode } from "react";
import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";
import Footer from "@/components/Footer";

type LegalPageProps = {
  title: string;
  children: ReactNode;
};

export default function LegalPage({ title, children }: LegalPageProps) {
  return (
    <div className="min-h-screen bg-canvas px-5 py-8 min-[900px]:px-10 min-[900px]:py-14">
      <div className="mx-auto max-w-[760px]">
        <header className="flex items-center justify-between gap-4 border-b border-line pb-5">
          <span className="font-display text-[16px] font-bold tracking-[-0.03em] text-ink min-[400px]:text-[17px]">
            Muhammad Saad
          </span>
          <Link
            href="/"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-sm font-mono text-[10px] uppercase tracking-[0.16em] text-muted transition-colors duration-200 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            <LuArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to portfolio
          </Link>
        </header>

        <main id="main-content" className="pt-14">
          <p className="eyebrow text-accent">Legal</p>

          <h1 className="section-title mt-5">{title}</h1>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            Last updated: October 2026
          </p>

          <div className="mt-10 max-w-[660px] space-y-5 border-t border-line pt-8 text-[15px] leading-[1.7] text-muted">
            {children}
          </div>
        </main>

        <Footer className="mt-16" />
      </div>
    </div>
  );
}
