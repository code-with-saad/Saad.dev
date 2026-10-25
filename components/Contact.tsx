import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

const EMAIL = "saadkashif770@gmail.com";
const GITHUB_URL = "https://github.com/code-with-saad";
const LINKEDIN_URL = "https://www.linkedin.com/in/codewithsaad";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const INFO_LINK_CLASS =
  "break-all rounded-sm transition-colors duration-200 hover:text-accent " +
  FOCUS_RING;

function InfoRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[76px_1fr] gap-4 border-b border-line py-3.5 min-[520px]:grid-cols-[140px_1fr]">
      <dt className="font-mono text-[10px] uppercase leading-[1.8] tracking-[0.16em] text-muted">
        {label}
      </dt>
      <dd className="min-w-0 font-mono text-[11px] leading-[1.8] text-ink min-[520px]:text-[12px]">
        {children}
      </dd>
    </div>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-[89px] py-20 min-[900px]:scroll-mt-8 min-[900px]:py-24"
    >
      <Reveal>
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          <p className="eyebrow text-accent">05 / CONTACT</p>
        </div>

        <h2 id="contact-title" className="section-title mt-6 max-w-[660px]">
          Got a role or a project in mind? Let&apos;s talk.
        </h2>
      </Reveal>

      <Reveal delay={90} className="mt-7">
        <p className="max-w-[620px] text-[19px] leading-[1.65] text-pretty text-muted">
          I&apos;m looking for internship and full-time opportunities in full stack
          development. The fastest way to reach me is email.
        </p>

        <div className="mt-8 flex flex-col gap-3 min-[480px]:flex-row">
          <a
            href={`mailto:${EMAIL}`}
            className={`inline-flex h-11 w-full items-center justify-center rounded-lg bg-accent px-5 text-[14px] font-semibold text-accent-ink transition-colors duration-200 hover:bg-accent-strong min-[480px]:w-auto ${FOCUS_RING}`}
          >
            Email me
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex h-11 w-full items-center justify-center rounded-lg border border-line px-5 text-[14px] font-medium text-ink transition-colors duration-200 hover:border-accent hover:text-accent min-[480px]:w-auto ${FOCUS_RING}`}
          >
            LinkedIn
          </a>
        </div>

        <dl className="mt-12 max-w-[660px] border-t border-line">
          <InfoRow label="Email">
            <a href={`mailto:${EMAIL}`} className={INFO_LINK_CLASS}>
              {EMAIL}
            </a>
          </InfoRow>
          <InfoRow label="GitHub">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={INFO_LINK_CLASS}
            >
              github.com/code-with-saad
            </a>
          </InfoRow>
          <InfoRow label="LinkedIn">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={INFO_LINK_CLASS}
            >
              linkedin.com/in/codewithsaad
            </a>
          </InfoRow>
          <InfoRow label="Location">Karachi, PK</InfoRow>
        </dl>
      </Reveal>
    </section>
  );
}
