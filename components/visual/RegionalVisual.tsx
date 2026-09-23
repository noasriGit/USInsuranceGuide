import { cn } from "@/lib/utils";

interface RegionalVisualProps {
  className?: string;
  variant?: "hero" | "panel" | "footer";
}

const nodes = [
  { id: "md", label: "Maryland", coverages: "Auto · Home · Renters · Business" },
  { id: "va", label: "Virginia", coverages: "Auto · Home · Renters · Business" },
  { id: "dc", label: "Washington, D.C.", coverages: "Auto · Home · Renters · Business" },
];

export function RegionalVisual({ className, variant = "hero" }: RegionalVisualProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[14px]",
        variant === "hero" && "min-h-[22rem] border border-white/15 bg-white/8",
        variant === "panel" && "min-h-[16rem] border border-white/12 bg-white/6",
        variant === "footer" && "min-h-[8rem] opacity-70",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 260 168"
        className="pointer-events-none absolute inset-0 h-full w-full text-white"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="dmv-grid" width="18" height="18" patternUnits="userSpaceOnUse">
            <path d="M 18 0 L 0 0 0 18" fill="none" stroke="currentColor" strokeOpacity="0.1" />
          </pattern>
        </defs>
        <rect width="260" height="168" fill="url(#dmv-grid)" />
        <path
          d="M168 28 C 186 52, 198 78, 214 96 C 226 112, 236 128, 248 142"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeOpacity="0.45"
        />
        <circle cx="168" cy="28" r="4" fill="#FCFEFE" fillOpacity="0.9" />
        <circle cx="214" cy="96" r="4" fill="#FCFEFE" fillOpacity="0.9" />
        <circle cx="248" cy="142" r="4" fill="#FCFEFE" fillOpacity="0.9" />
      </svg>
      <div className="relative z-10 flex h-full flex-col justify-center gap-3 p-5 sm:p-6">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="max-w-[17rem] rounded-xl border border-white/18 bg-[rgb(8_47_91_/_0.42)] px-4 py-3 backdrop-blur-[2px]"
          >
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/85">
              {node.label}
            </p>
            <p className="mt-1 text-xs text-white/75">{node.coverages}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
