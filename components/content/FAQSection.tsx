import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo/schema";
import type { FAQItem } from "@/lib/schemas";
import { cn } from "@/lib/utils";

interface FAQSectionProps {
  faqs: FAQItem[];
  className?: string;
}

export function FAQSection({ faqs, className }: FAQSectionProps) {
  if (!faqs.length) return null;

  return (
    <section className={cn("mt-10", className)} aria-labelledby="faq-heading">
      <JsonLd data={faqSchema(faqs)} />
      <h2 id="faq-heading" className="text-xl font-semibold text-ink">
        Frequently Asked Questions
      </h2>
      <dl className="mt-6 grid gap-4">
        {faqs.map((faq) => (
          <div key={faq.question} className="surface-card p-5">
            <dt className="text-base font-semibold text-ink">{faq.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-slate-600">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
