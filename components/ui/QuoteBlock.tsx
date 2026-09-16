import { cn } from "@/lib/utils";

interface QuoteBlockProps {
  text: string;
  attribution?: string;
  className?: string;
}

export function QuoteBlock({ text, attribution, className }: QuoteBlockProps) {
  return (
    <blockquote className={cn("border-l-2 border-navy-700 pl-4", className)}>
      <p className="font-serif text-lg leading-relaxed text-navy-900">“{text}”</p>
      {attribution && (
        <footer className="mt-2 text-sm text-slate-600">{attribution}</footer>
      )}
    </blockquote>
  );
}
