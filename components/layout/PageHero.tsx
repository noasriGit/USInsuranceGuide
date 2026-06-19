import { cn } from "@/lib/utils";

interface PageHeroProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHero({ title, description, className, children }: PageHeroProps) {
  return (
    <header className={cn("border-b border-slate-200 bg-slate-50 py-10 sm:py-14", className)}>
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            {description}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
