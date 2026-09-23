import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  bare?: boolean;
  onDark?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  description,
  className,
  children,
  bare = false,
  onDark = false,
}: PageHeroProps) {
  return (
    <header className={cn(!bare && "border-b border-line pb-8", className)}>
      <div className="max-w-3xl">
        {eyebrow && (
          <p
            className={cn(
              "text-[0.7rem] font-semibold uppercase tracking-[0.18em]",
              onDark ? "text-white/75" : "text-navy-700",
            )}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className={cn(
            "text-[2rem] font-semibold tracking-tight sm:text-4xl lg:text-[2.65rem] lg:leading-tight",
            onDark ? "text-white" : "text-ink",
            eyebrow && "mt-3",
          )}
        >
          {title}
        </h1>
        {description && (
          <p
            className={cn(
              "mt-4 max-w-[40rem] text-lg leading-relaxed",
              onDark ? "text-slate-200" : "text-slate-600",
            )}
          >
            {description}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
