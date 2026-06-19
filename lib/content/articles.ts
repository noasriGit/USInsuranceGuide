import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { ArticleFrontmatterSchema, type Article, type Category } from "@/lib/schemas";

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

export function getArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const files = fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(ARTICLES_DIR, filename), "utf-8");
      const { data, content } = matter(raw);
      const frontmatter = ArticleFrontmatterSchema.parse(data);
      if (frontmatter.draft) return null;

      const stats = readingTime(content);
      return {
        slug,
        content,
        readingTime: Math.ceil(stats.minutes),
        ...frontmatter,
      } satisfies Article;
    })
    .filter((a): a is Article => a !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return getArticles().filter((a) => a.category === categorySlug);
}

/** Featured explainers plus category-tagged articles for interim shell hubs. */
export function getArticlesForCategoryHub(category: Category): Article[] {
  const featured = (category.featuredArticleSlugs ?? [])
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is Article => a !== undefined);
  const byCategory = getArticlesByCategory(category.slug);
  const seen = new Set<string>();
  const merged: Article[] = [];
  for (const article of [...featured, ...byCategory]) {
    if (seen.has(article.slug)) continue;
    seen.add(article.slug);
    merged.push(article);
  }
  return merged;
}

export function getArticlesByState(stateSlug: string): Article[] {
  return getArticles().filter((a) => a.states?.includes(stateSlug));
}

export function getRelatedArticles(article: Article, limit = 4): Article[] {
  const all = getArticles().filter((a) => a.slug !== article.slug);

  const scored = all.map((a) => {
    let score = 0;
    if (a.category === article.category) score += 3;
    if (article.states?.some((s) => a.states?.includes(s))) score += 2;
    if (article.relatedArticles?.includes(a.slug)) score += 5;
    return { article: a, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.article);
}
