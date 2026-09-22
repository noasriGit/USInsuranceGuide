import Link from "next/link";
import { cn } from "@/lib/utils";

interface StateGuideLink {
  href: string;
  label: string;
}

interface StateFeaturePanelProps {
  name: string;
  href: string;
  description: string;
  guides: StateGuideLink[];
  tone: "maryland" | "virginia" | "dc";
  featured?: boolean;
  wide?: boolean;
  className?: string;
}

const toneClass = {
  maryland: "tint-maryland",
  virginia: "tint-virginia",
  dc: "tint-dc",
};

const marks = { maryland: "MD", virginia: "VA", dc: "DC" };

export function StateFeaturePanel({
  name,
  href,
  description,
  guides,
  tone,
  featured = false,
  wide = false,
  className,
}: StateFeaturePanelProps) {
  return (
    <article
      className={cn(
        "surface-card relative overflow-hidden p-6 sm:p-7",
        toneClass[tone],
        wide && "lg:grid lg:grid-cols-12 lg:items-center lg:gap-10",
        className,
      )}
    >
      {!wide && (
        <div
          className="pointer-events-none absolute right-5 top-5 hidden h-14 w-14 items-center justify-center rounded-full border border-navy-800/12 text-[0.68rem] font-semibold tracking-[0.18em] text-navy-800/50 sm:flex"
          aria-hidden="true"
        >
          {marks[tone]}
        </div>
      )}
      <div className={wide ? "lg:col-span-5" : undefined}>
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-navy-700">
          {name}
        </p>
        <h3
          className={cn(
            "mt-3 font-semibold tracking-tight text-ink",
            featured || wide ? "text-3xl" : "text-2xl",
          )}
        >
          {name} insurance
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">{description}</p>
      </div>
      <div className={cn(wide ? "mt-6 lg:col-span-7 lg:mt-0" : "mt-6")}>
        <ul className={cn(wide ? "grid gap-2 sm:grid-cols-2" : "space-y-1")}>
          {guides.map((guide) => (
            <li key={guide.href}>
              <Link
                href={guide.href}
                className="flex min-h-11 items-center justify-between rounded-lg bg-white/55 px-3 text-sm font-medium text-navy-800 transition-colors hover:bg-white"
              >
                <span>{guide.label}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={href} className="link-arrow mt-6">
          Explore {name}
          <span data-arrow aria-hidden="true">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
