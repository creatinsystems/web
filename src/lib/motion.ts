import type { Variants, Transition } from "framer-motion";

/* ── Shared transitions ───────────────────────────────────── */

const easeOut: Transition = { duration: 0.6, ease: "easeOut" };
const spring: Transition = { type: "spring", stiffness: 100, damping: 20 };

/* ── Interaction variants ─────────────────────────────────── */

/** Subtle scale-down on press — apply via `whileTap` */
export const tapVariant = { scale: 0.98 };

/** Subtle lift on hover — apply via `whileHover` */
export const hoverVariant = { scale: 1.02 };

/* ── Scroll-triggered entrance variants ───────────────────── */

/** Fade-in from below */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: easeOut },
};

/** Fade-in from the left */
export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: easeOut },
};

/** Fade-in from the right */
export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: easeOut },
};

/** Scale-in from slightly smaller — good for cards and modals */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: spring },
};

/** Opacity-only fade — no positional shift */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: easeOut },
};

/* ── Container variants ───────────────────────────────────── */

/** Stagger container — wrap around children that each use an entrance variant */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
