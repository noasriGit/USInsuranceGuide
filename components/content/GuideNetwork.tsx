import { RelatedGraph } from "@/components/content/RelatedGraph";
import type { SeoPage } from "@/lib/schemas";

export function GuideNetwork({ page }: { page: SeoPage }) {
  return <RelatedGraph page={page} />;
}
