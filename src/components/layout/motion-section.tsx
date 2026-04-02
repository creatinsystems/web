"use client";

import { motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/motion";
import { Container } from "@/components/layout/container";
import type { SectionVariant } from "@/components/layout/section";

interface MotionSectionProps {
  id?: string;
  className?: string;
  variant?: SectionVariant;
  /** Override the default fadeInUp animation variant */
  animation?: Variants;
  children?: React.ReactNode;
}

/**
 * Animated section wrapper — scroll-triggered entrance via Framer Motion.
 * Use this instead of `<Section>` when the section should animate on scroll.
 */
function MotionSection({
  className,
  variant = "default",
  animation = fadeInUp,
  children,
  ...props
}: MotionSectionProps) {
  return (
    <motion.section
      variants={animation}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={cn(
        "py-24 sm:py-32",
        variant === "muted" && "bg-muted/50",
        variant === "accent" && "bg-glow-accent",
        className
      )}
      {...props}
    >
      <Container>{children}</Container>
    </motion.section>
  );
}

export { MotionSection };
export type { MotionSectionProps };
