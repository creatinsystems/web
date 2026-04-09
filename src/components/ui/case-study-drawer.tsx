"use client";

import { useState, useSyncExternalStore } from "react";
import { Dialog } from "@base-ui/react/dialog";
const { Root, Portal, Backdrop, Popup, Close } = Dialog;
import { motion, AnimatePresence, useDragControls, type PanInfo } from "framer-motion";
import { XIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ThemeColor } from "@/components/visuals/card-abstract";

/* ── Types ────────────────────────────────────────────────── */

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

/* ── Theme maps ───────────────────────────────────────────── */

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

/* ── Responsive media query hook ──────────────────────────── */

const desktopQuery = "(min-width: 768px)";

function subscribeDesktop(callback: () => void) {
  const mq = window.matchMedia(desktopQuery);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getDesktopSnapshot() {
  return window.matchMedia(desktopQuery).matches;
}

function getDesktopServerSnapshot() {
  return false;
}

function useIsDesktop() {
  return useSyncExternalStore(subscribeDesktop, getDesktopSnapshot, getDesktopServerSnapshot);
}

/* ── Shared body content (used by both desktop & mobile) ──── */

function DrawerBody({ study, onClose }: { study: CaseStudy; onClose: () => void }) {
  return (
    <>
      {/* Body */}
      <div className="flex-1 space-y-6 p-6">
        <div>
          <h2 className="text-2xl font-bold leading-tight">{study.title}</h2>
          <p className="mt-2 text-muted-foreground">{study.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {study.metrics.map((metric) => (
            <div key={metric.label} className="rounded-lg border border-border/40 bg-card/50 p-3">
              <p className="text-2xl font-bold text-primary">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Challenge
          </h3>
          <p className="text-sm leading-relaxed text-foreground/90">{study.challenge}</p>
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
          <p className="text-sm leading-relaxed text-foreground/90">{study.solution}</p>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-border/40 p-6">
        <a
          href="#contact"
          onClick={onClose}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Discuss your infrastructure
          <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </>
  );
}

/* ── Desktop drawer content ───────────────────────────────── */

function DesktopDrawerContent({
  study,
  theme,
  iconTheme,
  onClose,
}: {
  study: CaseStudy;
  theme: string;
  iconTheme: string;
  onClose: () => void;
}) {
  const Icon = study.icon;

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {/* Themed header */}
      <div
        className={cn(
          "flex items-center gap-3 border-b border-border/40 bg-gradient-to-r p-6",
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

      <DrawerBody study={study} onClose={onClose} />
    </div>
  );
}

/* ── Mobile bottom sheet with swipe-down-to-dismiss ── */

function MobileSheet({
  study,
  theme,
  iconTheme,
  onClose,
}: {
  study: CaseStudy;
  theme: string;
  iconTheme: string;
  onClose: () => void;
}) {
  const Icon = study.icon;
  const controls = useDragControls();

  function handleDragEnd(_: unknown, info: PanInfo) {
    // Swipe down past threshold or fast flick → dismiss
    if (info.offset.y > 120 || info.velocity.y > 500) {
      onClose();
    }
  }

  return (
    <Popup
      render={
        <motion.div
          drag="y"
          dragControls={controls}
          dragListener={false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={{ top: 0, bottom: 0.3 }}
          dragSnapToOrigin
          onDragEnd={handleDragEnd}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed inset-0 z-50 flex flex-col bg-background"
        >
          {/* Sticky header — drag handle for the whole sheet */}
          <div
            onPointerDown={(e) => controls.start(e)}
            className={cn(
              "sticky top-0 z-10 flex cursor-grab touch-none flex-col items-center border-b border-border/40 bg-gradient-to-r px-6 pt-3 active:cursor-grabbing",
              theme
            )}
          >
            {/* Drag hint pill */}
            <div className="mb-3 h-1 w-8 rounded-full bg-white/30" />

            {/* Header content */}
            <div className="flex w-full items-center gap-3 pb-4">
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
          </div>

          {/* Scrollable body */}
          <div
            className="flex min-h-0 flex-1 flex-col overflow-y-auto"
            style={{
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
            }}
          >
            <DrawerBody study={study} onClose={onClose} />
          </div>
        </motion.div>
      }
    />
  );
}

/* ── Main drawer component ────────────────────────────────── */

interface CaseStudyDrawerProps {
  study: CaseStudy | null;
  onClose: () => void;
}

function CaseStudyDrawer({ study, onClose }: CaseStudyDrawerProps) {
  const isDesktop = useIsDesktop();
  const [snapshot, setSnapshot] = useState<{
    renderStudy: CaseStudy | null;
    exiting: boolean;
  }>({ renderStudy: null, exiting: false });

  // React "adjust state during render" pattern (no refs, no effects)
  // https://react.dev/reference/react/useState#storing-information-from-previous-renders
  if (study && snapshot.renderStudy !== study) {
    setSnapshot({ renderStudy: study, exiting: false });
  }
  if (!study && snapshot.renderStudy && !snapshot.exiting) {
    setSnapshot({ renderStudy: snapshot.renderStudy, exiting: true });
  }

  const { renderStudy, exiting } = snapshot;
  // Keep dialog mounted during exit animation so Portal stays in DOM
  const dialogOpen = !!study || exiting;
  const showContent = !!study;

  const theme = renderStudy ? themeClasses[renderStudy.themeColor] : "";
  const iconTheme = renderStudy ? iconThemeClasses[renderStudy.themeColor] : "";

  function handleExitComplete() {
    setSnapshot({ renderStudy: null, exiting: false });
  }

  return (
    <Root open={dialogOpen} onOpenChange={(open: boolean) => !open && onClose()}>
      <AnimatePresence onExitComplete={handleExitComplete}>
        {showContent && renderStudy && (
          <Portal key="case-study-drawer">
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

            {/* Desktop: centered modal */}
            {isDesktop ? (
              <Popup
                render={
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-border/40 bg-background shadow-card"
                    style={{ maxHeight: "85vh" }}
                  >
                    <DesktopDrawerContent
                      study={renderStudy}
                      theme={theme}
                      iconTheme={iconTheme}
                      onClose={onClose}
                    />
                  </motion.div>
                }
              />
            ) : (
              /* Mobile: full-screen sheet with swipe-down-to-dismiss */
              <MobileSheet
                study={renderStudy}
                theme={theme}
                iconTheme={iconTheme}
                onClose={onClose}
              />
            )}
          </Portal>
        )}
      </AnimatePresence>
    </Root>
  );
}

export { CaseStudyDrawer, type CaseStudy };
