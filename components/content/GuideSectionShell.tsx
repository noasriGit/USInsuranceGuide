import { ContentPendingNotice } from "./ContentPendingNotice";

interface GuideSectionShellProps {
  title: string;
  pending?: boolean;
  children?: React.ReactNode;
}

export function GuideSectionShell({
  title,
  pending = true,
  children,
}: GuideSectionShellProps) {
  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
      <div className="mt-4">
        {pending && !children ? <ContentPendingNotice topic={title} /> : children}
      </div>
    </section>
  );
}

/** Standard section headings for state+category guide pages (Phase 3 fills copy). */
export const STATE_CATEGORY_GUIDE_SECTIONS = [
  "Overview",
  "Coverage Options to Consider",
  "State Requirements & Regulations",
  "Factors That May Affect Your Premium",
  "Frequently Asked Questions",
  "Sources & References",
] as const;

/** Standard section headings for local city guide pages (Phase 3 fills copy). */
export const LOCAL_GUIDE_SECTIONS = [
  "Local Insurance Overview",
  "Coverage Considerations",
  "Auto Insurance Considerations",
  "Home & Renters Insurance Considerations",
  "Business Insurance Considerations",
  "Frequently Asked Questions",
  "Sources & References",
] as const;

/** Standard section headings for category hub pages awaiting full content. */
export const CATEGORY_HUB_SECTIONS = [
  "What This Guide Covers",
  "Coverage Options to Consider",
  "Explore by State",
  "Related Topics",
  "Frequently Asked Questions",
] as const;
