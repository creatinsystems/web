"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";

const navLinks = [
  { label: "The Problem", href: "#problem" },
  { label: "The Solution", href: "#solution" },
  { label: "Case Study", href: "#case-study" },
  { label: "Contact", href: "#contact" },
] as const;

function Navbar({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg",
        className
      )}
      {...props}
    >
      <Container className="flex h-14 items-center justify-between">
        <Link href="/" className="font-heading text-lg font-bold tracking-tight">
          Creatin Systems
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className={cn(buttonVariants({ size: "sm" }), "hidden min-h-9 sm:inline-flex")}
        >
          Claim Free Infrastructure Audit
        </a>
      </Container>
    </header>
  );
}

export { Navbar };
