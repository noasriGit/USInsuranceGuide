import type { Article } from "@/lib/schemas";
import { ArticleCard } from "./ArticleCard";
import { cn } from "@/lib/utils";

interface RelatedArticlesProps {
  articles: Article[];
  title?: string;
  className?: string;
}

export function RelatedArticles({
  articles,
  title = "Related Articles",
  className,
}: RelatedArticlesProps) {
  if (!articles.length) return null;

  return (
    <section className={cn("mt-10", className)} aria-labelledby="related-heading">
      <h2 id="related-heading" className="text-2xl font-bold text-slate-900">
        {title}
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
