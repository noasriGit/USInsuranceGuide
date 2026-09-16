import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(dateString));
}

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function extractMarkdownHeadings(content: string): { id: string; text: string }[] {
  return [...content.matchAll(/^##\s+(.+)$/gm)].map((match) => {
    const text = match[1]?.trim() ?? "";
    return { id: slugifyHeading(text), text };
  });
}

export function splitMarkdownForInlineCta(content: string): {
  before: string;
  after: string;
} {
  const parts = content.split(/\n(?=##\s)/);
  if (parts.length < 3) {
    const paragraphs = content.split(/\n\n+/);
    const splitAt = Math.max(1, Math.floor(paragraphs.length * 0.4));
    return {
      before: paragraphs.slice(0, splitAt).join("\n\n"),
      after: paragraphs.slice(splitAt).join("\n\n"),
    };
  }

  const splitAt = Math.max(1, Math.round(parts.length * 0.4));
  return {
    before: parts.slice(0, splitAt).join("\n"),
    after: parts.slice(splitAt).join("\n"),
  };
}
