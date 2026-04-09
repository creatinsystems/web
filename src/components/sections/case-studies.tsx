"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheckIcon,
  CpuIcon,
  MessagesSquareIcon,
  FileSpreadsheetIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { staggerContainer, scaleIn } from "@/lib/motion";
import { MotionSection } from "@/components/layout/motion-section";
import { CardAbstract, type ThemeColor } from "@/components/visuals/card-abstract";
import { BorderGlow } from "@/components/visuals/border-glow";
import { CaseStudyDrawer, type CaseStudy } from "@/components/ui/case-study-drawer";
import type { Region } from "@/lib/region";

/* ── Types ────────────────────────────────────────────────── */

type Category = "Enterprise" | "AI & Velocity" | "Modernization";

interface CaseStudyData extends CaseStudy {
  id: string;
  regionVisibility: Record<Region, boolean>;
}

/* ── Case study data ──────────────────────────────────────── */

const caseStudies: CaseStudyData[] = [
  {
    id: "security-engine",
    title: "Distributed Security Engine & Automated Billing Architecture",
    category: "Enterprise",
    description:
      "Replaced manual vulnerability reporting with a fully automated, distributed security pipeline spanning 7 global edge nodes.",
    challenge:
      "The client operated a manual vulnerability reporting process across multiple regions, requiring significant human effort and introducing latency. Billing for security services was spreadsheet-driven, error-prone, and couldn't scale with their growing customer base.",
    architecture: ["NextJS", "FastAPI", "RabbitMQ", "Redis", "Grafana", "Ansible"],
    solution:
      "We built a distributed security engine with automated report generation at each edge node, centralized through a RabbitMQ message bus. Billing was fully automated with a FastAPI backend processing usage telemetry in real-time, eliminating manual reconciliation entirely.",
    metrics: [
      { value: "7", label: "Global Edge Nodes" },
      { value: "100%", label: "Automated Reporting" },
      { value: "0", label: "Downtime" },
    ],
    icon: ShieldCheckIcon,
    themeColor: "blue",
    regionVisibility: { global: true, id: true },
  },
  {
    id: "ai-k8s-platform",
    title: "Architecting an AI-Powered K8s Platform in 30 Days",
    category: "AI & Velocity",
    description:
      "Designed and delivered an enterprise Kubernetes platform with integrated AI capabilities in a single 4-week sprint with a 3-architect team.",
    challenge:
      "The client needed a production-ready Kubernetes platform with AI-powered operations, but had zero existing infrastructure and a hard 30-day deadline tied to a board presentation. Three architects needed to work in parallel without stepping on each other.",
    architecture: ["NextJS", "FastAPI", "K8s", "Redis", "Ansible", "Claude", "Gemini"],
    solution:
      "We established parallel workstreams — infrastructure-as-code with Ansible, application platform on K8s, and AI integration layer using Claude and Gemini for intelligent operations. Daily architecture sync ensured zero conflicts. Delivered 2 days early.",
    metrics: [
      { value: "4-Week", label: "Delivery" },
      { value: "3", label: "Architects" },
      { value: "Enterprise", label: "K8s Platform" },
    ],
    icon: CpuIcon,
    themeColor: "indigo",
    regionVisibility: { global: true, id: false },
  },
  {
    id: "ai-ops-saas-rescue",
    title: "AI-Augmented Operations & SaaS Cost Rescue",
    category: "Modernization",
    description:
      "Eliminated 100% of SaaS subscription costs by deploying self-hosted alternatives with 20+ AI agents handling operations autonomously.",
    challenge:
      "The client was hemorrhaging money on overlapping SaaS subscriptions — CRM, helpdesk, automation, and analytics tools that barely integrated. Support teams were drowning in manual ticket routing and repetitive queries.",
    architecture: ["Chatwoot", "n8n", "Docker", "Ansible", "RAG"],
    solution:
      "We replaced the entire SaaS stack with self-hosted open-source alternatives — Chatwoot for customer support, n8n for workflow automation — all orchestrated with Docker and Ansible. 20+ RAG-powered AI agents handle ticket classification, response drafting, and escalation routing.",
    metrics: [
      { value: "100%", label: "SaaS Costs Cut" },
      { value: "20+", label: "AI Agents" },
      { value: "RAG", label: "AI Pipeline" },
    ],
    icon: MessagesSquareIcon,
    themeColor: "emerald",
    regionVisibility: { global: false, id: true },
  },
  {
    id: "financial-modernization",
    title: "Financial Workflow Modernization for Australian Manufacturing",
    category: "Modernization",
    description:
      "Eliminated 100% of spreadsheet-driven financial workflows for a manufacturing company, replacing them with an end-to-end automated platform.",
    challenge:
      "A mid-size Australian manufacturer ran their entire financial operations — invoicing, purchase orders, inventory costing, and reconciliation — through a labyrinth of interconnected spreadsheets. One formula error could cascade across months of financial data.",
    architecture: ["T3 Stack", "PostgreSQL", "Supabase", "Vercel"],
    solution:
      "We built a rapid MVP using the T3 stack deployed on Vercel with Supabase as the data layer. Financial workflows were modeled as state machines with full audit trails. The system replaced every spreadsheet within 6 weeks, with real-time dashboards replacing monthly manual reports.",
    metrics: [
      { value: "100%", label: "Spreadsheets Eliminated" },
      { value: "6-Week", label: "Rapid MVP" },
      { value: "E2E", label: "Automation" },
    ],
    icon: FileSpreadsheetIcon,
    themeColor: "orange",
    regionVisibility: { global: true, id: true },
  },
];

/* ── Filter logic ─────────────────────────────────────────── */

const categories: Category[] = ["Enterprise", "AI & Velocity", "Modernization"];

function getVisibleStudies(region: Region, activeCategory: Category | null): CaseStudyData[] {
  if (activeCategory) {
    return caseStudies.filter((s) => s.category === activeCategory);
  }
  return caseStudies.filter((s) => s.regionVisibility[region]);
}

/* ── Theme maps ───────────────────────────────────────────── */

const cardGlowClasses: Record<ThemeColor, string> = {
  blue: "hover:shadow-[0_0_32px_0_rgba(59,130,246,0.15)]",
  indigo: "hover:shadow-[0_0_32px_0_rgba(99,102,241,0.15)]",
  emerald: "hover:shadow-[0_0_32px_0_rgba(16,185,129,0.15)]",
  orange: "hover:shadow-[0_0_32px_0_rgba(249,115,22,0.15)]",
};

const categoryBadgeClasses: Record<ThemeColor, string> = {
  blue: "border-blue-500/30 text-blue-400",
  indigo: "border-indigo-500/30 text-indigo-400",
  emerald: "border-emerald-500/30 text-emerald-400",
  orange: "border-orange-500/30 text-orange-400",
};

const metricValueClasses: Record<ThemeColor, string> = {
  blue: "text-blue-400",
  indigo: "text-indigo-400",
  emerald: "text-emerald-400",
  orange: "text-orange-400",
};

/* ── Component ────────────────────────────────────────────── */

function CaseStudies({ region }: { region: Region }) {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [drawerStudy, setDrawerStudy] = useState<CaseStudy | null>(null);
  const [closingCardId, setClosingCardId] = useState<string | null>(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });
  const scrollRef = useRef<HTMLDivElement>(null);

  const visibleStudies = getVisibleStudies(region, activeCategory);

  /* ── Scroll state tracking ──────────────────────────────── */

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScroll({
      left: scrollLeft > 1,
      right: scrollLeft + clientWidth < scrollWidth - 1,
    });
  }, []);

  // Recalculate on filter change + mount
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = 0;
    // Small delay to let AnimatePresence settle layout
    const id = requestAnimationFrame(updateScrollState);
    return () => cancelAnimationFrame(id);
  }, [visibleStudies.length, updateScrollState]);

  // Recalculate on resize
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => ro.disconnect();
  }, [updateScrollState]);

  /* ── Programmatic smooth scroll (works with overflow:hidden) ── */

  const animationRef = useRef<number>(0);

  const smoothScrollTo = useCallback(
    (target: number, duration = 250) => {
      const el = scrollRef.current;
      if (!el) return;
      cancelAnimationFrame(animationRef.current);

      const start = el.scrollLeft;
      const delta = target - start;
      let startTime: number | null = null;

      function step(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el!.scrollLeft = start + delta * eased;
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(step);
        } else {
          updateScrollState();
        }
      }

      animationRef.current = requestAnimationFrame(step);
    },
    [updateScrollState]
  );

  const scroll = useCallback(
    (direction: "left" | "right") => {
      const container = scrollRef.current;
      if (!container) return;
      const cardWidth = container.firstElementChild?.getBoundingClientRect().width ?? 360;
      const gap = 24;
      const offset = direction === "left" ? -(cardWidth + gap) : cardWidth + gap;
      const target = Math.max(
        0,
        Math.min(container.scrollLeft + offset, container.scrollWidth - container.clientWidth)
      );
      smoothScrollTo(target);
    },
    [smoothScrollTo]
  );

  /* ── Touch swipe handlers with snap-to-card ───────────────── */

  const touchRef = useRef<{
    startX: number;
    startY: number;
    startScrollLeft: number;
    prevX: number;
    prevTime: number;
    velocity: number;
  } | null>(null);
  const isDraggingRef = useRef(false);

  /** Snap scrollLeft to the nearest card boundary */
  const snapToNearestCard = useCallback(
    (velocity: number) => {
      const el = scrollRef.current;
      if (!el) return;
      const cardWidth = el.firstElementChild?.getBoundingClientRect().width ?? 360;
      const gap = 24;
      const step = cardWidth + gap;
      const maxScroll = el.scrollWidth - el.clientWidth;

      // Apply inertia: project position based on velocity (px/ms → px, damped)
      const projected = el.scrollLeft + velocity * 150;

      // Snap to nearest card boundary
      const index = Math.round(projected / step);
      const target = Math.max(0, Math.min(index * step, maxScroll));

      smoothScrollTo(target, 250);
    },
    [smoothScrollTo]
  );

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function onTouchStart(e: TouchEvent) {
      cancelAnimationFrame(animationRef.current);
      const now = performance.now();
      touchRef.current = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        startScrollLeft: el!.scrollLeft,
        prevX: e.touches[0].clientX,
        prevTime: now,
        velocity: 0,
      };
      isDraggingRef.current = false;
    }

    function onTouchMove(e: TouchEvent) {
      const touch = touchRef.current;
      if (!touch) return;

      const currentX = e.touches[0].clientX;
      const deltaX = touch.startX - currentX;
      const deltaY = touch.startY - e.touches[0].clientY;

      // If vertical swipe dominates, bail out and let page scroll
      if (!isDraggingRef.current && Math.abs(deltaY) > Math.abs(deltaX)) {
        touchRef.current = null;
        return;
      }

      // Horizontal swipe — prevent page scroll and move carousel
      isDraggingRef.current = true;
      e.preventDefault();
      el!.scrollLeft = touch.startScrollLeft + deltaX;

      // Track velocity (px/ms)
      const now = performance.now();
      const dt = now - touch.prevTime;
      if (dt > 0) {
        touch.velocity = (touch.prevX - currentX) / dt;
      }
      touch.prevX = currentX;
      touch.prevTime = now;
    }

    function onTouchEnd() {
      const touch = touchRef.current;
      const wasDragging = isDraggingRef.current;
      touchRef.current = null;
      isDraggingRef.current = false;

      if (wasDragging && touch) {
        snapToNearestCard(touch.velocity);
      } else {
        updateScrollState();
      }
    }

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [updateScrollState, snapToNearestCard]);

  const closeDrawer = useCallback(() => {
    setDrawerStudy(null);
    // Clear closingCardId after animation to let card reappear
    if (closingCardId) {
      setTimeout(() => setClosingCardId(null), 300);
    }
  }, [closingCardId]);

  return (
    <MotionSection id="case-studies" variant="muted">
      <div className="space-y-10">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Proven at Scale
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Case Studies</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real results for real businesses. Here&rsquo;s what high-velocity engineering looks like
            in practice.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory(null)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
              activeCategory === null
                ? "border-primary bg-primary/10 text-primary"
                : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
            )}
          >
            All Work
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                activeCategory === cat
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border/60 text-muted-foreground hover:border-border hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Carousel wrapper — horizontal padding reserves space for arrows */}
        <div className="relative px-0 md:px-12 lg:px-14">
          {/* Navigation arrows — only visible when content overflows */}
          {canScroll.left && (
            <button
              type="button"
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border/60 bg-card/80 p-2 text-muted-foreground shadow-soft backdrop-blur-sm transition-colors hover:text-foreground md:flex"
              aria-label="Scroll left"
            >
              <ChevronLeftIcon className="size-5" />
            </button>
          )}
          {canScroll.right && (
            <button
              type="button"
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border/60 bg-card/80 p-2 text-muted-foreground shadow-soft backdrop-blur-sm transition-colors hover:text-foreground md:flex"
              aria-label="Scroll right"
            >
              <ChevronRightIcon className="size-5" />
            </button>
          )}

          {/* Scroll track — overflow:hidden prevents scroll hijacking; movement is JS-only */}
          <motion.div
            ref={scrollRef}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className={cn(
              "scrollbar-none flex gap-6 overflow-hidden pb-4",
              !canScroll.left && !canScroll.right ? "justify-center" : "justify-start"
            )}
          >
            <AnimatePresence mode="popLayout">
              {visibleStudies.map((study) => (
                <motion.div
                  key={study.id}
                  variants={scaleIn}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={
                    closingCardId === study.id
                      ? { opacity: 0, scale: 0.9, transition: { duration: 0.15 } }
                      : undefined
                  }
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="w-[320px] flex-shrink-0 sm:w-[360px]"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setClosingCardId(study.id);
                      setDrawerStudy(study);
                    }}
                    className="block w-full text-left"
                  >
                    <BorderGlow className="h-full">
                      <div
                        className={cn(
                          "flex h-[480px] flex-col overflow-hidden rounded-xl border border-border/60 bg-card transition-shadow duration-300 sm:h-[500px]",
                          cardGlowClasses[study.themeColor]
                        )}
                      >
                        {/* Card header */}
                        <div className="flex flex-col gap-3 p-5">
                          {/* Category badge + icon */}
                          <div className="flex items-center gap-2">
                            <study.icon
                              className={cn("size-4", metricValueClasses[study.themeColor])}
                            />
                            <span
                              className={cn(
                                "rounded-full border px-2.5 py-0.5 text-xs font-medium",
                                categoryBadgeClasses[study.themeColor]
                              )}
                            >
                              {study.category}
                            </span>
                          </div>

                          {/* Title */}
                          <h3 className="text-base font-semibold leading-snug text-foreground">
                            {study.title}
                          </h3>

                          {/* Description */}
                          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                            {study.description}
                          </p>
                        </div>

                        {/* Metric badges */}
                        <div className="flex gap-4 border-t border-border/30 px-5 py-3">
                          {study.metrics.map((metric) => (
                            <div key={metric.label} className="space-y-0.5">
                              <p
                                className={cn(
                                  "text-lg font-bold",
                                  metricValueClasses[study.themeColor]
                                )}
                              >
                                {metric.value}
                              </p>
                              <p className="text-[11px] text-muted-foreground">{metric.label}</p>
                            </div>
                          ))}
                        </div>

                        {/* Abstract visual — fills remaining space */}
                        <div className="mt-auto flex-1">
                          <CardAbstract
                            themeColor={study.themeColor}
                            className="h-full rounded-none"
                          />
                        </div>
                      </div>
                    </BorderGlow>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Discuss your infrastructure
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      {/* Deep-dive drawer */}
      <CaseStudyDrawer study={drawerStudy} onClose={closeDrawer} />
    </MotionSection>
  );
}

export { CaseStudies };
