"use client";

import { motion } from "framer-motion";
import { CloudIcon, PaletteIcon, CpuIcon, type LucideIcon } from "lucide-react";

import {
  fadeInLeft,
  fadeInUp,
  fadeInRight,
  staggerContainer,
  tapVariant,
  hoverVariant,
} from "@/lib/motion";
import { MotionSection } from "@/components/layout/motion-section";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BorderGlow } from "@/components/visuals/border-glow";
import type { Variants } from "framer-motion";

interface Service {
  title: string;
  label: string;
  description: string;
  icon: LucideIcon;
  animation: Variants;
}

const services: Service[] = [
  {
    title: "AI-Augmented Execution",
    label: "Velocity",
    icon: CpuIcon,
    animation: fadeInLeft,
    description:
      "We utilize proprietary internal AI workflows to automate boilerplate, testing, and DevOps. You get the output of a 10-person team with the quality control of 3 senior architects.",
  },
  {
    title: "Cloud-Native Reliability",
    label: "Infrastructure",
    icon: CloudIcon,
    animation: fadeInUp,
    description:
      "Zero manual server deployments. We build enterprise-grade K8s and Docker architectures that refuse to crash under pressure.",
  },
  {
    title: "Consumer-Grade UI",
    label: "Aesthetics",
    icon: PaletteIcon,
    animation: fadeInRight,
    description:
      "B2B software shouldn\u2019t require a training manual. We design hyper-polished interfaces that your team will actually love using.",
  },
];

function Services() {
  return (
    <MotionSection id="services">
      <div className="space-y-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            What We Build
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Engineering That Compounds
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three capabilities. One team. Zero compromise.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 md:grid-cols-3"
        >
          {services.map((service) => (
            <motion.div key={service.label} variants={service.animation}>
              <motion.div whileHover={hoverVariant} whileTap={tapVariant}>
                <BorderGlow className="h-full">
                  <Card className="h-full border-0 bg-transparent shadow-none">
                    <CardHeader>
                      <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                        <service.icon className="size-5 text-primary" />
                      </div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                        {service.label}
                      </p>
                      <CardTitle>{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {service.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </BorderGlow>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MotionSection>
  );
}

export { Services };
