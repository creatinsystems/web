import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

function Footer({ className, ...props }: React.ComponentProps<"footer">) {
  return (
    <footer className={cn("border-t border-border/40 bg-background py-8", className)} {...props}>
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Creatin Systems. All rights reserved.
        </p>

        <nav className="flex items-center gap-4">
          <a
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Terms
          </a>
        </nav>
      </Container>
    </footer>
  );
}

export { Footer };
