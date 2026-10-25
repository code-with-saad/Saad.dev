import Reveal from "@/components/Reveal";

type StackItem = {
  name: string;
  level: string;
};

type StackGroup = {
  area: string;
  focus: string;
  items: StackItem[];
};

const STACK: StackGroup[] = [
  {
    area: "Languages",
    focus: "Core",
    items: [
      { name: "TypeScript", level: "daily" },
      { name: "JavaScript", level: "daily" },
      { name: "Dart", level: "fluent" },
      { name: "Python", level: "fluent" },
      { name: "SQL", level: "fluent" },
    ],
  },
  {
    area: "Frontend",
    focus: "Web / Mobile",
    items: [
      { name: "React", level: "daily" },
      { name: "Next.js", level: "daily" },
      { name: "Flutter", level: "fluent" },
      { name: "Tailwind CSS", level: "daily" },
    ],
  },
  {
    area: "Backend",
    focus: "APIs",
    items: [
      { name: "Node.js", level: "daily" },
      { name: "Express", level: "daily" },
      { name: "FastAPI", level: "fluent" },
      { name: "Python", level: "fluent" },
      { name: "REST / GraphQL", level: "fluent" },
      { name: "Socket.io", level: "fluent" },
      { name: "JWT", level: "fluent" },
    ],
  },
  {
    area: "Data",
    focus: "SQL / NoSQL",
    items: [
      { name: "MongoDB", level: "daily" },
      { name: "PostgreSQL", level: "fluent" },
      { name: "MySQL", level: "fluent" },
      { name: "Redis", level: "fluent" },
      { name: "Supabase", level: "fluent" },
    ],
  },
  {
    area: "Cloud / DevOps",
    focus: "Ship",
    items: [
      { name: "Vercel", level: "daily" },
      { name: "Render", level: "fluent" },
      { name: "Cloudflare", level: "fluent" },
      { name: "Postman", level: "daily" },
      { name: "GitHub Actions", level: "fluent" },
      { name: "Docker", level: "fluent" },
    ],
  },
  {
    area: "Practice",
    focus: "How I work",
    items: [
      { name: "System design", level: "core" },
      { name: "Code review", level: "weekly" },
      { name: "Version control", level: "daily" },
      { name: "AI-assisted dev", level: "daily" },
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

      <Reveal delay={90} className="mt-12">
        <ul className="grid gap-x-8 gap-y-12 min-[600px]:grid-cols-2 min-[1180px]:grid-cols-3">
          {STACK.map((group) => (
            <li key={group.area} className="min-w-0">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-2.5">
                <h3 className="font-mono text-[10px] font-medium uppercase leading-relaxed tracking-[0.16em] text-muted">
                  {group.area}
                </h3>
                <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.12em] text-muted">
                  {group.focus}
                </p>
              </div>

              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <span className="font-display text-[15px] font-semibold leading-snug tracking-[-0.01em] text-ink">
                      {item.name}
                    </span>
                    <span className="shrink-0 font-mono text-[10px] text-muted">
                      {item.level}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
