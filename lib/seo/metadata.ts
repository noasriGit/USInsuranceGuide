import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

interface MetadataOptions {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

/** Strip a trailing " | Site Name" so layout/template logic never doubles the brand. */
function normalizeTitle(title: string): string {
  const suffix = ` | ${SITE_NAME}`;
  let normalized = title.trim();
  while (normalized.endsWith(suffix)) {
    normalized = normalized.slice(0, -suffix.length).trim();
  }
  if (normalized === SITE_NAME) return SITE_NAME;
  return `${normalized} | ${SITE_NAME}`;
}

export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  noindex = false,
}: MetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = normalizeTitle(title);

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type,
      images: [DEFAULT_OG_IMAGE],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}
