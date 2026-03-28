import { getRegion } from "@/lib/region";

export async function RegionBadge() {
  const region = await getRegion();

  return (
    <div className="fixed top-4 right-4 z-50 rounded-full bg-muted px-4 py-2 text-sm font-medium">
      Region: <span className="text-primary">{region.toUpperCase()}</span>
    </div>
  );
}
