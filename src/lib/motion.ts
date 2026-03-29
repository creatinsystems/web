import type { Variants } from "framer-motion";

/* ── Interaction variants ─────────────────────────────────── */

/** Subtle scale-down on press — apply via `whileTap` */
export const tapVariant = { scale: 0.98 };

/** Subtle lift on hover — apply via `whileHover` */
export const hoverVariant = { scale: 1.02 };

/* ── Scroll-triggered entrance variants ───────────────────── */

/** Fade-in from below — use with `whileInView` on a `motion.*` element */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/** Stagger container — wrap around children that each use `fadeInUp` */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};
