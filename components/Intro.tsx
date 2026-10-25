import Reveal from "@/components/Reveal";

const STATS = [
  { value: "9+", label: "PROJECTS SHIPPED" },
  { value: "1+", label: "Year of Working Experience" },
  { value: "2+", label: "TEAM SUBMISSIONS" },
];

export default function Intro() {
  return (
    <section
      id="intro"
      aria-labelledby="intro-title"
      className="scroll-mt-[89px] pt-8 pb-20 min-[900px]:scroll-mt-8 min-[900px]:pb-24"
    >
      <Reveal>
        <p className="eyebrow text-accent">
          Muhammad Saad · Software Engineer × Full Stack Architect · Karachi
        </p>

        <h2 id="intro-title" className="hero-title mt-7">
          I build <span className="accent-underline">full stack products</span> that{" "}
          <span className="accent-underline">hold up in production</span>.
        </h2>
      </Reveal>

      <Reveal delay={120}>
        <p className="mt-7 max-w-[620px] text-[19px] leading-[1.65] text-pretty text-muted">
          Software engineering student at Aptech in Karachi. I build complete web
          apps with MERN and Postgres, from login and database to admin panel and
          deployment. DinePine, my restaurant POS with cashier, kitchen and admin
          screens, is live. I also shipped three CodeAlpha internship projects and
          two team submissions. Open to internships, full-time roles and freelance
          projects.
        </p>

        <ul className="mt-10 grid grid-cols-3 gap-6">
          {STATS.map((stat) => (
            <li key={stat.label}>
              <span className="block font-display text-[2.5rem] font-extrabold leading-none tracking-[-0.03em] text-ink">
                {stat.value}
              </span>
              <span className="mt-2 block font-mono text-[10px] leading-relaxed tracking-[0.14em] text-muted">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-12 max-w-[620px] border-t border-line pt-6">
          <p className="font-mono text-xs leading-relaxed text-muted">
            <span className="tracking-[0.16em] text-accent">CURRENTLY:</span>{" "}
            building Palettero, an AI color tool, and learning FastAPI, PostgreSQL
            and Docker.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
