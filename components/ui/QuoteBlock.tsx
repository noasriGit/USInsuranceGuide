import { cn } from "@/lib/utils";

interface QuoteBlockProps {
  text: string;
  attribution?: string;
  className?: string;
}

export function QuoteBlock({ text, attribution, className }: QuoteBlockProps) {
  return (
    <blockquote className={cn("rounded-r-xl border-l-[3px] border-navy-600 bg-sand px-5 py-4", className)}>
      <p className="font-serif text-lg leading-relaxed text-navy-900">“{text}”</p>
      {attribution && <footer className="mt-2 text-sm text-slate-600">{attribution}</footer>}
    </blockquote>
  );
}
