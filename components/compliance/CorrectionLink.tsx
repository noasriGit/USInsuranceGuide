import Link from "next/link";
import { cn } from "@/lib/utils";

interface CorrectionLinkProps {
  className?: string;
}

export function CorrectionLink({ className }: CorrectionLinkProps) {
  return (
    <Link
      href="/corrections/"
      className={cn("text-sm text-navy-700 underline hover:text-navy-900", className)}
    >
      Request a correction or content update
    </Link>
  );
}
