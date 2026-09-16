import type { NextConfig } from "next";
import path from "path";
import { getPermanentRedirects } from "./lib/content/seo-manifest";

const nextConfig: NextConfig = {
  // Keep URLs, canonicals, sitemap, and internal links on the same trailing-slash form.
  trailingSlash: true,
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return getPermanentRedirects();
  },
};

export default nextConfig;
