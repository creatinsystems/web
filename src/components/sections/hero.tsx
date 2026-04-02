"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";
import { fadeInUp, fadeIn, tapVariant, hoverVariant } from "@/lib/motion";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { DotGrid } from "@/components/visuals/dot-grid";
import { Grainient } from "@/components/visuals/grainient";
import { GradientText } from "@/components/visuals/gradient-text";
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

  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[calc(100vh-3.5rem)] items-center overflow-hidden"
    >
      {/* Background: grainient base + dot-grid overlay */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" className="absolute inset-0">
        <Grainient className="absolute inset-0" />
        <DotGrid />
      </motion.div>

      <Container className="relative z-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          style={{ y: copyY }}
          className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            High-Velocity
            <br />
            <GradientText animationSpeed={6}>Cloud Engineering.</GradientText>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
            {subHeadlines[region]}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <motion.a
              href="#contact"
              whileTap={tapVariant}
              whileHover={hoverVariant}
              className={cn(buttonVariants({ size: "cta" }))}
            >
              Claim Free Infrastructure Audit
            </motion.a>
            <motion.a
              href="#services"
              whileTap={tapVariant}
              whileHover={hoverVariant}
              className={cn(buttonVariants({ variant: "outline", size: "cta" }))}
            >
              See What We Build
            </motion.a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export { Hero };
