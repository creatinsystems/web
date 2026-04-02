import { cn } from "@/lib/utils";

import { Container } from "@/components/layout/container";

type SectionVariant = "default" | "muted" | "accent";

function Section({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"section"> & { variant?: SectionVariant }) {
  return (
    <section
      className={cn(
        "py-24 sm:py-32",
        variant === "muted" && "bg-muted/50",
        variant === "accent" && "bg-glow-accent",
        className
      )}
      {...props}
    >
      <Container>{props.children}</Container>
    </section>
  );
}

export { Section };
export type { SectionVariant };
