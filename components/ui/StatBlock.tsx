import { cn } from "@/lib/utils";

interface StatBlockProps {
  value: string;
  label: string;
  className?: string;
}

export function StatBlock({ value, label, className }: StatBlockProps) {
  return (
    <div className={cn("surface-card p-6", className)}>
      <p className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{value}</p>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600">{label}</p>
    </div>
  );
}
