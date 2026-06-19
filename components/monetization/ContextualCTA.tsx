import { LicensedProfessionalCTA } from "@/components/compliance/LicensedProfessionalCTA";
import type { Partner } from "@/lib/schemas";
import { PartnerCard } from "./PartnerCard";
import { cn } from "@/lib/utils";

interface ContextualCTAProps {
  partners?: Partner[];
  className?: string;
}

export function ContextualCTA({ partners = [], className }: ContextualCTAProps) {
  if (partners.length > 0) {
    return (
      <div className={cn("my-8", className)}>
        <PartnerCard partner={partners[0]} />
      </div>
    );
  }

  return (
    <div className={cn("my-8", className)}>
      <LicensedProfessionalCTA />
    </div>
  );
}
