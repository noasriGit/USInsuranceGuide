import { getDisclaimers } from "@/lib/content";
import { cn } from "@/lib/utils";

interface EditorialIndependenceNoteProps {
  className?: string;
}

export function EditorialIndependenceNote({ className }: EditorialIndependenceNoteProps) {
  const disclaimers = getDisclaimers();
  return (
    <p className={cn("text-sm leading-relaxed text-slate-600", className)}>
      {disclaimers.editorialIndependenceStatement}
    </p>
  );
}
