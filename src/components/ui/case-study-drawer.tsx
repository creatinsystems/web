"use client";

import { useEffect } from "react";
import { Dialog } from "@base-ui/react/dialog";
const { Root, Portal, Backdrop, Popup, Close } = Dialog;
import { motion, AnimatePresence } from "framer-motion";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ThemeColor } from "@/components/visuals/card-abstract";

interface CaseStudy {
  title: string;
  category: string;
  description: string;
  challenge: string;
  architecture: string[];
  solution: string;
  metrics: { value: string; label: string }[];
  icon: React.ComponentType<{ className?: string }>;
  themeColor: ThemeColor;
}

const themeClasses: Record<ThemeColor, string> = {
  blue: "from-blue-600 to-blue-800 border-blue-500/30",
  indigo: "from-indigo-600 to-indigo-800 border-indigo-500/30",
  emerald: "from-emerald-600 to-emerald-800 border-emerald-500/30",
  orange: "from-orange-600 to-orange-800 border-orange-500/30",
};

const iconThemeClasses: Record<ThemeColor, string> = {
  blue: "text-blue-400",
  indigo: "text-indigo-400",
  emerald: "text-emerald-400",
  orange: "text-orange-400",
};

interface CaseStudyDrawerProps {
  study: CaseStudy | null;
  onClose: () => void;
}

function CaseStudyDrawer({ study, onClose }: CaseStudyDrawerProps) {
  useEffect(() => {
    if (!study) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [study, onClose]);

  if (!study) return null;

  const Icon = study.icon;
  const theme = themeClasses[study.themeColor];
  const iconTheme = iconThemeClasses[study.themeColor];

  return (
    <Root open={!!study} onOpenChange={(open: boolean) => !open && onClose()}>
      <AnimatePresence>
        {study && (
          <Portal>
            <Backdrop
              render={
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
                />
              }
            />
            <Popup
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
              render={
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="fixed right-0 top-0 z-50 h-full w-full max-w-lg border-l border-border/40 bg-background shadow-card"
                >
                  <div className="flex h-full flex-col overflow-y-auto">
                    <div
                      className={cn(
                        "flex items-center gap-3 border-b border-border/40 p-6 bg-gradient-to-r",
                        theme
                      )}
                    >
                      <Icon className={cn("size-5", iconTheme)} />
                      <span className="text-sm font-medium text-white/90">{study.category}</span>
                      <Close
                        render={
                          <button
                            type="button"
                            className="ml-auto rounded-md p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                            aria-label="Close"
                          >
                            <XIcon className="size-5" />
                          </button>
                        }
                      />
                    </div>

                    <div className="flex-1 space-y-6 p-6">
                      <div>
                        <h2 className="text-2xl font-bold leading-tight">{study.title}</h2>
                        <p className="mt-2 text-muted-foreground">{study.description}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {study.metrics.map((metric) => (
                          <div
                            key={metric.label}
                            className="rounded-lg border border-border/40 bg-card/50 p-3"
                          >
                            <p className="text-2xl font-bold text-primary">{metric.value}</p>
                            <p className="text-xs text-muted-foreground">{metric.label}</p>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                          Challenge
                        </h3>
                        <p className="text-sm leading-relaxed text-foreground/90">
                          {study.challenge}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                          Architecture
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {study.architecture.map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center rounded-full border border-border/60 bg-card px-2.5 py-1 text-xs font-medium text-foreground/80"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                          Solution
                        </h3>
                        <p className="text-sm leading-relaxed text-foreground/90">
                          {study.solution}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-border/40 p-6">
                      <a
                        href="#contact"
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                      >
                        Discuss your infrastructure
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              }
            />
          </Portal>
        )}
      </AnimatePresence>
    </Root>
  );
}

export { CaseStudyDrawer, type CaseStudy };
