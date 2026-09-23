import Image from "next/image";
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
  bannerSrc?: string;
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
  bannerSrc,
  featured = false,
  wide = false,
  className,
}: StateFeaturePanelProps) {
  return (
    <article
      className={cn(
        "surface-card relative overflow-hidden",
        !bannerSrc && toneClass[tone],
        className,
      )}
    >
      {bannerSrc && (
        <div className={cn("relative w-full", wide ? "h-44 sm:h-52" : "h-36 sm:h-40")}>
          <Image
            src={bannerSrc}
            alt=""
            fill
            sizes={wide ? "100vw" : "(max-width: 1024px) 100vw, 50vw"}
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-[linear-gradient(180deg,rgb(7_31_58_/_0.08)_0%,rgb(7_31_58_/_0.42)_100%)]"
            aria-hidden="true"
          />
        </div>
      )}
      <div
        className={cn(
          "p-6 sm:p-7",
          bannerSrc && toneClass[tone],
          wide && "lg:grid lg:grid-cols-12 lg:items-center lg:gap-10",
        )}
      >
        {!wide && !bannerSrc && (
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
          <p className={cn("mt-3 text-sm leading-relaxed text-slate-600", wide ? "max-w-xl" : "max-w-md")}>
            {description}
          </p>
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
      </div>
    </article>
  );
}
