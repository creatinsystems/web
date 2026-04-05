"use client";

import { motion } from "framer-motion";
import { ShieldCheckIcon, CloudIcon, BarChart3Icon, type LucideIcon } from "lucide-react";

import { scaleIn, staggerContainer } from "@/lib/motion";
import { MotionSection } from "@/components/layout/motion-section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { DashboardMockup } from "@/components/visuals/dashboard-mockup";
import { BorderGlow } from "@/components/visuals/border-glow";
import type { Region } from "@/lib/region";

/* ── Case study data ──────────────────────────────────────── */

interface CaseStudy {
  title: string | Record<Region, string>;
  description: string;
  metrics: { value: string; label: string }[];
  icon: LucideIcon;
  visual?: "dashboard" | "gradient";
  gradient?: string;
}

const caseStudies: CaseStudy[] = [
  {
    title: {
      global: "Automated Security Operations for a Top-Tier Cloud Provider",
      id: "Automated Security Operations for a Top 3 Indonesian Cloud Provider",
    },
    description:
      "Replaced a manual vulnerability reporting process with a fully automated, AI-assisted pipeline. Secure, lightning-fast, and entirely hands-off.",
    metrics: [
      { value: "60+", label: "Hours / Month Saved" },
      { value: "0", label: "Reporting Latency" },
    ],
    icon: ShieldCheckIcon,
    visual: "dashboard",
  },
  {
    title: "Cloud Migration Platform for Series B SaaS",
    description:
      "Designed and executed a zero-downtime migration from legacy monolith to cloud-native microservices. Kubernetes orchestration with automated rollback.",
    metrics: [
      { value: "99.99%", label: "Uptime During Migration" },
      { value: "3x", label: "Deploy Frequency" },
    ],
    icon: CloudIcon,
    visual: "gradient",
    gradient: "from-electric-500/20 to-electric-700/5",
  },
  {
    title: "Real-Time Analytics Dashboard",
    description:
      "Built a consumer-grade analytics interface processing millions of events per day. Sub-second query performance with a UI teams actually enjoy using.",
    metrics: [
      { value: "<200ms", label: "P95 Query Latency" },
      { value: "2M+", label: "Daily Events Processed" },
    ],
    icon: BarChart3Icon,
    visual: "gradient",
    gradient: "from-electric-400/15 to-electric-600/5",
  },
];

/* ── Placeholder visual for case studies without dashboard ── */

function GradientPlaceholder({ gradient, icon: Icon }: { gradient: string; icon: LucideIcon }) {
  return (
    <div
      className={`flex aspect-[4/3] items-center justify-center rounded-lg bg-gradient-to-br ${gradient}`}
    >
      <Icon className="size-12 text-primary/40" />
    </div>
  );
}

/* ── Case Studies section ─────────────────────────────────── */

function CaseStudies({ region }: { region: Region }) {
  return (
    <MotionSection id="case-studies" variant="muted">
      <div className="space-y-16">
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

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid gap-8 lg:grid-cols-3"
        >
          {caseStudies.map((study, i) => {
            const title = typeof study.title === "string" ? study.title : study.title[region];

            return (
              <motion.div key={i} variants={scaleIn}>
                <BorderGlow className="h-full">
                  <Card className="flex h-full flex-col border-0 bg-transparent shadow-none">
                    {/* Visual */}
                    <CardContent className="pt-4">
                      {study.visual === "dashboard" ? (
                        <div className="overflow-hidden rounded-lg">
                          <DashboardMockup />
                        </div>
                      ) : (
                        <GradientPlaceholder
                          gradient={study.gradient ?? "from-muted to-muted/50"}
                          icon={study.icon}
                        />
                      )}
                    </CardContent>

                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <study.icon className="size-4 text-primary" />
                        <CardTitle className="text-base">{title}</CardTitle>
                      </div>
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col justify-between gap-4">
                      <CardDescription className="leading-relaxed">
                        {study.description}
                      </CardDescription>

                      {/* Metrics */}
                      <div className="flex gap-6 border-t border-border/40 pt-4">
                        {study.metrics.map((metric) => (
                          <div key={metric.label} className="space-y-0.5">
                            <p className="text-2xl font-bold text-primary">{metric.value}</p>
                            <p className="text-xs text-muted-foreground">{metric.label}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </BorderGlow>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </MotionSection>
  );
}

export { CaseStudies };
