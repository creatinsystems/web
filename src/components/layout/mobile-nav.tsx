"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface MobileNavProps {
  links: readonly { label: string; href: string }[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function MobileNav({ links, open, onOpenChange }: MobileNavProps) {
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

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

  return (
    <>
      {/* Hamburger trigger */}
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:hidden"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
      </button>

      {/* Drawer overlay + panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
              onClick={close}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.nav
              id="mobile-nav-panel"
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-50 flex h-full w-72 flex-col border-l border-border/40 bg-background p-6 shadow-card md:hidden"
              aria-label="Mobile navigation"
            >
              {/* Close button */}
              <div className="mb-8 flex justify-end">
                <button
                  type="button"
                  onClick={close}
                  className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Close menu"
                >
                  <XIcon className="size-5" />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-4">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-auto pt-8">
                <a
                  href="#contact"
                  onClick={close}
                  className={cn(buttonVariants({ size: "cta" }), "w-full")}
                >
                  Claim Free Audit
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export { MobileNav };
