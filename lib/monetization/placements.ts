import { getPartners, getPlacements } from "@/lib/content/data";
import type { Partner, PlacementSlot } from "@/lib/schemas";

interface ResolveOptions {
  slot: PlacementSlot;
  stateSlug?: string;
  categorySlug?: string;
}

export function resolvePlacements({
  slot,
  stateSlug,
  categorySlug,
}: ResolveOptions): Partner[] {
  const placements = getPlacements().filter(
    (p) => p.active && p.slot === slot,
  );
  const partners = getPartners().filter((p) => p.active);

  return placements
    .filter((placement) => {
      if (placement.states?.length && stateSlug) {
        return placement.states.includes(stateSlug);
      }
      if (placement.categories?.length && categorySlug) {
        return placement.categories.includes(categorySlug);
      }
      return !placement.states?.length && !placement.categories?.length;
    })
    .sort((a, b) => a.priority - b.priority)
    .map((placement) => partners.find((p) => p.id === placement.partnerId))
    .filter((p): p is Partner => p !== undefined);
}

export function getFeaturedPartners(stateSlug?: string): Partner[] {
  return getPartners()
    .filter(
      (p) =>
        p.active &&
        p.featured &&
        (!stateSlug || p.serviceAreas.includes(stateSlug)),
    )
    .sort((a, b) => a.displayPriority - b.displayPriority);
}
