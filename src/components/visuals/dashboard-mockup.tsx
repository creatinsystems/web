"use client";

import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  ActivityIcon,
  ClockIcon,
  AlertTriangleIcon,
  LayoutDashboardIcon,
  ScanEyeIcon,
  SettingsIcon,
  BellIcon,
  SearchIcon,
  ChevronRightIcon,
  CircleIcon,
} from "lucide-react";

import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/* ── Fake data ────────────────────────────────────────────── */

const metrics = [
  { label: "Vulnerabilities Patched", value: "1,247", delta: "+23 today", icon: ShieldCheckIcon },
  { label: "Avg Response Time", value: "1.2s", delta: "-0.3s vs last week", icon: ClockIcon },
  { label: "System Uptime", value: "99.98%", delta: "30-day rolling", icon: ActivityIcon },
  {
    label: "Active Alerts",
    value: "3",
    delta: "2 critical",
    icon: AlertTriangleIcon,
    alert: true,
  },
] as const;

const activityLog = [
  {
    time: "2 min ago",
    message: "CVE-2025-3891 auto-patched on prod-cluster-03",
    status: "success",
  },
  {
    time: "8 min ago",
    message: "Scan completed: 0 new vulnerabilities detected",
    status: "success",
  },
  {
    time: "14 min ago",
    message: "Alert escalated: unusual egress traffic on node-07",
    status: "warning",
  },
  { time: "31 min ago", message: "Compliance report generated for Q1 2025 audit", status: "info" },
  {
    time: "1 hr ago",
    message: "Dependency update: 14 packages upgraded across 3 services",
    status: "success",
  },
] as const;

const severities = [
  { level: "Critical", count: 2, color: "bg-red-500" },
  { level: "High", count: 5, color: "bg-orange-500" },
  { level: "Medium", count: 12, color: "bg-yellow-500" },
  { level: "Low", count: 34, color: "bg-green-500" },
] as const;

const sidebarItems = [
  { icon: LayoutDashboardIcon, label: "Overview", active: true },
  { icon: ShieldCheckIcon, label: "Vulnerabilities", active: false },
  { icon: ScanEyeIcon, label: "Scans", active: false },
  { icon: ActivityIcon, label: "Activity", active: false },
  { icon: SettingsIcon, label: "Settings", active: false },
] as const;

const statusDotColor: Record<string, string> = {
  success: "text-green-400",
  warning: "text-yellow-400",
  info: "text-blue-400",
};

/* ── Sparkline SVG (pure CSS/SVG) ─────────────────────────── */

function Sparkline() {
  return (
    <svg viewBox="0 0 80 24" className="h-6 w-20" fill="none">
      <polyline
        points="0,20 10,16 20,18 30,10 40,12 50,6 60,8 70,3 80,5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      />
    </svg>
  );
}

/* ── Dashboard Mockup ─────────────────────────────────────── */

function DashboardMockup() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border/60 bg-background shadow-card">
      {/* Scaled container — looks like a miniature screenshot */}
      <div
        className="origin-top-left scale-[0.55] sm:scale-[0.6]"
        style={{ width: "182%", height: "182%" }}
      >
        <div className="flex min-h-[520px]">
          {/* Sidebar */}
          <div className="flex w-48 shrink-0 flex-col border-r border-border/40 bg-card px-3 py-4">
            <div className="mb-4 px-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">SecOps</p>
            </div>
            <nav className="space-y-1">
              {sidebarItems.map((item) => (
                <div
                  key={item.label}
                  className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium ${
                    item.active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="size-3.5" />
                  {item.label}
                </div>
              ))}
            </nav>
          </div>

          {/* Main content */}
          <div className="flex-1 space-y-4 p-4">
            {/* Header bar */}
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Security Operations Dashboard</h3>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-36 items-center gap-1.5 rounded-lg border border-border/60 bg-card px-2">
                  <SearchIcon className="size-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">Search...</span>
                </div>
                <div className="relative">
                  <BellIcon className="size-3.5 text-muted-foreground" />
                  <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-red-500" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Metric cards */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-4 gap-3"
            >
              {metrics.map((m) => (
                <motion.div key={m.label} variants={fadeInUp}>
                  <Card className="p-0">
                    <CardContent className="space-y-1 p-3">
                      <div className="flex items-center justify-between">
                        <m.icon
                          className={`size-3.5 ${
                            "alert" in m && m.alert ? "text-destructive" : "text-muted-foreground"
                          }`}
                        />
                        <Sparkline />
                      </div>
                      <p className="text-lg font-bold leading-none">{m.value}</p>
                      <p className="text-[10px] text-muted-foreground">{m.label}</p>
                      <p className="text-[9px] text-primary">{m.delta}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            <div className="grid grid-cols-3 gap-3">
              {/* Activity timeline */}
              <div className="col-span-2">
                <Card className="p-0">
                  <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-xs">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 px-3 pb-3">
                    {activityLog.map((entry, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CircleIcon
                          className={`mt-0.5 size-2 shrink-0 fill-current ${statusDotColor[entry.status]}`}
                        />
                        <div className="flex-1 space-y-0.5">
                          <p className="text-[10px] leading-tight text-foreground">
                            {entry.message}
                          </p>
                          <p className="text-[9px] text-muted-foreground">{entry.time}</p>
                        </div>
                        <ChevronRightIcon className="mt-0.5 size-2.5 shrink-0 text-muted-foreground" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Severity breakdown */}
              <div>
                <Card className="p-0">
                  <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-xs">Alert Severity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 px-3 pb-3">
                    {severities.map((s) => (
                      <div key={s.level} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`size-2 rounded-full ${s.color}`} />
                          <span className="text-[10px]">{s.level}</span>
                        </div>
                        <Badge variant="secondary" className="h-4 px-1.5 text-[9px]">
                          {s.count}
                        </Badge>
                      </div>
                    ))}

                    <Separator className="my-2" />

                    {/* Mini bar chart */}
                    <div className="space-y-1.5">
                      {severities.map((s) => (
                        <div key={s.level} className="flex items-center gap-2">
                          <span className="w-10 text-[9px] text-muted-foreground">{s.level}</span>
                          <div className="h-1.5 flex-1 rounded-full bg-muted">
                            <div
                              className={`h-full rounded-full ${s.color}`}
                              style={{
                                width: `${(s.count / 34) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <p className="rotate-[-18deg] text-lg font-bold tracking-wider text-foreground/[0.04] sm:text-xl">
          Creatin Systems Mockup
        </p>
      </div>
    </div>
  );
}

export { DashboardMockup };
