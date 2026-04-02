import { ExternalLinkIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/company/creatinsystems" },
  { label: "GitHub", href: "https://github.com/creatinsystems" },
] as const;

function Footer({ className, ...props }: React.ComponentProps<"footer">) {
  return (
    <footer
      className={cn("border-t border-border/40 bg-background py-8", className)}
      role="contentinfo"
      {...props}
    >
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Creatin Systems. All rights reserved.
        </p>

        <nav aria-label="Social links" className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              <ExternalLinkIcon className="size-3" />
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}

export { Footer };
