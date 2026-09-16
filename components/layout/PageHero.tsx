import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  className,
  children,
}: PageHeroProps) {
  return (
    <header className={cn("border-b border-line pb-8", className)}>
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-700">
            {eyebrow}
          </p>
        )}
        <h1
          className={cn(
            "text-3xl font-semibold tracking-tight text-ink sm:text-4xl",
            eyebrow && "mt-3",
          )}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-[46rem] text-lg leading-relaxed text-slate-600">
            {description}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
