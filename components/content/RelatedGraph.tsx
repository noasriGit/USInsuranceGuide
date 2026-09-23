import Link from "next/link";
import { getGuideGraphGroups } from "@/lib/content/guide-graph";
import type { SeoPage } from "@/lib/schemas";

export function RelatedGraph({ page }: { page: SeoPage }) {
  const groups = getGuideGraphGroups(page);
  if (groups.length === 0) return null;

  return (
    <nav aria-label="Related insurance guides" className="space-y-8">
      {groups.map((group) => (
        <section key={group.id} aria-labelledby={`${group.id}-heading`}>
          <h2
            id={`${group.id}-heading`}
            className="text-sm font-semibold uppercase tracking-[0.16em] text-navy-700"
          >
            {group.title}
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {group.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="surface-card surface-card-interactive block px-4 py-4 text-sm font-medium text-navy-800"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </nav>
  );
}
