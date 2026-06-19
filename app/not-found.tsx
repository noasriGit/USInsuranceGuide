import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { getCategories, getStates } from "@/lib/content/data";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Page Not Found",
  description: "The page you requested could not be found on US Insurance Guide.",
  path: "/404/",
  noindex: true,
});

export default function NotFound() {
  const categories = getCategories(true).slice(0, 5);
  const states = getStates();

  return (
    <Container className="py-20 text-center">
      <h1 className="text-4xl font-bold text-slate-900">Page Not Found</h1>
      <p className="mt-4 text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-navy-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-navy-900"
      >
        Return Home
      </Link>
      <div className="mt-12 text-left">
        <h2 className="text-lg font-semibold text-slate-900">Popular Resources</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}/`}
              className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              {c.name}
            </Link>
          ))}
          {states.map((s) => (
            <Link
              key={s.slug}
              href={`/states/${s.slug}/`}
              className="rounded-md border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
}
