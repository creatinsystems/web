import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import { MotionProvider } from "@/components/layout/motion-provider";
import { RegionBadge } from "@/components/layout/region-badge";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const satoshi = localFont({
  src: [
    {
      path: "./fonts/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "./fonts/Satoshi-VariableItalic.woff2",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://creatinsystems.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Creatin Systems — High-Velocity Cloud Engineering",
    template: "%s | Creatin Systems",
  },
  description:
    "Cloud-native infrastructure and consumer-grade UI for modern product teams. Get a free technical audit of your system.",
  keywords: [
    "cloud engineering",
    "cloud-native",
    "infrastructure",
    "DevOps",
    "Kubernetes",
    "UI/UX",
    "software consultancy",
  ],
  authors: [{ name: "Creatin Systems" }],
  creator: "Creatin Systems",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Creatin Systems",
    title: "Creatin Systems — High-Velocity Cloud Engineering",
    description:
      "Cloud-native infrastructure and consumer-grade UI for modern product teams. Get a free technical audit.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creatin Systems — High-Velocity Cloud Engineering",
    description: "Cloud-native infrastructure and consumer-grade UI for modern product teams.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satoshi.variable} ${geistMono.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col">
        <MotionProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground focus:outline-none"
          >
            Skip to main content
          </a>
          {process.env.NODE_ENV === "development" && <RegionBadge />}
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
