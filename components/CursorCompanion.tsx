"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { useOnekoEnabled } from "@/hooks/useOnekoPreference";

// Port of oneko.js by adryd325 (https://github.com/adryd325/oneko.js).
// Motion, timing and sprite coordinates are kept identical to the original.

const SPRITE_SIZE = 32;
const SPRITE_COLUMNS = 8;
const SPRITE_ROWS = 4;
const FRAME_INTERVAL = 100;
const NEKO_SPEED = 10;
const START_POS = 32;
const EDGE = 16;

type Direction = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

type IdleAnimation =
  | "sleeping"
  | "scratchSelf"
  | "scratchWallN"
  | "scratchWallS"
  | "scratchWallE"
  | "scratchWallW";

type SpriteName = "idle" | "alert" | "tired" | Direction | IdleAnimation;

type SpriteFrame = readonly [column: number, row: number];

const SPRITE_SETS: Record<SpriteName, readonly SpriteFrame[]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
};

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
  const onekoEnabled = useOnekoEnabled();
  const enabled = finePointer && !reduceMotion && onekoEnabled;

  const nekoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const nekoEl = nekoRef.current;
    if (!nekoEl) return;

    let nekoPosX = START_POS;
    let nekoPosY = START_POS;

    let mousePosX = 0;
    let mousePosY = 0;

    let frameCount = 0;
    let idleTime = 0;
    let idleAnimation: IdleAnimation | null = null;
    let idleAnimationFrame = 0;

    let lastFrameTimestamp = 0;
    let animationFrame = 0;

    const setSprite = (name: SpriteName, frame: number) => {
      const frames = SPRITE_SETS[name];
      const sprite = frames[frame % frames.length];

      nekoEl.style.backgroundPosition = `${sprite[0] * SPRITE_SIZE}px ${
        sprite[1] * SPRITE_SIZE
      }px`;
      nekoEl.dataset.sprite = name;
    };

    const resetIdleAnimation = () => {
      idleAnimation = null;
      idleAnimationFrame = 0;
    };

    const idle = () => {
      idleTime += 1;

      // every ~ 20 seconds
      if (
        idleTime > 10 &&
        Math.floor(Math.random() * 200) === 0 &&
        idleAnimation === null
      ) {
        const available: IdleAnimation[] = ["sleeping", "scratchSelf"];

        if (nekoPosX < 32) available.push("scratchWallW");
        if (nekoPosY < 32) available.push("scratchWallN");
        if (nekoPosX > window.innerWidth - 32) available.push("scratchWallE");
        if (nekoPosY > window.innerHeight - 32) available.push("scratchWallS");

        idleAnimation =
          available[Math.floor(Math.random() * available.length)];
      }

      switch (idleAnimation) {
        case "sleeping":
          if (idleAnimationFrame < 8) {
            setSprite("tired", 0);
            break;
          }
          setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
          if (idleAnimationFrame > 192) {
            resetIdleAnimation();
          }
          break;
        case "scratchWallN":
        case "scratchWallS":
        case "scratchWallE":
        case "scratchWallW":
        case "scratchSelf":
          setSprite(idleAnimation, idleAnimationFrame);
          if (idleAnimationFrame > 9) {
            resetIdleAnimation();
          }
          break;
        default:
          setSprite("idle", 0);
          return;
      }

      idleAnimationFrame += 1;
    };

    const frame = () => {
      frameCount += 1;

      const diffX = nekoPosX - mousePosX;
      const diffY = nekoPosY - mousePosY;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < NEKO_SPEED || distance < 48) {
        idle();
        return;
      }

      idleAnimation = null;
      idleAnimationFrame = 0;

      if (idleTime > 1) {
        setSprite("alert", 0);
        // count down after being alerted before moving
        idleTime = Math.min(idleTime, 7);
        idleTime -= 1;
        return;
      }

      let direction = "";
      direction += diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction as Direction, frameCount);

      nekoPosX -= (diffX / distance) * NEKO_SPEED;
      nekoPosY -= (diffY / distance) * NEKO_SPEED;

      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);

      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;
    };

    const onAnimationFrame = (timestamp: number) => {
      // Stops execution if the neko element is removed from DOM
      if (!nekoEl.isConnected) {
        return;
      }

      if (!lastFrameTimestamp) {
        lastFrameTimestamp = timestamp;
      }

      if (timestamp - lastFrameTimestamp > FRAME_INTERVAL) {
        lastFrameTimestamp = timestamp;
        frame();
      }

      animationFrame = window.requestAnimationFrame(onAnimationFrame);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mousePosX = event.clientX;
      mousePosY = event.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);
    animationFrame = window.requestAnimationFrame(onAnimationFrame);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={nekoRef}
      id="oneko"
      aria-hidden="true"
      data-cursor-companion=""
      data-sprite="idle"
      style={{
        position: "fixed",
        left: START_POS - EDGE,
        top: START_POS - EDGE,
        width: SPRITE_SIZE,
        height: SPRITE_SIZE,
        pointerEvents: "none",
        imageRendering: "pixelated",
        zIndex: 20,
        backgroundImage: "url('/oneko.gif')",
        backgroundRepeat: "no-repeat",
        backgroundSize: `${SPRITE_SIZE * SPRITE_COLUMNS}px ${
          SPRITE_SIZE * SPRITE_ROWS
        }px`,
      }}
    />
  );
}
