interface ContentPendingNoticeProps {
  topic?: string;
}

export function ContentPendingNotice({ topic }: ContentPendingNoticeProps) {
  const label = topic ? `${topic} content` : "Guide content";
  return (
    <div
      role="status"
      className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-3"
    >
      <p className="text-sm text-slate-600">
        {label} is being prepared. This section will include general educational
        information reviewed for accuracy before publication.
      </p>
    </div>
  );
}
