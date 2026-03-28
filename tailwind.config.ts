// Tailwind CSS v4 — primary configuration lives in src/app/globals.css via @theme.
// This file is present for tooling compatibility and plugin registration.
import type { Config } from "tailwindcss";

const config: Config = {
  // Content auto-detected by Tailwind v4
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  // Dark mode is configured via @custom-variant dark in globals.css
  darkMode: "class",
};

export default config;
