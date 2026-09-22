import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
  bare?: boolean;
}

export function PageHero({
  eyebrow,
  title,
  description,
  className,
  children,
  bare = false,
}: PageHeroProps) {
  return (
    <header className={cn(!bare && "border-b border-line pb-8", className)}>
      <div className="max-w-3xl">
        {eyebrow && (
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-navy-700">
            {eyebrow}
          </p>
        )}
        <h1
          className={cn(
            "text-[2rem] font-semibold tracking-tight text-ink sm:text-4xl lg:text-[2.65rem] lg:leading-tight",
            eyebrow && "mt-3",
          )}
        >
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-[40rem] text-lg leading-relaxed text-slate-600">
            {description}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
