import Reveal from "@/components/Reveal";

type ExperienceItem = {
  dates: string;
  role: string;
  org: string;
  summary: string;
};

const EXPERIENCE: ExperienceItem[] = [
  {
    dates: "2026",
    role: "Full Stack Development Intern",
    org: "CodeAlpha",
    summary:
      "Built three full stack projects: Nexoria (e-commerce with Stripe checkout), Circl (social platform) and Huddle (real-time project management).",
  },
  {
    dates: "2024 - Present",
    role: "Advanced Diploma in Software Engineering",
    org: "Aptech Worldwide, FB Area Campus Karachi",
    summary: "Core coursework plus team projects EventSphere and MarketLink.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="scroll-mt-[89px] py-20 min-[900px]:scroll-mt-8 min-[900px]:py-24"
    >
      <Reveal>
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          <p className="eyebrow text-accent">03 / EXPERIENCE</p>
        </div>

        <h2 id="experience-title" className="section-title mt-6">
          Where I&apos;ve worked and studied.
        </h2>
      </Reveal>

      <Reveal delay={90} className="mt-10">
        <ol className="border-t border-line">
          {EXPERIENCE.map((item) => (
            <li
              key={`${item.role}-${item.org}`}
              className="grid gap-2 border-b border-line py-6 min-[720px]:grid-cols-[150px_1fr] min-[720px]:gap-10 min-[720px]:py-7"
            >
              <p className="font-mono text-[10px] uppercase leading-[1.8] tracking-[0.16em] text-muted">
                {item.dates}
              </p>

              <div>
                <h3 className="font-display text-[20px] font-bold leading-[1.25] tracking-[-0.02em] text-ink">
                  {item.role}, {item.org}
                </h3>
                <p className="mt-2 max-w-[560px] text-[15px] leading-[1.65] text-muted">
                  {item.summary}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
