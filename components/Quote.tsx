import { LuQuote } from "react-icons/lu";
import Reveal from "@/components/Reveal";

export default function Quote() {
  return (
    <section
      aria-label="Quote"
      className="border-t border-line py-16 min-[900px]:py-20"
    >
      <Reveal>
        <figure className="text-center">
          <LuQuote
            className="mx-auto h-4 w-4 text-accent"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <blockquote className="mx-auto mt-5 max-w-[560px] text-balance font-display text-[clamp(1.4rem,1.1rem+0.9vw,1.85rem)] font-semibold italic leading-[1.45] tracking-[-0.01em] text-ink">
            Make it work, make it right, make it fast.
          </blockquote>
          <figcaption className="mt-6 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
            Kent Beck
            <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
