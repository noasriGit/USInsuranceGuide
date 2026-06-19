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
      <h2 id="faq-heading" className="text-2xl font-bold text-slate-900">
        Frequently Asked Questions
      </h2>
      <dl className="mt-6 space-y-6">
        {faqs.map((faq) => (
          <div key={faq.question} className="border-b border-slate-200 pb-6 last:border-0">
            <dt className="text-base font-semibold text-slate-900">{faq.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-slate-600">{faq.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
