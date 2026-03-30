"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import { tapVariant, hoverVariant } from "@/lib/motion";
import { MotionSection } from "@/components/layout/motion-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  headache: string;
}

function CtaForm() {
  const { register, handleSubmit } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      headache: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    // TODO: wire to server action in #20
    console.log(data);
  };

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

        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-md space-y-5 text-left">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Jane Doe" {...register("name")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Work Email</Label>
            <Input id="email" type="email" placeholder="jane@company.com" {...register("email")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company / URL</Label>
            <Input
              id="company"
              placeholder="https://company.com (optional)"
              {...register("company")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="headache">What is your biggest tech headache right now?</Label>
            <Textarea
              id="headache"
              placeholder="Tell us about the system or process that keeps you up at night..."
              className="min-h-28"
              {...register("headache")}
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
