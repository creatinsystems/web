"use client";

import { cn } from "@/lib/utils";

type ThemeColor = "blue" | "indigo" | "emerald" | "orange";

interface CardAbstractProps {
  themeColor: ThemeColor;
  className?: string;
}

function CardAbstract({ themeColor, className }: CardAbstractProps) {
  return (
    <div
      className={cn(
        "relative flex h-40 w-full items-center justify-center overflow-hidden rounded-lg",
        className
      )}
    >
      {themeColor === "blue" && <BlueAbstract />}
      {themeColor === "indigo" && <IndigoAbstract />}
      {themeColor === "emerald" && <EmeraldAbstract />}
      {themeColor === "orange" && <OrangeAbstract />}
    </div>
  );
}

function BlueAbstract() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-blue-900/10" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-32 w-32 rounded-full bg-blue-500/20 blur-2xl" />
      </div>
      <div className="absolute right-4 bottom-4 h-16 w-16 rounded-full bg-blue-400/15 blur-xl" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute left-4 top-4 h-px w-20 bg-blue-400/40" />
        <div className="absolute left-4 top-6 h-12 w-px bg-blue-400/30" />
        <div className="absolute bottom-8 right-8 h-px w-16 bg-blue-400/40" />
        <div className="absolute bottom-6 right-6 h-8 w-px bg-blue-400/30" />
      </div>
    </>
  );
}

function IndigoAbstract() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-indigo-900/10" />
      <div className="relative">
        <div className="h-24 w-24 rounded-full border border-indigo-400/20" />
        <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-400/15" />
        <div className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/10" />
      </div>
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-indigo-500/10 to-transparent" />
    </>
  );
}

function EmeraldAbstract() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/15 via-transparent to-emerald-900/10" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 8px,
          rgba(16, 185, 129, 0.08) 8px,
          rgba(16, 185, 129, 0.08) 16px
        )`,
        }}
      />
      <div className="absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-emerald-500/10 to-transparent" />
      <div className="absolute right-8 top-8 h-12 w-12 rotate-12 rounded-sm border border-emerald-400/20" />
      <div className="absolute bottom-12 left-8 h-16 w-16 -rotate-6 rounded-sm border border-emerald-400/15" />
    </>
  );
}

function OrangeAbstract() {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-transparent to-orange-900/10" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <div className="h-20 w-20 rounded-full bg-orange-500/20 blur-xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 rotate-45 rounded-sm border border-orange-400/30" />
          </div>
        </div>
      </div>
      <div className="absolute left-4 top-1/2 h-1 w-16 -translate-y-1/2 bg-orange-400/30" />
      <div className="absolute right-4 top-1/2 h-1 w-12 -translate-y-1/2 bg-orange-400/20" />
      <div className="absolute bottom-8 left-1/2 h-8 w-px -translate-x-1/2 bg-orange-400/25" />
    </>
  );
}

export { CardAbstract, type ThemeColor };
