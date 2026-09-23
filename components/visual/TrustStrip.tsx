import { MapPinned, Landmark, CalendarCheck, FileSearch } from "lucide-react";

const items = [
  {
    icon: MapPinned,
    title: "MD · VA · D.C.",
    body: "Regional focus",
  },
  {
    icon: Landmark,
    title: "Official sources",
    body: "Regulator-backed research",
  },
  {
    icon: CalendarCheck,
    title: "Reviewed guides",
    body: "Visible review dates",
  },
  {
    icon: FileSearch,
    title: "Public records",
    body: "Clearly attributed",
  },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Editorial standards"
      className="surface-white border-b border-line border-t-2 border-t-brand-red/70"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-line md:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-3 bg-paper px-4 py-5 sm:px-6">
            <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-navy-600" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              <p className="mt-1 text-sm text-slate-600">{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
