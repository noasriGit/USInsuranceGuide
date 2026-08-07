import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Keep URLs, canonicals, sitemap, and internal links on the same trailing-slash form.
  trailingSlash: true,
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
