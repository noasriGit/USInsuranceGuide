import type { Partner } from "@/lib/schemas";
import { SponsoredDisclosure } from "@/components/compliance/SponsoredDisclosure";
import { SponsoredLabel } from "./SponsoredLabel";
import { cn } from "@/lib/utils";

interface PartnerCardProps {
  partner: Partner;
  className?: string;
}

export function PartnerCard({ partner, className }: PartnerCardProps) {
  const href = partner.trackingUrl ?? partner.websiteUrl;

  return (
    <div
      className={cn(
        "rounded-lg border border-slate-200 border-l-4 border-l-navy-600 bg-slate-50 p-5",
        className,
      )}
    >
      {partner.sponsored && (
        <div className="mb-3">
          <SponsoredLabel />
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-900">{partner.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{partner.description}</p>
      {partner.licenseNotes && (
        <p className="mt-2 text-xs text-slate-500">{partner.licenseNotes}</p>
      )}
      <a
        href={href}
        target="_blank"
        rel={partner.sponsored ? "sponsored noopener noreferrer" : "noopener noreferrer"}
        className="mt-4 inline-flex items-center rounded-md bg-navy-800 px-4 py-2 text-sm font-medium text-white hover:bg-navy-900 transition-colors"
      >
        {partner.ctaText}
      </a>
      {partner.sponsored && <SponsoredDisclosure className="mt-4" />}
    </div>
  );
}
