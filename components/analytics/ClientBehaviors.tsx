"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackLeadEvent } from "@/lib/analytics/events";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export function ClientBehaviors() {
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) utm[key] = value;
    }
    if (Object.keys(utm).length > 0) {
      window.sessionStorage.setItem("usig_utm", JSON.stringify(utm));
    }
    if (document.referrer) {
      window.sessionStorage.setItem("usig_referrer", document.referrer);
    }

    function onClick(event: MouseEvent) {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-lead-cta]");
      if (!target) return;
      trackLeadEvent("lead_cta_click", {
        cta_variant: target.dataset.leadCta,
        coverage_type: target.dataset.coverage,
        state: target.dataset.state,
        page_type: target.dataset.pageType,
        source_path: window.location.pathname,
      });
    }

    document.addEventListener("click", onClick);

    const seen = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || seen.has(entry.target)) continue;
          seen.add(entry.target);
          const target = entry.target as HTMLElement;
          trackLeadEvent("lead_cta_view", {
            cta_variant: target.dataset.leadCta,
            coverage_type: target.dataset.coverage,
            state: target.dataset.state,
            page_type: target.dataset.pageType,
            source_path: window.location.pathname,
          });
        }
      },
      { threshold: 0.6 },
    );

    document.querySelectorAll("[data-lead-cta]").forEach((node) => observer.observe(node));

    return () => {
      document.removeEventListener("click", onClick);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
