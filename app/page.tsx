import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { CategoryCard } from "@/components/content/CategoryCard";
import { StateCard } from "@/components/content/StateCard";
import { ArticleCard } from "@/components/content/ArticleCard";
import { LicensedProfessionalCTA } from "@/components/compliance/LicensedProfessionalCTA";
import { AdSlot } from "@/components/monetization/AdSlot";
import { buildMetadata } from "@/lib/seo/metadata";
import {
  getCategories,
  getStates,
  getArticles,
} from "@/lib/content";
import { SITE_NAME, SITE_TAGLINE, SITE_DESCRIPTION } from "@/lib/constants";

export const metadata = buildMetadata({
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function HomePage() {
  const categories = getCategories(true);
  const states = getStates();
  const articles = getArticles().slice(0, 4);

  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-navy-700">
              Educational Insurance Resource
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              {SITE_NAME}
            </h1>
            <p className="mt-5 text-xl leading-relaxed text-slate-600">
              {SITE_TAGLINE}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/states/"
                className="rounded-md bg-navy-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-900 transition-colors"
              >
                Browse State Guides
              </Link>
              <Link
                href="/blog/"
                className="rounded-md border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Read Our Guides
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <h2 className="text-2xl font-bold text-slate-900">Insurance Categories</h2>
        <p className="mt-2 text-slate-600">
          Educational guides on coverage options to consider.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </Container>

      <section className="border-y border-slate-200 bg-slate-50">
        <Container className="py-14">
          <h2 className="text-2xl font-bold text-slate-900">State Guides</h2>
          <p className="mt-2 text-slate-600">
            State-specific insurance resources for Virginia, Maryland, and Washington, D.C.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {states.map((state) => (
              <StateCard key={state.slug} state={state} />
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-14">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Latest Guides</h2>
            <p className="mt-2 text-slate-600">Practical insurance education for everyday decisions.</p>
          </div>
          <Link href="/blog/" className="hidden text-sm font-medium text-navy-700 hover:text-navy-900 sm:block">
            View all →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </Container>

      <Container className="pb-14">
        <LicensedProfessionalCTA />
        <AdSlot slot="homepage-display" className="mt-8" />
      </Container>
    </>
  );
}
