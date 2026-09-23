import { Prose } from "@/components/content/Prose";

interface QuickAnswerProps {
  title?: string;
  content: string;
}

export function QuickAnswer({ title = "Quick answer", content }: QuickAnswerProps) {
  return (
    <aside className="rounded-xl bg-navy-50 p-5" aria-labelledby="quick-answer-heading">
      <h2
        id="quick-answer-heading"
        className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-navy-700"
      >
        {title}
      </h2>
      <div className="mt-3 text-sm leading-relaxed text-slate-700">
        <Prose content={content} className="text-sm [&_p]:mb-2 [&_p:last-child]:mb-0" />
      </div>
    </aside>
  );
}
