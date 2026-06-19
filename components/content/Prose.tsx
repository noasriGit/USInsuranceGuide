import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface ProseProps {
  content: string;
  className?: string;
}

export function Prose({ content, className }: ProseProps) {
  return (
    <div className={cn("prose prose-slate max-w-none", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
