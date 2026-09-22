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
    <nav aria-label="Related insurance guides">
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-navy-700">
        Related Guides
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {related.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className="surface-card surface-card-interactive block px-4 py-4 text-sm font-medium text-navy-800"
            >
              {networkLabel(item)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
