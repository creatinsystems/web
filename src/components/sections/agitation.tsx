"use client";

import { MotionSection } from "@/components/layout/motion-section";

function Agitation() {
  return (
    <MotionSection id="problem" variant="muted">
      <div className="mx-auto max-w-3xl space-y-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">The Cost of Legacy Tech</h2>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Most businesses are trapped using fragile monolithic architecture or ERPs that look like
          Windows&nbsp;95. Your engineers hate maintaining it, your team hates using it, and your
          business slows down because of it. We fix that.
        </p>
      </div>
    </MotionSection>
  );
}

export { Agitation };
