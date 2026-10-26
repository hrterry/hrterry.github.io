import type { NextConfig } from "next";

// Static export for GitHub Pages: every route becomes /route/index.html.
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default config;
