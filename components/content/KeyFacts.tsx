interface KeyFact {
  label: string;
  value: string;
}

interface KeyFactsProps {
  title?: string;
  facts: KeyFact[];
}

export function KeyFacts({ title = "Key facts", facts }: KeyFactsProps) {
  if (facts.length === 0) return null;

  return (
    <section className="rounded-xl bg-sand/80 p-5" aria-labelledby="key-facts-heading">
      <h2
        id="key-facts-heading"
        className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-navy-700"
      >
        {title}
      </h2>
      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
              {fact.label}
            </dt>
            <dd className="mt-1 text-sm leading-relaxed text-ink">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
