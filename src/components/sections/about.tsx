"use client";

import { motion } from "framer-motion";
import { ZapIcon, UsersIcon, CodeIcon } from "lucide-react";

import { fadeInLeft, fadeInRight, staggerContainer, fadeInUp } from "@/lib/motion";
import { MotionSection } from "@/components/layout/motion-section";

const principles = [
  {
    icon: ZapIcon,
    title: "Speed Without Shortcuts",
    description:
      "AI-augmented workflows let us move at startup speed with enterprise-grade quality control. No corners cut, no tech debt deferred.",
  },
  {
    icon: UsersIcon,
    title: "Your Team, Extended",
    description:
      "We embed with your engineers, not above them. Transparent processes, shared repos, real-time collaboration from day one.",
  },
  {
    icon: CodeIcon,
    title: "Built to Outlast Us",
    description:
      "Every system we deliver is documented, tested, and designed for your team to own long after our engagement ends.",
  },
] as const;

function About() {
  return (
    <MotionSection id="about">
      <div className="space-y-16">
        {/* Two-column intro */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why Creatin
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Modern Engineering
              <br />
              for Modern Problems
            </h2>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-4"
          >
            <p className="text-lg leading-relaxed text-muted-foreground">
              Most businesses are trapped by fragile monolithic architecture or ERPs that look like
              Windows&nbsp;95. Engineers hate maintaining them, teams hate using them, and the
              business slows down because of it.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              We exist to replace that friction with velocity. Cloud-native infrastructure,
              consumer-grade interfaces, and an AI-augmented workflow that delivers in weeks what
              used to take quarters.
            </p>
          </motion.div>
        </div>

        {/* Principles grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 md:grid-cols-3"
        >
          {principles.map((principle) => (
            <motion.div key={principle.title} variants={fadeInUp} className="space-y-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <principle.icon className="size-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">{principle.title}</h3>
              <p className="leading-relaxed text-muted-foreground">{principle.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </MotionSection>
  );
}

export { About };
