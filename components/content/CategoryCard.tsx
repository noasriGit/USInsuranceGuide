import Link from "next/link";
import type { Category } from "@/lib/schemas";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link
      href={`/${category.slug}/`}
      className={cn(
        "block rounded-lg border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md hover:border-navy-200",
        className,
      )}
    >
      <h3 className="text-lg font-semibold text-slate-900">{category.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {category.shortDescription}
      </p>
    </Link>
  );
}
