"use client";

import { motion } from "framer-motion";

import { tapVariant, hoverVariant } from "@/lib/motion";
import { MotionSection } from "@/components/layout/motion-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function CtaForm() {
  return (
    <MotionSection id="contact">
      <div className="mx-auto max-w-2xl space-y-8 text-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Stop Guessing. Start Scaling.
          </h2>
          <p className="text-lg text-muted-foreground">
            Get a free, 1-page technical audit of your current system. We&rsquo;ll analyze your
            speed, security, and UX bottlenecks. No sales pressure, just actionable engineering
            advice.
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="mx-auto max-w-md space-y-5 text-left">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Jane Doe" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Work Email</Label>
            <Input id="email" type="email" placeholder="jane@company.com" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company / URL</Label>
            <Input id="company" placeholder="https://company.com (optional)" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="headache">What is your biggest tech headache right now?</Label>
            <Textarea
              id="headache"
              placeholder="Tell us about the system or process that keeps you up at night..."
              className="min-h-28"
            />
          </div>

          <motion.div whileTap={tapVariant} whileHover={hoverVariant}>
            <Button type="submit" className="w-full">
              Request Free Audit
            </Button>
          </motion.div>
        </form>
      </div>
    </MotionSection>
  );
}

export { CtaForm };
