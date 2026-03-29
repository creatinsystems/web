"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/motion";
import { Container } from "@/components/layout/container";
import type { SectionVariant } from "@/components/layout/section";

interface MotionSectionProps {
  id?: string;
  className?: string;
  variant?: SectionVariant;
  children?: React.ReactNode;
}

/**
 * Animated section wrapper — scroll-triggered fade-in via Framer Motion.
 * Use this instead of `<Section>` when the section should animate on scroll.
 */
function MotionSection({ className, variant = "default", children, ...props }: MotionSectionProps) {
  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={cn("py-16 sm:py-24", variant === "muted" && "bg-muted/50", className)}
      {...props}
    >
      <Container>{children}</Container>
    </motion.section>
  );
}

export { MotionSection };
export type { MotionSectionProps };
