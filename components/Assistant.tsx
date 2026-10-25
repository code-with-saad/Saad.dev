"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  LuArrowUp,
  LuMessageCircle,
  LuRotateCcw,
  LuX,
} from "react-icons/lu";

const EMAIL = "saadkashif770@gmail.com";
const PHONE_DISPLAY = "+92 335 3132747";

const GREETING =
  "Hi! I'm Saad's portfolio assistant. Ask me about his work, experience, stack or availability.";

const FALLBACK =
  "I only know what's on this site. I can answer questions about projects, stack, experience, education, availability and contact details. For anything else, email saadkashif770@gmail.com.";

type Reply = {
  keywords: string[];
  answer: string;
};

const REPLIES: Reply[] = [
  {
    keywords: [
      "project",
      "projects",
      "built",
      "build",
      "portfolio",
      "palettero",
      "dinepine",
      "nexoria",
      "circl",
      "huddle",
      "eventsphere",
      "marketlink",
      "a1 uniforms",
      "covid care",
      "case study",
    ],
    answer:
      "Nine projects are listed on the site. Highlights are Palettero (AI color and theme tool), DinePine (restaurant POS with cashier, kitchen and admin screens), EventSphere (event management), Nexoria (e-commerce with Stripe checkout), Circl (social platform) and Huddle (real-time project management). Earlier work includes A1 Uniforms, COVID Care and MarketLink. The Selected work section has screenshots and links.",
  },
  {
    keywords: [
      "experience",
      "worked",
      "work experience",
      "internship",
      "codealpha",
      "aptech",
      "education",
      "studying",
      "student",
      "diploma",
      "coursework",
    ],
    answer:
      "He is a Full Stack Development Intern at CodeAlpha, where he built Nexoria, Circl and Huddle. He is also studying for an Advanced Diploma in Software Engineering at Aptech in Karachi, from 2024 to present.",
  },
  {
    keywords: [
      "available",
      "availability",
      "hire",
      "hiring",
      "job",
      "role",
      "roles",
      "opportunity",
      "opportunities",
      "open to",
      "freelance",
      "full-time",
      "full time",
    ],
    answer:
      "He is open to internships and full-time full stack roles. Email or WhatsApp is the fastest way to start a conversation.",
  },
  {
    keywords: [
      "learning",
      "currently",
      "current",
      "building",
      "working on",
      "fastapi",
      "docker",
    ],
    answer:
      "He is currently building Palettero, an AI color and theme tool, and learning FastAPI, PostgreSQL and Docker.",
  },
  {
    keywords: [
      "stack",
      "tech",
      "technology",
      "technologies",
      "language",
      "languages",
      "framework",
      "frameworks",
      "react",
      "next.js",
      "node.js",
      "express",
      "database",
      "databases",
      "mongodb",
      "postgresql",
      "mysql",
      "redis",
      "supabase",
      "tailwind",
      "flutter",
    ],
    answer:
      "Front end: React, Next.js, Flutter and Tailwind CSS. Back end: Node.js, Express and FastAPI. Data: MongoDB, PostgreSQL, MySQL, Redis and Supabase. He also works with Vercel, Render, Cloudflare, Postman, Docker and GitHub Actions.",
  },
  {
    keywords: [
      "contact",
      "email",
      "e-mail",
      "mail",
      "reach",
      "phone",
      "whatsapp",
      "number",
      "linkedin",
      "github",
      "resume",
      "cv",
    ],
    answer: `Email: ${EMAIL}. WhatsApp: ${PHONE_DISPLAY}. LinkedIn: linkedin.com/in/codewithsaad. GitHub: github.com/code-with-saad. You can also download his resume from the contact card.`,
  },
  {
    keywords: [
      "located",
      "location",
      "based",
      "karachi",
      "pakistan",
      "city",
      "country",
      "relocate",
    ],
    answer: "He is based in Karachi, Pakistan.",
  },
  {
    keywords: ["who", "about", "bio", "introduce", "yourself", "name"],
    answer:
      "Saad is a software engineering student at Aptech in Karachi and a full stack developer. He builds complete web apps, from authentication and database design to admin screens and deployment.",
  },
  {
    keywords: ["reply", "respond", "response", "how long", "quickly", "hear back"],
    answer:
      "He usually replies within a day or two. Email and WhatsApp are the fastest.",
  },
  {
    keywords: ["rate", "rates", "price", "pricing", "cost", "charge", "budget", "salary"],
    answer:
      "Rates are not listed on this site. Ask Saad directly by email or WhatsApp.",
  },
];

const SUGGESTIONS = [
  "What has Saad built?",
  "What's his stack?",
  "Is he available?",
  "How do I reach him?",
];

function answerFor(input: string) {
  const text = input.toLowerCase();

  if (/(^|\W)(hi|hello|hey|salam|assalam)(\W|$)/.test(text)) {
    return "Hey! Ask me about Saad's work, experience, stack, availability or how to reach him.";
  }

  let best: Reply | null = null;
  let bestScore = 0;

  for (const reply of REPLIES) {
    let score = 0;

    for (const keyword of reply.keywords) {
      if (text.includes(keyword)) score += 1;
    }

    if (score > bestScore) {
      best = reply;
      bestScore = score;
    }
  }

  return best ? best.answer : FALLBACK;
}

type Message = {
  id: number;
  role: "assistant" | "user";
  text: string;
};

const INITIAL_MESSAGES: Message[] = [
  { id: 1, role: "assistant", text: GREETING },
];

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);
  const timerRef = useRef<number | null>(null);

  const nextId = () => {
    idRef.current += 1;
    return idRef.current;
  };

  useEffect(() => {
    if (!open) return;

    const timer = window.setTimeout(() => inputRef.current?.focus(), 40);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      launcherRef.current?.focus();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, pending]);

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    []
  );

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || pending) return;

    setMessages((current) => [
      ...current,
      { id: nextId(), role: "user", text },
    ]);
    setInput("");
    setPending(true);

    timerRef.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: nextId(), role: "assistant", text: answerFor(text) },
      ]);
      setPending(false);
      timerRef.current = null;
    }, 550);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send(input);
  };

  const reset = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setMessages(INITIAL_MESSAGES);
    setInput("");
    setPending(false);
    inputRef.current?.focus();
  };

  const close = () => {
    setOpen(false);
    launcherRef.current?.focus();
  };

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="portfolio-assistant"
        className="fixed bottom-5 right-5 z-50 inline-flex h-11 items-center gap-2 rounded-full bg-accent px-4 text-[13px] font-semibold text-accent-ink transition-colors duration-200 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        <LuMessageCircle className="h-4 w-4" aria-hidden="true" />
        Ask about Saad
      </button>

      {open && (
        <div
          id="portfolio-assistant"
          role="dialog"
          aria-label="Portfolio assistant"
          className="fixed bottom-[76px] right-5 z-50 flex max-h-[calc(100dvh-120px)] w-[calc(100vw-40px)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-line bg-surface"
        >
          <div className="flex items-center gap-3 border-b border-line px-4 py-3">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-soft font-display text-[12px] font-extrabold tracking-[-0.02em] text-accent">
              MS
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-accent"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-[14px] font-bold leading-tight text-ink">
                Ask about Saad
              </p>
              <p className="truncate font-mono text-[9px] uppercase leading-[1.8] tracking-[0.14em] text-muted">
                Portfolio assistant
              </p>
            </div>

            <button
              type="button"
              onClick={reset}
              aria-label="Reset conversation"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <LuRotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={close}
              aria-label="Close assistant"
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <LuX className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div
            ref={listRef}
            role="log"
            aria-live="polite"
            aria-label="Conversation"
            className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.role === "user" ? "flex justify-end" : "flex justify-start"
                }
              >
                <p
                  className={
                    message.role === "user"
                      ? "max-w-[85%] rounded-xl rounded-br-sm bg-accent px-3.5 py-2.5 text-[13px] font-medium leading-[1.6] text-accent-ink"
                      : "max-w-[88%] rounded-xl rounded-tl-sm border border-line bg-surface-2 px-3.5 py-2.5 text-[13px] leading-[1.6] text-ink"
                  }
                >
                  {message.text}
                </p>
              </div>
            ))}

            {pending && (
              <div className="flex justify-start">
                <p className="rounded-xl rounded-tl-sm border border-line bg-surface-2 px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  Thinking
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => send(suggestion)}
                disabled={pending}
                className="shrink-0 whitespace-nowrap rounded-full border border-line px-3 py-1.5 text-[11px] font-medium text-ink transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t border-line px-3 py-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about his work, stack, availability..."
              aria-label="Message"
              autoComplete="off"
              className="h-10 min-w-0 flex-1 rounded-lg border border-line bg-canvas px-3 text-[16px] text-ink outline-none transition-colors placeholder:text-muted focus:border-line-strong min-[480px]:text-[13px]"
            />
            <button
              type="submit"
              disabled={!input.trim() || pending}
              aria-label="Send message"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-ink transition-colors duration-200 hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              <LuArrowUp className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
