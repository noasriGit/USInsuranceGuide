import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { SITE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onDark?: boolean;
}

export function Breadcrumbs({ items, onDark = false }: BreadcrumbsProps) {
  const schemaItems = items.map((item) => ({
    name: item.label,
    url: item.href ? `${SITE_URL}${item.href}` : SITE_URL,
  }));

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <JsonLd data={breadcrumbSchema(schemaItems)} />
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1 text-sm",
          onDark ? "text-slate-300" : "text-slate-600",
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight
                  className={cn(
                    "h-3.5 w-3.5 shrink-0",
                    onDark ? "text-slate-400" : "text-slate-400",
                  )}
                  aria-hidden
                />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "underline-offset-2 hover:underline transition-colors",
                    onDark ? "hover:text-white" : "hover:text-navy-700",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? (onDark ? "font-medium text-white" : "font-medium text-slate-900") : ""}
                  {...(isLast ? { "aria-current": "page" as const } : {})}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
