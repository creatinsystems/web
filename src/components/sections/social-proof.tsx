"use client";

import { motion } from "framer-motion";

import { fadeInUp, staggerContainer } from "@/lib/motion";
import { MotionSection } from "@/components/layout/motion-section";
import { DashboardMockup } from "@/components/visuals/dashboard-mockup";
import type { Region } from "@/lib/region";

const caseStudyTitles: Record<Region, string> = {
  global: "Automated Security Operations for a Top-Tier Cloud Provider",
  id: "Automated Security Operations for a Top 3 Indonesian Cloud Provider",
};

const metrics = [
  { value: "60+", label: "Hours / Month Saved" },
  { value: "0", label: "Reporting Latency" },
] as const;

function SocialProof({ region }: { region: Region }) {
  return (
    <MotionSection id="case-study" variant="muted">
      <div className="space-y-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Proven at Scale</h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Narrative */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">{caseStudyTitles[region]}</h3>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="flex gap-8"
            >
              {metrics.map((metric) => (
                <motion.div key={metric.label} variants={fadeInUp} className="space-y-1">
                  <p className="text-4xl font-bold text-primary sm:text-5xl">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </motion.div>
              ))}
            </motion.div>

            <p className="leading-relaxed text-muted-foreground">
              Replaced a manual vulnerability reporting process with a fully automated, AI-assisted
              pipeline. Secure, lightning-fast, and entirely hands-off.
            </p>
          </div>

          {/* Security dashboard mockup */}
          <div className="flex items-center justify-center">
            <DashboardMockup />
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

export { SocialProof };
