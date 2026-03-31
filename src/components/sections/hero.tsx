"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import { fadeInUp, tapVariant, hoverVariant } from "@/lib/motion";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { HeroVisual } from "@/components/visuals/hero-visual";
import type { Region } from "@/lib/region";

const subHeadlines: Record<Region, string> = {
  global: "Cloud-native infrastructure and consumer-grade UI for modern product teams.",
  id: "Cloud-native infrastructure and modern UI for Indonesian businesses that refuse to slow down.",
};

function Hero({ region }: { region: Region }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const visualY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[calc(100vh-3.5rem)] items-center overflow-hidden"
    >
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          style={{ y: copyY }}
          className="flex flex-col justify-center gap-6"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            High-Velocity
            <br />
            Cloud Engineering.
          </h1>
          <p className="max-w-lg text-lg text-muted-foreground">{subHeadlines[region]}</p>
          <div>
            <motion.a
              href="#contact"
              whileTap={tapVariant}
              whileHover={hoverVariant}
              className={cn(buttonVariants({ size: "lg" }), "min-h-11 px-6 text-base")}
            >
              Claim Free Infrastructure Audit
            </motion.a>
          </div>
        </motion.div>

        {/* 3D Visual — parallax drift */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          style={{ y: visualY }}
          className="flex items-center justify-center"
        >
          <HeroVisual />
        </motion.div>
      </Container>
    </section>
  );
}

export { Hero };
