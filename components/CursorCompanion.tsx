"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const CAT_SIZE = 44;
const SIT_DISTANCE = 108;
const WAKE_DISTANCE = 190;
const MAX_SPEED = 9.5;
const EASE = 0.1;
const EDGE_X = 152;
const EDGE_Y = 112;

type Facing = 1 | -1;

function useMedia(query: string) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}

export default function CursorCompanion() {
  const finePointer = useMedia("(hover: hover) and (pointer: fine)");
  const reduceMotion = useMedia("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reduceMotion;

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const state = useRef({
    x: 0,
    y: 0,
    pointerX: 0,
    pointerY: 0,
    facing: 1 as Facing,
    seeded: false,
    running: false,
    seated: false,
    frame: 0,
  });

  const [visible, setVisible] = useState(false);
  const [seated, setSeated] = useState(false);
  const [facing, setFacing] = useState<Facing>(1);

  useEffect(() => {
    if (!enabled) return;

    const node = wrapRef.current;
    if (!node) return;

    const current = state.current;

    const clampX = (value: number) =>
      Math.max(
        EDGE_X,
        Math.min(window.innerWidth - EDGE_X - CAT_SIZE, value)
      );

    const clampY = (value: number) =>
      Math.max(
        EDGE_Y,
        Math.min(window.innerHeight - EDGE_Y - CAT_SIZE, value)
      );

    const paint = () => {
      node.style.transform = `translate3d(${Math.round(current.x)}px, ${Math.round(
        current.y
      )}px, 0)`;
    };

    const seat = () => {
      if (current.seated) return;
      current.seated = true;
      current.running = false;
      setSeated(true);
    };

    const wake = () => {
      if (!current.seated) return;
      current.seated = false;
      setSeated(false);
    };

    const loop = () => {
      current.frame = 0;

      const centerX = current.x + CAT_SIZE / 2;
      const centerY = current.y + CAT_SIZE / 2;
      const dx = current.pointerX - centerX;
      const dy = current.pointerY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance <= SIT_DISTANCE) {
        seat();
        return;
      }

      if (current.seated) {
        current.running = false;
        return;
      }

      const stepX = (dx / distance) * SIT_DISTANCE;
      const stepY = (dy / distance) * SIT_DISTANCE;
      const targetX = clampX(current.pointerX - stepX - CAT_SIZE / 2);
      const targetY = clampY(current.pointerY - stepY - CAT_SIZE / 2);
      const moveX = targetX - current.x;
      const moveY = targetY - current.y;
      const remaining = Math.hypot(moveX, moveY);

      if (remaining <= 0.5) {
        seat();
        return;
      }

      const speed = Math.min(MAX_SPEED, Math.max(1.2, remaining * EASE));
      current.x += (moveX / remaining) * speed;
      current.y += (moveY / remaining) * speed;

      const nextFacing: Facing = moveX > 0 ? 1 : -1;
      if (nextFacing !== current.facing) {
        current.facing = nextFacing;
        setFacing(nextFacing);
      }

      paint();
      current.frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (current.running) return;
      current.running = true;
      current.frame = requestAnimationFrame(loop);
    };

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      current.pointerX = event.clientX;
      current.pointerY = event.clientY;

      if (!current.seeded) {
        current.seeded = true;
        current.x = clampX(event.clientX - 160);
        current.y = clampY(event.clientY + 120);
        paint();
        setVisible(true);
        start();
        return;
      }

      if (current.seated) {
        const centerX = current.x + CAT_SIZE / 2;
        const centerY = current.y + CAT_SIZE / 2;
        const distance = Math.hypot(
          current.pointerX - centerX,
          current.pointerY - centerY
        );

        if (distance > WAKE_DISTANCE) {
          wake();
          start();
        }
        return;
      }

      start();
    };

    const handleResize = () => {
      current.x = clampX(current.x);
      current.y = clampY(current.y);
      paint();
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(current.frame);
      current.running = false;
      current.seated = false;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      data-cursor-companion=""
      className={`pointer-events-none fixed left-0 top-0 z-20 h-11 w-11 transition-opacity duration-300 will-change-transform ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className="absolute bottom-full left-1/2 mb-3 w-[252px] rounded-xl border border-line bg-surface px-3.5 py-3 transition-[opacity,transform] duration-300 ease-out"
        style={{
          opacity: seated ? 1 : 0,
          transform: seated
            ? "translate(-50%, 0) scale(1)"
            : "translate(-50%, 6px) scale(0.96)",
        }}
      >
        <p className="font-display text-[13px] font-semibold italic leading-snug text-ink">
          Arise, awake, and stop not till the goal is reached.
        </p>
        <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
          Katha Upanishad
        </p>
        <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-line bg-surface" />
      </div>

      <div
        className="h-full w-full transition-transform duration-200"
        style={{ transform: facing === 1 ? "scaleX(1)" : "scaleX(-1)" }}
      >
        <svg
          viewBox="0 0 48 48"
          className={`h-full w-full text-ink ${seated ? "" : "companion-run"}`}
          aria-hidden="true"
        >
          <path d="M14 17 10.5 5.5 20.5 10.5Z" fill="currentColor" />
          <path d="M34 17 37.5 5.5 27.5 10.5Z" fill="currentColor" />
          <ellipse cx="24" cy="19" rx="11.5" ry="10.5" fill="currentColor" />
          <path
            d="M14.8 28.5c-3 3.8-3.4 10.6.6 12.8 2.3 1.3 5.6 1.5 8.6 1.5s6.3-.2 8.6-1.5c4-2.2 3.6-9 .6-12.8-2.3-2.9-5.7-4.4-9.2-4.4s-6.9 1.5-9.2 4.4Z"
            fill="currentColor"
          />
          <path
            d="M33.5 40c4.4 2.4 7.8.6 8.2-3.4.2-1.9-.6-3.7-1.7-4.9"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="20" cy="19" r="1.5" fill="var(--canvas)" />
          <circle cx="28" cy="19" r="1.5" fill="var(--canvas)" />
        </svg>
      </div>
    </div>
  );
}
