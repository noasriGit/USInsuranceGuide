import { LicensedProfessionalNotice } from "@/components/compliance/LicensedProfessionalNotice";
import { LeadCTA } from "@/components/leads/LeadCTA";
import type { Partner } from "@/lib/schemas";
import type { LeadCtaVariant, LeadPageContext } from "@/lib/leads/context";
import { PartnerCard } from "./PartnerCard";
import { cn } from "@/lib/utils";

interface ContextualCTAProps {
  partners?: Partner[];
  className?: string;
  context?: LeadPageContext;
  variant?: LeadCtaVariant;
  showNotice?: boolean;
}

export function ContextualCTA({
  partners = [],
  className,
  context,
  variant = "end",
  showNotice = false,
}: ContextualCTAProps) {
  return (
    <div className={cn("my-8 space-y-6", className)}>
      {context && <LeadCTA context={context} variant={variant} />}
      {partners[0] && <PartnerCard partner={partners[0]} />}
      {showNotice && <LicensedProfessionalNotice />}
    </div>
  );
}
