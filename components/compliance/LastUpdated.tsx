import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface LastUpdatedProps {
  date: string;
  className?: string;
}

export function LastUpdated({ date, className }: LastUpdatedProps) {
  return (
    <time
      dateTime={date}
      className={cn("text-sm text-slate-500", className)}
    >
      Last updated: {formatDate(date)}
    </time>
  );
}
