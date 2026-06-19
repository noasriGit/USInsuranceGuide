import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { PageHero } from "@/components/layout/PageHero";
import { ArticleCard } from "@/components/content/ArticleCard";
import { buildMetadata } from "@/lib/seo/metadata";
import { getArticles } from "@/lib/content";

export const metadata = buildMetadata({
  title: "Insurance Guides & Articles",
  description:
    "Educational insurance guides and articles on auto, home, renters, business, and life insurance topics.",
  path: "/blog/",
});

export default function BlogIndexPage() {
  const articles = getArticles();

  return (
    <Container className="py-8">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <PageHero
        title="Insurance Guides & Articles"
        description="Educational guides on coverage options, state requirements, and practical insurance topics."
      />
      <div className="py-10">
        {articles.length === 0 ? (
          <p className="text-slate-600">No articles published yet. Check back soon.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
