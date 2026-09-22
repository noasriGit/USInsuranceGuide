import { cn } from "@/lib/utils";

export type CoverageVisualId =
  | "auto"
  | "home"
  | "renters"
  | "business"
  | "flood"
  | "landlord"
  | "workers"
  | "commercial"
  | "umbrella";

export function coverageVisualFromSlug(slug?: string): CoverageVisualId {
  switch (slug) {
    case "auto-insurance":
      return "auto";
    case "home-insurance":
    case "homeowners-insurance":
      return "home";
    case "renters-insurance":
      return "renters";
    case "business-insurance":
      return "business";
    case "flood-insurance":
      return "flood";
    case "landlord-insurance":
      return "landlord";
    case "workers-compensation":
    case "workers-compensation-insurance":
      return "workers";
    case "commercial-auto":
    case "commercial-auto-insurance":
      return "commercial";
    case "umbrella-insurance":
      return "umbrella";
    default:
      return "auto";
  }
}

export function coverageTintClass(id: CoverageVisualId): string {
  if (id === "home" || id === "landlord") return "tint-home";
  if (id === "renters") return "tint-renters";
  if (id === "business" || id === "workers" || id === "commercial") return "tint-business";
  if (id === "umbrella") return "tint-dc";
  return "tint-auto";
}

interface CoverageIconProps {
  name: CoverageVisualId;
  className?: string;
}

export function CoverageIcon({ name, className }: CoverageIconProps) {
  const common = {
    viewBox: "0 0 32 32",
    fill: "none",
    className: cn("h-8 w-8 text-navy-700", className),
    "aria-hidden": true as const,
  };

  if (name === "home" || name === "landlord") {
    return (
      <svg {...common}>
        <path d="M5 15.5 16 6l11 9.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 14.5V26h16V14.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 26v-7h6v7" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (name === "renters") {
    return (
      <svg {...common}>
        <path d="M7 27V9h18v18" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 14h18M7 19h18M7 24h18M12 9v18M20 9v18" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (name === "business") {
    return (
      <svg {...common}>
        <path d="M6 12h20v14H6z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 12V8h8v4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 18h20" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (name === "flood") {
    return (
      <svg {...common}>
        <path d="M6 18c2.2-2.5 4.2-2.5 6.4 0 2.2 2.5 4.2 2.5 6.4 0 2.2-2.5 4.3-2.5 6.6 0" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 24c2.2-2.5 4.2-2.5 6.4 0 2.2 2.5 4.2 2.5 6.4 0 2.2-2.5 4.3-2.5 6.6 0" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 6v7" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (name === "workers") {
    return (
      <svg {...common}>
        <circle cx="16" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 26c1.2-5 4.2-7.5 8-7.5s6.8 2.5 8 7.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (name === "commercial") {
    return (
      <svg {...common}>
        <path d="M6 20h14l4-5h3v11H6z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="11" cy="26" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="22" cy="26" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (name === "umbrella") {
    return (
      <svg {...common}>
        <path d="M6 16c0-6 4.2-10 10-10s10 4 10 10H6z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 16v9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 25c0 1.6 1.2 2.6 2.8 2.6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M5 20h17l4-6H12z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="24" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="21" cy="24" r="2.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
