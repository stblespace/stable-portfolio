"use client";

import { NextParticles, NextParticlesProvider } from "@tsparticles/nextjs";
import type { Engine } from "@tsparticles/engine";

const init = async (engine: Engine): Promise<void> => {
  const [{ loadSlim }] = await Promise.all([
    import("@tsparticles/slim"),
  ]);
  await loadSlim(engine);
};

export function ParticlesBackground() {
  return (
    <NextParticlesProvider init={init}>
      <NextParticles
        id="tsparticles"
        className="absolute inset-0 -z-10 w-full h-full"
        options={{
          fullScreen: { enable: false },
          background: { color: { value: "transparent" } },
          particles: {
            number: { value: 100 },
            color: { value: "#ffffff" },
            opacity: { value: { min: 0.1, max: 0.5 } },
            size: { value: { min: 1, max: 3 } },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
            },
          },
        }}
      />
    </NextParticlesProvider>
  )
}