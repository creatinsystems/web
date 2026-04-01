"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("@/components/visuals/hero-scene").then((m) => m.HeroScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex aspect-square w-full max-w-md items-center justify-center rounded-xl bg-gradient-to-br from-midnight-900 to-electric-500/30 p-8">
        <span className="text-center text-sm font-medium text-muted-foreground">Loading...</span>
      </div>
    ),
  }
);

function HeroVisual() {
  return (
    <div className="aspect-square w-full max-w-md" aria-hidden="true" role="presentation">
      <HeroScene />
    </div>
  );
}

export { HeroVisual };
