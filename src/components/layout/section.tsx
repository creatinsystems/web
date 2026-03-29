import { cn } from "@/lib/utils";

import { Container } from "@/components/layout/container";

type SectionVariant = "default" | "muted";

function Section({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"section"> & { variant?: SectionVariant }) {
  return (
    <section
      className={cn("py-16 sm:py-24", variant === "muted" && "bg-muted/50", className)}
      {...props}
    >
      <Container>{props.children}</Container>
    </section>
  );
}

export { Section };
export type { SectionVariant };
