import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { getPrimaryCategories, getStates } from "@/lib/content/data";
import { getCategoryCanonicalPath } from "@/lib/content/indexing";
import { buildMetadata } from "@/lib/seo/metadata";
import { LEAD_PATH } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Page Not Found",
  description: "The page you requested could not be found on US Insurance Guide.",
  path: "/404/",
  noindex: true,
});

export default function NotFound() {
  const categories = getPrimaryCategories();
  const states = getStates();

  return (
    <Container className="py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Page not found</h1>
      <p className="mt-4 max-w-xl text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">
          Return Home
        </Link>
        <Link href={LEAD_PATH} className="btn btn-secondary" data-lead-cta="not-found">
          Find Insurance Help
        </Link>
      </div>
      <div className="mt-12">
        <h2 className="text-lg font-semibold text-ink">Popular resources</h2>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={getCategoryCanonicalPath(c)}
              className="text-sm text-navy-800 hover:underline"
            >
              {c.name}
            </Link>
          ))}
          {states.map((s) => (
            <Link
              key={s.slug}
              href={`/states/${s.slug}/`}
              className="text-sm text-navy-800 hover:underline"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
