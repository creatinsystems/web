"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { MobileNav } from "@/components/layout/mobile-nav";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

function Navbar({ className, ...props }: React.ComponentProps<"header">) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 16);
  });

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border/40 bg-background/40 backdrop-blur-lg"
          : "border-transparent bg-transparent",
        className
      )}
      {...props}
    >
      <Container className="flex h-14 items-center justify-between">
        <Link href="/" className="font-heading text-lg font-bold tracking-tight">
          Creatin Systems
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
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

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className={cn(buttonVariants({ size: "sm" }), "hidden min-h-9 md:inline-flex")}
          >
            Claim Free Audit
          </a>
          <MobileNav links={navLinks} open={mobileOpen} onOpenChange={setMobileOpen} />
        </div>
      </Container>
    </header>
  );
}

export { Navbar };
