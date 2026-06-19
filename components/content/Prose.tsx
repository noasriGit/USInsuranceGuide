import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { isExternalHref, newTabAriaLabel } from "@/lib/a11y/external-link";
import { cn } from "@/lib/utils";

interface ProseProps {
  content: string;
  className?: string;
}

function getLinkText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) {
    return children.map((child) => (typeof child === "string" ? child : "")).join("");
  }
  return "";
}

const markdownComponents: Components = {
  img({ src, alt }) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- markdown images are author-controlled
      <img
        src={typeof src === "string" ? src : undefined}
        alt={alt ?? ""}
        loading="lazy"
        decoding="async"
      />
    );
  },
  a({ href, children, ...props }) {
    const url = typeof href === "string" ? href : undefined;
    if (url && isExternalHref(url)) {
      const linkText = getLinkText(children) || url;
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={newTabAriaLabel(linkText)}
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <a href={url} {...props}>
        {children}
      </a>
    );
  },
  table({ children }) {
    return (
      <div className="my-6 overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">{children}</table>
      </div>
    );
  },
  thead({ children }) {
    return <thead className="border-b border-slate-300 bg-slate-50">{children}</thead>;
  },
  th({ children }) {
    return (
      <th scope="col" className="px-4 py-2 font-semibold text-slate-900">
        {children}
      </th>
    );
  },
  td({ children }) {
    return <td className="border-b border-slate-200 px-4 py-2 text-slate-700">{children}</td>;
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
