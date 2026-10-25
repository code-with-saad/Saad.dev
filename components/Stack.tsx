import Reveal from "@/components/Reveal";

type StackGroup = {
  area: string;
  items: string[];
};

const STACK: StackGroup[] = [
  {
    area: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "SQL"],
  },
  {
    area: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Redux"],
  },
  {
    area: "Backend",
    items: ["Node.js", "Express", "REST APIs", "Socket.io", "JWT"],
  },
  {
    area: "Data",
    items: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Supabase"],
  },
  {
    area: "Tools",
    items: [
      "Git",
      "GitHub Actions",
      "Vercel",
      "Render",
      "Cloudflare",
      "Postman",
      "Figma",
    ],
  },
];

export default function Stack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="scroll-mt-[89px] py-20 min-[900px]:scroll-mt-8 min-[900px]:py-24"
    >
      <Reveal>
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          <p className="eyebrow text-accent">04 / STACK</p>
        </div>

        <h2 id="stack-title" className="section-title mt-6">
          The stack I build with.
        </h2>
      </Reveal>

      <Reveal delay={90} className="mt-10 max-w-[760px]">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">
            Tools and technologies grouped by area
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th
                scope="col"
                className="w-[96px] pb-3 pr-4 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted min-[600px]:w-[160px]"
              >
                Area
              </th>
              <th
                scope="col"
                className="pb-3 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted"
              >
                Stack
              </th>
            </tr>
          </thead>
          <tbody>
            {STACK.map((group) => (
              <tr key={group.area} className="border-b border-line align-top">
                <th
                  scope="row"
                  className="py-4 pr-4 font-mono text-[10px] font-medium uppercase leading-[1.8] tracking-[0.16em] text-muted"
                >
                  {group.area}
                </th>
                <td className="py-4 text-[15px] leading-[1.7] text-ink">
                  {group.items.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </section>
  );
}
