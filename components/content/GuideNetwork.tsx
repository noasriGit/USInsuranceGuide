import Link from "next/link";
import type { SeoPage } from "@/lib/schemas";
import { getGuideNetwork } from "@/lib/content/seo-manifest";

function networkLabel(page: SeoPage): string {
  return page.title;
}

export function GuideNetwork({ page }: { page: SeoPage }) {
  const related = getGuideNetwork(page);
  if (related.length === 0) return null;

  return (
    <nav
      aria-label="Related insurance guides"
      className="rounded-lg border border-slate-200 bg-slate-50 p-5"
    >
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-700">
        Related Guides
      </h2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {related.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className="text-sm text-navy-700 underline-offset-2 hover:text-navy-900 hover:underline"
            >
              {networkLabel(item)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
