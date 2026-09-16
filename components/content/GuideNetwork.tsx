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
    <nav aria-label="Related insurance guides" className="border-t border-line pt-6">
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
        Related Guides
      </h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {related.map((item) => (
          <li key={item.path}>
            <Link
              href={item.path}
              className="text-sm text-navy-800 underline-offset-2 hover:underline"
            >
              {networkLabel(item)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
