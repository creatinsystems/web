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

const ctaVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

/* ── Component ──────────────────────────────────────────────── */

function MobileNav({ links, open, onOpenChange }: MobileNavProps) {
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
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

  /* Auto-focus close button on open, return focus on close */
  useEffect(() => {
    if (open) {
      // Small delay to let AnimatePresence mount the element
      const raf = requestAnimationFrame(() => {
        closeRef.current?.focus();
      });
      return () => cancelAnimationFrame(raf);
    } else {
      triggerRef.current?.focus();
    }
  }, [open]);

  /* Focus trap */
  useEffect(() => {
    if (!open) return;

    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;

      const panel = document.getElementById("mobile-nav-panel");
      if (!panel) return;

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
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
  const dur = instant ? 0 : 0.2;

  return (
    <>
      {/* Hamburger trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => onOpenChange(!open)}
        className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
      </button>

      {/* Portal to document.body — escapes header's backdrop-filter
          containing block that would break fixed positioning */}
      {typeof document !== "undefined" &&
        createPortal(
          <>
            {/* Full-screen overlay */}
            <AnimatePresence>
              {open && (
                <motion.div
                  key="overlay"
                  variants={overlayVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: dur }}
                  className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl md:hidden"
                  aria-hidden="true"
                >
                  {/* Subtle radial gradient accent */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.08)_0%,transparent_60%)]" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation panel */}
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
                  exit={{ opacity: 0 }}
                  transition={{ duration: dur }}
                  className="fixed inset-0 z-[70] flex flex-col items-center justify-center md:hidden"
                >
                  {/* Close button — top-right, matches hamburger position */}
                  <div className="absolute top-0 right-0 p-4">
                    <button
                      ref={closeRef}
                      type="button"
                      onClick={close}
                      className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="Close menu"
                    >
                      <XIcon className="size-5" />
                    </button>
                  </div>

                  {/* Links — centered with staggered entrance */}
                  <div className="flex flex-col items-center gap-8">
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
                          duration: instant ? 0 : 0.3,
                          delay: instant ? 0 : 0.05 + i * 0.05,
                          ease: "easeOut",
                        }}
                        className="text-2xl font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </motion.a>
                    ))}

                    {/* CTA — gradient text link, fades in after links */}
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{
                        duration: instant ? 0 : 0.3,
                        delay: instant ? 0 : 0.05 + links.length * 0.05 + 0.05,
                        ease: "easeOut",
                      }}
                      className="mt-4"
                    >
                      <a
                        href="#contact"
                        onClick={close}
                        className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <GradientText animationSpeed={6}>Claim Free Audit</GradientText>
                      </a>
                    </motion.div>
                  </div>
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
