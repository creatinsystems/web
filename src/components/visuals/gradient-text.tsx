"use client";

/**
 * GradientText — animated gradient text effect using Framer Motion.
 * Adapted from ReactBits (MIT + Commons Clause).
 *
 * Renders children with an animated sweeping gradient.
 * Customized for the Creatin design system (electric indigo palette).
 */

import { useState, useCallback, useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";

/* ── Props ──────────────────────────────────────────────────── */

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  /** Gradient color stops (default: electric indigo palette) */
  colors?: string[];
  /** Animation cycle speed in seconds (default 8) */
  animationSpeed?: number;
  /** Gradient direction (default "horizontal") */
  direction?: "horizontal" | "vertical" | "diagonal";
  /** Pause the gradient animation on hover (default false) */
  pauseOnHover?: boolean;
  /** Yoyo (reverse) vs continuous loop (default true) */
  yoyo?: boolean;
}

/* ── Component ──────────────────────────────────────────────── */

function GradientText({
  children,
  className = "",
  colors = ["#818cf8", "#a5b4fc", "#6366f1"],
  animationSpeed = 8,
  direction = "horizontal",
  pauseOnHover = false,
  yoyo = true,
}: GradientTextProps) {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const prefersReducedMotionRef = useRef(false);

  const animationDuration = animationSpeed * 1000;

  /* Check reduced-motion preference once on mount */
  useEffect(() => {
    prefersReducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useAnimationFrame((time) => {
    if (isPaused || prefersReducedMotionRef.current) {
      lastTimeRef.current = null;
      return;
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    if (yoyo) {
      const fullCycle = animationDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;
      if (cycleTime < animationDuration) {
        progress.set((cycleTime / animationDuration) * 100);
      } else {
        progress.set(100 - ((cycleTime - animationDuration) / animationDuration) * 100);
      }
    } else {
      progress.set((elapsedRef.current / animationDuration) * 100);
    }
  });

  useEffect(() => {
    elapsedRef.current = 0;
    progress.set(0);
  }, [animationSpeed, yoyo, progress]);

  const backgroundPosition = useTransform(progress, (p) => {
    if (direction === "vertical") return `50% ${p}%`;
    return `${p}% 50%`;
  });

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientAngle =
    direction === "horizontal"
      ? "to right"
      : direction === "vertical"
        ? "to bottom"
        : "to bottom right";
  const gradientColors = [...colors, colors[0]].join(", ");

  const gradientStyle = {
    backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
    backgroundSize:
      direction === "horizontal"
        ? "300% 100%"
        : direction === "vertical"
          ? "100% 300%"
          : "300% 300%",
    backgroundRepeat: "repeat" as const,
  };

  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        ...gradientStyle,
        backgroundPosition,
        WebkitBackgroundClip: "text",
      }}
    >
      {children}
    </motion.span>
  );
}

export { GradientText };
