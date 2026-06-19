import { getAuthorBySlug, getReviewerBySlug } from "@/lib/content";
import { cn } from "@/lib/utils";

interface AuthorBylineProps {
  authorSlug: string;
  reviewerSlug?: string;
  className?: string;
}

export function AuthorByline({ authorSlug, reviewerSlug, className }: AuthorBylineProps) {
  const author = getAuthorBySlug(authorSlug);
  const reviewer = reviewerSlug ? getReviewerBySlug(reviewerSlug) : undefined;

  if (!author) return null;

  return (
    <div className={cn("text-sm text-slate-600", className)}>
      <p>
        <span className="font-medium text-slate-800">Written by:</span> {author.name}
        {author.title && (
          <span className="text-slate-500"> · {author.title}</span>
        )}
      </p>
      {reviewer && (
        <p className="mt-1">
          <span className="font-medium text-slate-800">Reviewed by:</span> {reviewer.name}
          {reviewer.reviewFocus && (
            <span className="text-slate-500"> · {reviewer.reviewFocus}</span>
          )}
        </p>
      )}
    </div>
  );
}
