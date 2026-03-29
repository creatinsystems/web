"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { fadeInUp, tapVariant, hoverVariant } from "@/lib/motion";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import type { Region } from "@/lib/region";

const subHeadlines: Record<Region, string> = {
  global: "Cloud-native infrastructure and consumer-grade UI for modern product teams.",
  id: "Cloud-native infrastructure and modern UI for Indonesian businesses that refuse to slow down.",
};

function Hero({ region }: { region: Region }) {
  return (
    <section className="relative flex min-h-[calc(100vh-3.5rem)] items-center overflow-hidden">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
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
              className={cn(buttonVariants({ size: "lg" }), "text-base")}
            >
              Claim Free Infrastructure Audit
            </motion.a>
          </div>
        </motion.div>

        {/* Visual placeholder — Phase 3 */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center"
        >
          <div className="flex aspect-square w-full max-w-md items-center justify-center rounded-xl bg-gradient-to-br from-midnight-900 to-electric-500/30 p-8">
            <span className="text-center text-sm font-medium text-muted-foreground">
              3D Visual &mdash; Phase 3
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export { Hero };
