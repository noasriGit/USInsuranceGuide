import Link from "next/link";
import type { Article } from "@/lib/schemas";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  className?: string;
}

export function ArticleCard({ article, className }: ArticleCardProps) {
  return (
    <article
      className={cn(
        "group rounded-lg border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md",
        className,
      )}
    >
      <Link href={`/blog/${article.slug}/`}>
        <h3 className="text-lg font-semibold text-slate-900 group-hover:text-navy-800">
          {article.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">
          {article.excerpt}
        </p>
        <p className="mt-3 text-xs text-slate-500">
          {formatDate(article.updatedAt)} · {article.readingTime} min read
        </p>
      </Link>
    </article>
  );
}
