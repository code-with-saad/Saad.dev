"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  LuArrowRight,
  LuArrowUp,
  LuArrowUpRight,
  LuMessageCircle,
  LuRotateCcw,
  LuX,
} from "react-icons/lu";
import {
  answerFor,
  GREETING,
  SUGGESTIONS,
  type AssistantLink,
} from "@/data/assistant";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  text: string;
  links?: AssistantLink[];
  animate?: boolean;
};

const TYPING_TICKS = 60;
const TYPING_SPEED = 20;
const REPLY_DELAY = 380;

const CHIP_CLASS =
  "inline-flex max-w-full items-center gap-1 rounded-md border border-line bg-canvas px-2 py-1 font-mono text-[10px] leading-[1.4] text-ink transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

function AnswerChip({
  link,
  onNavigate,
}: {
  link: AssistantLink;
  onNavigate: (href: string) => void;
}) {
  if (link.href.startsWith("#")) {
    return (
      <button
        type="button"
        onClick={() => onNavigate(link.href)}
        className={CHIP_CLASS}
      >
        {link.label}
        <LuArrowRight className="h-3 w-3 shrink-0" aria-hidden="true" />
      </button>
    );
  }

  if (link.href.endsWith(".pdf")) {
    return (
      <a href={link.href} download className={CHIP_CLASS}>
        {link.label}
        <LuArrowRight className="h-3 w-3 shrink-0" aria-hidden="true" />
      </a>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={CHIP_CLASS}
    >
      <span className="truncate">{link.label}</span>
      <LuArrowUpRight className="h-3 w-3 shrink-0" aria-hidden="true" />
    </a>
  );
}

type AnswerBubbleProps = {
  message: ChatMessage;
  onDone: (id: number) => void;
  onProgress: () => void;
  onNavigate: (href: string) => void;
};

function AnswerBubble({
  message,
  onDone,
  onProgress,
  onNavigate,
}: AnswerBubbleProps) {
  const [typed, setTyped] = useState(() => {
    if (!message.animate) return message.text.length;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return message.text.length;
    }

    return 0;
  });
  const finished = useRef(!message.animate);

  const total = message.text.length;
  const shown = message.animate ? Math.min(typed, total) : total;
  const complete = shown >= total;

  useEffect(() => {
    if (!message.animate || complete) return;

    const step = Math.max(1, Math.ceil(total / TYPING_TICKS));
    const timer = window.setInterval(() => {
      setTyped((current) => Math.min(total, current + step));
    }, TYPING_SPEED);

    return () => window.clearInterval(timer);
  }, [message.animate, complete, total]);

  useEffect(() => {
    onProgress();

    if (shown >= total && !finished.current) {
      finished.current = true;
      onDone(message.id);
    }
  }, [message.id, onDone, onProgress, shown, total]);

  return (
    <div className="min-w-0 max-w-[calc(100%-36px)] rounded-xl rounded-tl-sm border border-line bg-surface-2 px-3.5 py-2.5">
      <p className="text-[13px] leading-[1.6] text-ink">
        <span aria-hidden={complete ? undefined : true}>
          {message.text.slice(0, shown)}
        </span>
        {complete ? null : (
          <span
            aria-hidden="true"
            className="ml-0.5 inline-block h-3 w-[2px] translate-y-[2px] animate-pulse bg-accent"
          />
        )}
        {complete ? null : <span className="sr-only">{message.text}</span>}
      </p>

      {complete && message.links?.length ? (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {message.links.map((link) => (
            <AnswerChip
              key={`${link.label}-${link.href}`}
              link={link}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function AssistantAvatar() {
  return (
    <span
      aria-hidden="true"
      className="mb-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line bg-canvas font-display text-[9px] font-extrabold tracking-[-0.02em] text-muted"
    >
      MS
    </span>
  );
}

export default function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, role: "assistant", text: GREETING, animate: true },
  ]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);

  const launcherRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(1);
  const timerRef = useRef<number | null>(null);

  const nextId = useCallback(() => {
    idRef.current += 1;
    return idRef.current;
  }, []);

  const scrollToBottom = useCallback(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, []);

  const markTyped = useCallback((id: number) => {
    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, animate: false } : message
      )
    );
  }, []);

  const handleNavigate = useCallback((href: string) => {
    const target = document.getElementById(href.slice(1));
    if (!target) return;

    setOpen(false);

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.requestAnimationFrame(() => {
      target.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    });
  }, []);

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
    scrollToBottom();
  }, [messages, pending, scrollToBottom]);

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
      ...current.map((message) =>
        message.animate ? { ...message, animate: false } : message
      ),
      { id: nextId(), role: "user", text },
    ]);
    setInput("");
    setPending(true);

    timerRef.current = window.setTimeout(() => {
      const answer = answerFor(text);

      setMessages((current) => [
        ...current,
        {
          id: nextId(),
          role: "assistant",
          text: answer.text,
          links: answer.links,
          animate: true,
        },
      ]);
      setPending(false);
      timerRef.current = null;
    }, REPLY_DELAY);
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

    idRef.current += 1;
    setMessages([
      { id: idRef.current, role: "assistant", text: GREETING, animate: true },
    ]);
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
        aria-label="Ask about Saad"
        className="fixed bottom-[calc(72px+env(safe-area-inset-bottom))] right-4 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-ink transition-colors duration-200 hover:bg-accent-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas min-[900px]:bottom-5 min-[900px]:right-5 min-[900px]:h-11 min-[900px]:w-auto min-[900px]:gap-2 min-[900px]:px-4"
      >
        <LuMessageCircle className="h-4 w-4" aria-hidden="true" />
        <span className="hidden text-[13px] font-semibold min-[900px]:inline">
          Ask about Saad
        </span>
      </button>

      {open && (
        <div
          id="portfolio-assistant"
          role="dialog"
          aria-label="Portfolio assistant"
          className="fixed bottom-[calc(136px+env(safe-area-inset-bottom))] right-4 z-50 flex max-h-[calc(100dvh-168px)] w-[calc(100vw-32px)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-line bg-surface min-[900px]:bottom-[76px] min-[900px]:right-5 min-[900px]:max-h-[calc(100dvh-120px)] min-[900px]:w-[calc(100vw-40px)]"
        >
          <div className="flex shrink-0 items-center gap-3 border-b border-line px-4 py-3">
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
            {messages.map((message) =>
              message.role === "assistant" ? (
                <div key={message.id} className="flex items-end gap-2">
                  <AssistantAvatar />
                  <AnswerBubble
                    message={message}
                    onDone={markTyped}
                    onProgress={scrollToBottom}
                    onNavigate={handleNavigate}
                  />
                </div>
              ) : (
                <div key={message.id} className="flex justify-end">
                  <p className="max-w-[85%] rounded-xl rounded-br-sm bg-accent px-3.5 py-2.5 text-[13px] font-medium leading-[1.6] text-accent-ink">
                    {message.text}
                  </p>
                </div>
              )
            )}

            {pending && (
              <div className="flex items-end gap-2">
                <AssistantAvatar />
                <p className="rounded-xl rounded-tl-sm border border-line bg-surface-2 px-3.5 py-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  Thinking
                </p>
              </div>
            )}
          </div>

          <div className="flex shrink-0 gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
            className="flex shrink-0 items-center gap-2 border-t border-line px-3 py-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about a project, stack or contact..."
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
