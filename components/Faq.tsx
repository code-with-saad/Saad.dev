import { LuPlus } from "react-icons/lu";
import Reveal from "@/components/Reveal";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question: "What kind of roles are you open to?",
    answer:
      "Internships and full-time roles in full stack development. I am based in Karachi, and the fastest way to reach me is email or WhatsApp.",
  },
  {
    question: "What is your main stack?",
    answer:
      "TypeScript, JavaScript, React, Next.js and Tailwind CSS on the front end. Node.js, Express and FastAPI on the back end, with MongoDB, PostgreSQL, MySQL, Redis and Supabase for data. I ship with Vercel, Render, Cloudflare, Docker and GitHub Actions.",
  },
  {
    question: "Which projects are live?",
    answer:
      "Palettero, DinePine, Nexoria, Circl, Huddle and A1 Uniforms have live links on their cards in Selected work. EventSphere, MarketLink and COVID Care are on GitHub.",
  },
  {
    question: "Are you available for freelance work?",
    answer:
      "I am open to internships and full-time roles. For project work, email me the scope and timeline and I will tell you if it fits.",
  },
  {
    question: "How quickly do you reply?",
    answer:
      "I read every message and usually reply within a day or two. Email and WhatsApp are the fastest.",
  },
  {
    question: "Can I download your resume?",
    answer:
      "Yes. The resume PDF link is in the contact card and the sidebar.",
  },
];

export default function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-[89px] py-20 min-[900px]:scroll-mt-8 min-[900px]:py-24"
    >
      <Reveal>
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          <p className="eyebrow text-accent">05 / FAQ</p>
        </div>

        <h2 id="faq-title" className="section-title mt-6">
          Questions I get asked.
        </h2>
      </Reveal>

      <Reveal delay={90} className="mt-10">
        <div className="border-t border-line">
          {FAQS.map((item, index) => (
            <details key={item.question} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-start gap-4 py-5 min-[720px]:gap-6 min-[720px]:py-6 [&::-webkit-details-marker]:hidden">
                <span className="mt-0.5 font-mono text-[10px] leading-[1.8] tracking-[0.16em] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-display text-[17px] font-semibold leading-snug tracking-[-0.015em] text-ink min-[720px]:text-[18px]">
                  {item.question}
                </span>
                <LuPlus
                  className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <div className="pb-5 min-[720px]:pb-6">
                <p className="max-w-[600px] pl-7 text-[15px] leading-[1.7] text-muted min-[720px]:pl-9">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
