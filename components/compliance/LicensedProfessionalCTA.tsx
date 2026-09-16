import { LicensedProfessionalNotice } from "./LicensedProfessionalNotice";

interface LicensedProfessionalCTAProps {
  className?: string;
}

/** Compatibility wrapper. Educational notice is separate from lead conversion CTAs. */
export function LicensedProfessionalCTA({ className }: LicensedProfessionalCTAProps) {
  return <LicensedProfessionalNotice className={className} />;
}
