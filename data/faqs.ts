export type FaqItem = {
  question: string;
  answer: string;
  keywords: string[];
};

export const FAQS: FaqItem[] = [
  {
    question: "What kind of roles are you open to?",
    answer:
      "Internships, full-time roles and freelance projects in full stack development. I am based in Karachi, and the fastest way to reach me is email or WhatsApp.",
    keywords: ["roles", "role", "open to", "career", "full time", "internship"],
  },
  {
    question: "What is your main stack?",
    answer:
      "TypeScript, JavaScript, React, Next.js and Tailwind CSS on the front end. Node.js, Express and FastAPI on the back end, with MongoDB, PostgreSQL, MySQL, Redis and Supabase for data. I ship with Vercel, Render, Cloudflare, Docker and GitHub Actions.",
    keywords: ["main stack", "tech stack", "stack"],
  },
  {
    question: "Which projects are live?",
    answer:
      "Palettero, DinePine, Nexoria, Circl, Huddle and A1 Uniforms have live links on their cards in Selected work. EventSphere, MarketLink and COVID Care are on GitHub.",
    keywords: ["live", "deployed", "demo", "live link", "hosted"],
  },
  {
    question: "Are you available for freelance work?",
    answer:
      "Yes. I take on freelance project work alongside internships and full-time roles. Email me the scope and timeline and I will tell you if it fits.",
    keywords: ["freelance", "freelancing", "contract", "project work"],
  },
  {
    question: "How quickly do you reply?",
    answer:
      "I read every message and usually reply within a day or two. Email and WhatsApp are the fastest.",
    keywords: ["reply", "respond", "response", "reply time", "hear back"],
  },
  {
    question: "Can I download your resume?",
    answer:
      "Yes. The resume PDF link is in the contact card and the sidebar.",
    keywords: ["resume", "cv", "download resume"],
  },
];
