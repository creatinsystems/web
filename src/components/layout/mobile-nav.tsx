"use client";

import { useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, XIcon } from "lucide-react";

import { GradientText } from "@/components/visuals/gradient-text";

/* ── Types ──────────────────────────────────────────────────── */

interface MobileNavProps {
  links: readonly { label: string; href: string }[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/* ── Reduced-motion check (ref-based, no re-render) ───────── */

function usePrefersReducedMotion() {
  const prefersReduced = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReduced.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReduced.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

/* ── Animation variants ─────────────────────────────────────── */

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

const linksContainerVariants = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      staggerDirection: 1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

/* ── Icon cross-fade variants ───────────────────────────────── */

const iconEnter = { opacity: 1, rotate: 0 };
const iconExit = { opacity: 0, rotate: 90 };
const iconSpring = { type: "spring" as const, stiffness: 400, damping: 28 };

/* ── Component ──────────────────────────────────────────────── */

function MobileNav({ links, open, onOpenChange }: MobileNavProps) {
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, close]);

  /* Lock body scroll when open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Focus trap — scoped to trigger + portal panel */
  useEffect(() => {
    if (!open) return;

    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;

      const panel = document.getElementById("mobile-nav-panel");
      if (!panel) return;

      /* Collect focusables from both the trigger and the panel */
      const panelFocusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      const focusable = [triggerRef.current, ...panelFocusable].filter(Boolean) as HTMLElement[];
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [open]);

  const instant = prefersReduced.current;
  const dur = instant ? 0 : 0.15;

  return (
    <>
      {/* Hamburger / X trigger — stays in the navbar */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => onOpenChange(!open)}
        className="relative inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={iconExit}
              animate={iconEnter}
              exit={iconExit}
              transition={instant ? { duration: 0 } : iconSpring}
              className="absolute"
            >
              <XIcon className="size-5" />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={iconExit}
              animate={iconEnter}
              exit={iconExit}
              transition={instant ? { duration: 0 } : iconSpring}
              className="absolute"
            >
              <MenuIcon className="size-5" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Portal to document.body — escapes header's backdrop-filter
          containing block that would break fixed positioning */}
      {typeof document !== "undefined" &&
        createPortal(
          <>
            {/* Overlay — starts below navbar (top-14 = 56px) */}
            <AnimatePresence>
              {open && (
                <motion.div
                  key="overlay"
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: dur }}
                  className="fixed inset-x-0 top-14 bottom-0 z-[60] bg-background/95 backdrop-blur-xl md:hidden"
                  onClick={close}
                  aria-hidden="true"
                >
                  {/* Subtle radial gradient accent */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08)_0%,transparent_60%)]" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation panel — below navbar, centered in remaining space */}
            <AnimatePresence>
              {open && (
                <motion.nav
                  id="mobile-nav-panel"
                  key="panel"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Mobile navigation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: dur }}
                  className="fixed inset-x-0 top-14 bottom-0 z-[70] flex flex-col items-center justify-start pt-[15vh] md:hidden"
                >
                  {/* Links — staggered entrance/exit */}
                  <motion.div
                    variants={linksContainerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center gap-8"
                  >
                    {links.map((link, i) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={close}
                        variants={linkVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{
                          duration: instant ? 0 : 0.2,
                          delay: instant ? 0 : 0.03 + i * 0.04,
                          ease: "easeOut",
                        }}
                        className="text-2xl font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </motion.a>
                    ))}

                    {/* CTA — gradient text link, fades in after links */}
                    <motion.div
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{
                        duration: instant ? 0 : 0.2,
                        delay: instant ? 0 : 0.03 + links.length * 0.04 + 0.04,
                        ease: "easeOut",
                      }}
                    >
                      <a
                        href="#contact"
                        onClick={close}
                        className="text-2xl font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <GradientText animationSpeed={6}>Claim Free Audit</GradientText>
                      </a>
                    </motion.div>
                  </motion.div>
                </motion.nav>
              )}
            </AnimatePresence>
          </>,
          document.body
        )}
    </>
  );
}

export { MobileNav };
