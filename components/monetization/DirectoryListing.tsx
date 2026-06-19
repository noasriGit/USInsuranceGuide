import type { Partner } from "@/lib/schemas";
import { getDisclaimers } from "@/lib/content";
import { PartnerCard } from "./PartnerCard";
import { cn } from "@/lib/utils";

interface DirectoryListingProps {
  partners: Partner[];
  stateName?: string;
  className?: string;
}

export function DirectoryListing({ partners, stateName, className }: DirectoryListingProps) {
  const disclaimers = getDisclaimers();

  return (
    <div className={cn(className)}>
      <p className="text-sm leading-relaxed text-slate-600">{disclaimers.directoryDisclaimer}</p>

      {partners.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
          <p className="text-sm text-slate-600">
            {stateName
              ? `No insurance professional listings are available for ${stateName} yet. Check back as our directory expands.`
              : "Our insurance professional directory is expanding. Check back soon for listings in your area."}
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      )}
    </div>
  );
}
