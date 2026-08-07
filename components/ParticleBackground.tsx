"use client";

import { ParticlesProvider, Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

async function initParticles(engine: Engine): Promise<void> {
  await loadSlim(engine);
}

export default function ParticleBackground() {
  return (
    <ParticlesProvider init={initParticles}>
      <div className="fixed inset-0 z-[2] pointer-events-none">
        <Particles
          id="tsparticles"
          className="w-full h-full"
          options={{
            background: {
              color: { value: "transparent" },
            },
            fullScreen: { enable: false },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "grab",
                },
              },
              modes: {
                grab: {
                  distance: 150,
                  links: {
                    opacity: 0.5,
                    color: "#10b981",
                  },
                },
              },
            },
            particles: {
              color: { value: "#10b981" },
              links: {
                color: "#059669",
                distance: 150,
                enable: true,
                opacity: 0.2,
                width: 1,
              },
              move: {
                enable: true,
                speed: 1.0,
                direction: "none",
                random: false,
                straight: false,
                outModes: { default: "bounce" },
              },
              number: {
                density: {
                  enable: true,
                  width: 800,
                  height: 800,
                },
                value: 50,
              },
              opacity: { value: 0.45 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
          }}
        />
      </div>
    </ParticlesProvider>
  );
}
