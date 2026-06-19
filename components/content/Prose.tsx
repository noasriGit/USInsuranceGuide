import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { cn } from "@/lib/utils";

interface ProseProps {
  content: string;
  className?: string;
}

const markdownComponents: Components = {
  img({ src, alt }) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- markdown images are author-controlled
      <img
        src={typeof src === "string" ? src : undefined}
        alt={alt ?? ""}
        loading="lazy"
      />
    );
  },
};

export function Prose({ content, className }: ProseProps) {
  return (
    <div className={cn("prose prose-slate max-w-none", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
