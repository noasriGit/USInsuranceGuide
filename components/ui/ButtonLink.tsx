import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "onDark" | "onDarkSecondary";

const variants: Record<ButtonVariant, string> = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  onDark: "btn btn-on-dark",
  onDarkSecondary: "btn btn-on-dark-secondary",
};

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  dataLeadCta?: string;
  dataCoverage?: string;
  dataState?: string;
  dataPageType?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  dataLeadCta,
  dataCoverage,
  dataState,
  dataPageType,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(variants[variant], className)}
      data-lead-cta={dataLeadCta}
      data-coverage={dataCoverage}
      data-state={dataState}
      data-page-type={dataPageType}
    >
      {children}
    </Link>
  );
}
