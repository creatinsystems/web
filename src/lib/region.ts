import { headers } from "next/headers";

export type Region = "global" | "id";

const ORIGIN_BY_REGION: Record<Region, string> = {
  global: "https://www.creatinsystems.com",
  id: "https://www.creatin.id",
};

export const HREFLANG_ALTERNATES: Record<string, string> = {
  en: ORIGIN_BY_REGION.global,
  "en-ID": ORIGIN_BY_REGION.id,
  "x-default": ORIGIN_BY_REGION.global,
};

export async function getRegion(): Promise<Region> {
  const headerStore = await headers();
  const region = headerStore.get("x-creatin-region");
  return region === "id" ? "id" : "global";
}

export function getSiteOrigin(region: Region): string {
  return ORIGIN_BY_REGION[region];
}
