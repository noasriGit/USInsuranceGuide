import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-700">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "text-2xl font-semibold tracking-tight text-ink sm:text-[1.75rem]",
          eyebrow && "mt-2",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-slate-600">{description}</p>
      )}
    </div>
  );
}
