"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

const SPRITE_SIZE = 48;
const SPRITE_COLUMNS = 8;
const SPRITE_ROWS = 4;
const FRAME_MS = 110;
const SIT_DISTANCE = 96;
const WAKE_DISTANCE = 190;
const MAX_SPEED = 7.5;
const EASE = 0.1;
const EDGE_X = 144;
const EDGE_Y = 108;

type Direction = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";
type Frame = readonly [column: number, row: number];

const WALK_FRAMES: Record<Direction, readonly Frame[]> = {
  E: [
    [3, 0],
    [3, 1],
  ],
  SE: [
    [5, 1],
    [5, 2],
  ],
  S: [
    [6, 3],
    [7, 2],
  ],
  SW: [
    [5, 3],
    [6, 1],
  ],
  W: [
    [4, 2],
    [4, 3],
  ],
  NW: [
    [1, 0],
    [1, 1],
  ],
  N: [
    [1, 2],
    [1, 3],
  ],
  NE: [
    [0, 2],
    [0, 3],
  ],
};

const IDLE_FRAME: Frame = [3, 3];
const DIRECTION_BY_OCTANT: Direction[] = [
  "E",
  "SE",
  "S",
  "SW",
  "W",
  "NW",
  "N",
  "NE",
];

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

function paintFrame(node: HTMLElement, [column, row]: Frame) {
  node.style.backgroundPosition = `${-column * SPRITE_SIZE}px ${
    -row * SPRITE_SIZE
  }px`;
}

function directionFor(dx: number, dy: number): Direction {
  const octant = Math.round(Math.atan2(dy, dx) / (Math.PI / 4));
  return DIRECTION_BY_OCTANT[((octant % 8) + 8) % 8];
}

export default function CursorCompanion() {
  const finePointer = useMedia("(hover: hover) and (pointer: fine)");
  const reduceMotion = useMedia("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reduceMotion;

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const spriteRef = useRef<HTMLSpanElement | null>(null);
  const state = useRef({
    x: 0,
    y: 0,
    pointerX: 0,
    pointerY: 0,
    seeded: false,
    running: false,
    seated: false,
    frame: 0,
    last: 0,
  });

  const [visible, setVisible] = useState(false);
  const [seated, setSeated] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const node = wrapRef.current;
    const sprite = spriteRef.current;
    if (!node || !sprite) return;

    const current = state.current;

    const clampX = (value: number) =>
      Math.max(
        EDGE_X,
        Math.min(window.innerWidth - EDGE_X - SPRITE_SIZE, value)
      );

    const clampY = (value: number) =>
      Math.max(
        EDGE_Y,
        Math.min(window.innerHeight - EDGE_Y - SPRITE_SIZE, value)
      );

    const paint = () => {
      node.style.transform = `translate3d(${Math.round(current.x)}px, ${Math.round(
        current.y
      )}px, 0)`;
    };

    paintFrame(sprite, IDLE_FRAME);

    const seat = () => {
      if (current.seated) return;
      current.seated = true;
      current.running = false;
      paintFrame(sprite, IDLE_FRAME);
      setSeated(true);
    };

    const wake = () => {
      if (!current.seated) return;
      current.seated = false;
      setSeated(false);
    };

    const loop = (now: number) => {
      current.frame = 0;

      const delta = current.last ? Math.min(48, now - current.last) : 16.7;
      current.last = now;

      const centerX = current.x + SPRITE_SIZE / 2;
      const centerY = current.y + SPRITE_SIZE / 2;
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
      const targetX = clampX(current.pointerX - stepX - SPRITE_SIZE / 2);
      const targetY = clampY(current.pointerY - stepY - SPRITE_SIZE / 2);
      const moveX = targetX - current.x;
      const moveY = targetY - current.y;
      const remaining = Math.hypot(moveX, moveY);

      if (remaining <= 0.5) {
        seat();
        return;
      }

      const speed =
        Math.min(MAX_SPEED, Math.max(1.2, remaining * EASE)) *
        (delta / 16.7);
      const step = Math.min(speed, remaining);
      current.x += (moveX / remaining) * step;
      current.y += (moveY / remaining) * step;
      paint();

      const frames = WALK_FRAMES[directionFor(moveX, moveY)];
      paintFrame(sprite, frames[Math.floor(now / FRAME_MS) % frames.length]);
      current.frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (current.running) return;
      current.running = true;
      current.last = 0;
      current.frame = requestAnimationFrame(loop);
    };

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      current.pointerX = event.clientX;
      current.pointerY = event.clientY;

      if (!current.seeded) {
        current.seeded = true;
        current.x = clampX(event.clientX - 300);
        current.y = clampY(event.clientY + 200);
        paint();
        setVisible(true);
        start();
        return;
      }

      if (current.seated) {
        const centerX = current.x + SPRITE_SIZE / 2;
        const centerY = current.y + SPRITE_SIZE / 2;
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
      data-seated={seated ? "true" : "false"}
      className={`pointer-events-none fixed left-0 top-0 z-20 h-12 w-12 transition-opacity duration-300 will-change-transform ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <span
        ref={spriteRef}
        className="block h-full w-full"
        style={{
          backgroundImage: "url('/oneko.gif')",
          backgroundRepeat: "no-repeat",
          backgroundSize: `${SPRITE_SIZE * SPRITE_COLUMNS}px ${
            SPRITE_SIZE * SPRITE_ROWS
          }px`,
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}
