import GitHubActivity from "@/components/GitHubActivity";
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-[89px] py-20 min-[900px]:scroll-mt-8 min-[900px]:py-24"
    >
      <Reveal>
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          <p className="eyebrow text-accent">01 / About</p>
        </div>

        <h2 id="about-title" className="section-title mt-6">
          Learning by building real things.
        </h2>
      </Reveal>

      <Reveal
        delay={90}
        className="mt-7 max-w-[660px] space-y-5 text-[19px] leading-[1.65] text-pretty text-muted"
      >
        <p>
          I&apos;m a software engineering student at Aptech in Karachi. Most of what I
          know comes from building{" "}
          <strong className="text-ink">complete apps</strong>: auth, database,
          admin panel and deployment, not just the frontend.
        </p>
        <p>
          My main stack is MERN, with Postgres for relational data. I use AI coding
          tools and check their output myself, because I only ship code I
          understand. I&apos;d rather ship something small end to end than half-finish
          something impressive. Right now I&apos;m open to{" "}
          <strong className="text-ink">
            internships, full-time roles and freelance projects
          </strong>
          .
        </p>
      </Reveal>

      <Reveal delay={140} className="mt-9">
        <GitHubActivity />
      </Reveal>
    </section>
  );
}
