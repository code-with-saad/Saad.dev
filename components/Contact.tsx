import type { ReactNode } from "react";
import { LuArrowRight } from "react-icons/lu";
import Reveal from "@/components/Reveal";

const EMAIL = "saadkashif770@gmail.com";
const PHONE_DISPLAY = "+92 335 3132747";
const WHATSAPP_URL = "https://wa.me/923353132747";
const GITHUB_URL = "https://github.com/code-with-saad";
const LINKEDIN_URL = "https://www.linkedin.com/in/codewithsaad";
const RESUME_URL = "/resume.pdf";

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const CARD_LINK =
  "rounded-sm transition-colors duration-200 hover:text-accent " + FOCUS_RING;

function InfoItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="font-mono text-[10px] font-medium uppercase leading-[1.8] tracking-[0.16em] text-muted">
        {label}
      </dt>
      <dd className="mt-1.5 text-[14px] font-medium leading-relaxed text-ink">
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
          <p className="eyebrow text-accent">06 / CONTACT</p>
        </div>
      </Reveal>

      <Reveal delay={90} className="mt-10">
        <div className="grid gap-8 rounded-2xl border border-line bg-surface p-6 min-[720px]:p-8 min-[1240px]:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] min-[1240px]:gap-10 min-[1240px]:p-10">
          <div className="min-w-0">
            <h2 id="contact-title" className="section-title max-w-[470px]">
              Have a role, a project, or{" "}
              <span className="accent-underline">an idea in mind?</span>
            </h2>

            <p className="mt-5 max-w-[430px] text-[16px] leading-[1.65] text-pretty text-muted">
              I read every message and reply within a day or two, whether it is
              an internship, a full-time role, or a project.
            </p>

            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              <a
                href={`mailto:${EMAIL}`}
                className={`inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 text-[14px] font-semibold text-accent-ink transition-colors duration-200 hover:bg-accent-strong min-[420px]:w-auto ${FOCUS_RING}`}
              >
                Email me
                <LuArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex h-11 w-full items-center justify-center rounded-lg border border-line px-5 text-[14px] font-medium text-ink transition-colors duration-200 hover:border-accent hover:text-accent min-[420px]:w-auto ${FOCUS_RING}`}
              >
                WhatsApp
              </a>
            </div>

            <p className="mt-6 flex items-start gap-2.5 font-mono text-[10px] leading-[1.8] text-muted">
              <span
                aria-hidden="true"
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              />
              <span>
                Open to internships and full-time roles. Karachi, PK
              </span>
            </p>
          </div>

          <div className="min-w-0 border-t border-line pt-8 min-[1240px]:border-l min-[1240px]:border-t-0 min-[1240px]:pl-10 min-[1240px]:pt-0">
            <dl className="space-y-5">
              <InfoItem label="Email">
                <a href={`mailto:${EMAIL}`} className={`break-all ${CARD_LINK}`}>
                  {EMAIL}
                </a>
              </InfoItem>

              <InfoItem label="WhatsApp">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={CARD_LINK}
                >
                  {PHONE_DISPLAY}
                </a>
              </InfoItem>

              <InfoItem label="Resume">
                <a href={RESUME_URL} download className={CARD_LINK}>
                  Download PDF
                </a>
              </InfoItem>

              <InfoItem label="Elsewhere">
                <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`underline decoration-line underline-offset-4 hover:decoration-accent ${CARD_LINK}`}
                  >
                    GitHub
                  </a>
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`underline decoration-line underline-offset-4 hover:decoration-accent ${CARD_LINK}`}
                  >
                    LinkedIn
                  </a>
                </span>
              </InfoItem>

              <InfoItem label="Based in">Karachi, PK</InfoItem>
            </dl>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
