import { cn } from "@/lib/utils";

export type SectionTone = "navy" | "cta" | "blue" | "sand" | "sage" | "white" | "paper";

const tones: Record<SectionTone, string> = {
  navy: "surface-navy",
  cta: "surface-cta",
  blue: "surface-blue",
  sand: "surface-sand",
  sage: "surface-sage",
  white: "surface-white",
  paper: "surface-paper",
};

interface SectionSurfaceProps {
  tone?: SectionTone;
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "aside";
  labelledBy?: string;
}

export function SectionSurface({
  tone = "paper",
  children,
  className,
  as: Tag = "section",
  labelledBy,
}: SectionSurfaceProps) {
  return (
    <Tag className={cn(tones[tone], className)} aria-labelledby={labelledBy}>
      {children}
    </Tag>
  );
}
