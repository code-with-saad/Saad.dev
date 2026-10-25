import TechIcon from "./TechIcon";

export default function StackUsed({ tech }: { tech: string[] }) {
  return (
    <section
      aria-labelledby="stack-title"
      className="mt-10 border-t border-line pt-8"
    >
      <h2
        id="stack-title"
        className="font-display text-[18px] font-semibold tracking-[-0.01em] text-ink"
      >
        Stack used
      </h2>

      <ul className="mt-5 flex flex-wrap gap-2.5">
        {tech.map((item) => (
          <li
            key={item}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-2 text-[13px] font-medium leading-none text-ink"
          >
            <TechIcon name={item} className="h-4 w-4 shrink-0 text-accent" />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
