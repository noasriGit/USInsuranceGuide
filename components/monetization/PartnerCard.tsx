import type { Partner } from "@/lib/schemas";
import { newTabAriaLabel } from "@/lib/a11y/external-link";
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
        "surface-card border-l-[3px] border-l-navy-700 p-5",
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
        aria-label={newTabAriaLabel(`${partner.ctaText} — ${partner.name}`)}
        className="btn btn-primary mt-4"
      >
        {partner.ctaText}
      </a>
      {partner.sponsored && <SponsoredDisclosure className="mt-4" />}
    </div>
  );
}
