"use client";

import { motion } from "framer-motion";

import { fadeInUp, staggerContainer, tapVariant, hoverVariant } from "@/lib/motion";
import { MotionSection } from "@/components/layout/motion-section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "AI-Augmented Execution",
    label: "Velocity",
    description:
      "We utilize proprietary internal AI workflows to automate boilerplate, testing, and DevOps. You get the output of a 10-person team with the quality control of 3 senior architects.",
  },
  {
    title: "Cloud-Native Reliability",
    label: "Infrastructure",
    description:
      "Zero manual server deployments. We build enterprise-grade K8s and Docker architectures that refuse to crash under pressure.",
  },
  {
    title: "Consumer-Grade UI",
    label: "Aesthetics",
    description:
      "B2B software shouldn\u2019t require a training manual. We design hyper-polished interfaces that your team will actually love using.",
  },
] as const;

function Solution() {
  return (
    <MotionSection id="solution">
      <div className="space-y-12">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The Orchestrator Advantage
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.label} variants={fadeInUp}>
              <motion.div whileHover={hoverVariant} whileTap={tapVariant}>
                <Card className="h-full">
                  <CardHeader>
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                      {feature.label}
                    </p>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MotionSection>
  );
}

export { Solution };
