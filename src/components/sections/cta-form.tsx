"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { track } from "@vercel/analytics";

import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import { submitContact } from "@/actions/contact";
import { tapVariant, hoverVariant } from "@/lib/motion";
import { MotionSection } from "@/components/layout/motion-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GradientText } from "@/components/visuals/gradient-text";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-sm text-destructive" role="alert">
      {message}
    </p>
  );
}

function CtaForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      headache: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    const result = await submitContact(data);

    if (result.success) {
      track("form_submission", { form: "contact_audit" });
      toast.success("Audit Request Received. We'll be in touch shortly.");
      reset();
    } else {
      toast.error(result.error);
    }
  };

  return (
    <MotionSection id="contact" variant="accent">
      <div className="mx-auto max-w-2xl space-y-8 text-center">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Get Started
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Stop Guessing. <GradientText animationSpeed={6}>Start Scaling.</GradientText>
          </h2>
          <p className="text-lg text-muted-foreground">
            Get a free, 1-page technical audit of your current system. We&rsquo;ll analyze your
            speed, security, and UX bottlenecks. No sales pressure, just actionable engineering
            advice.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto max-w-md space-y-5 rounded-xl border border-border/60 bg-card p-6 text-left shadow-card sm:p-8"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Jane Doe"
              disabled={isSubmitting}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name")}
            />
            <FieldError id="name-error" message={errors.name?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Work Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="jane@company.com"
              disabled={isSubmitting}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
            />
            <FieldError id="email-error" message={errors.email?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company / URL</Label>
            <Input
              id="company"
              placeholder="https://company.com (optional)"
              disabled={isSubmitting}
              {...register("company")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="headache">What is your biggest tech headache right now?</Label>
            <Textarea
              id="headache"
              placeholder="Tell us about the system or process that keeps you up at night..."
              className="min-h-28"
              disabled={isSubmitting}
              aria-invalid={!!errors.headache}
              aria-describedby={errors.headache ? "headache-error" : undefined}
              {...register("headache")}
            />
            <FieldError id="headache-error" message={errors.headache?.message} />
          </div>

          <motion.div
            whileTap={isSubmitting ? undefined : tapVariant}
            whileHover={isSubmitting ? undefined : hoverVariant}
          >
            <Button type="submit" className="min-h-11 w-full text-base" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Sending...
                </>
              ) : (
                "Request Free Audit"
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </MotionSection>
  );
}

export { CtaForm };
