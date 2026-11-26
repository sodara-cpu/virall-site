import type { NextConfig } from "next";

// Site statique (GitHub Pages). BASE_PATH sert uniquement aux aperçus hébergés dans un sous-dossier.
const basePath = process.env.BASE_PATH || "";

const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: { inlineCss: true },
};

export default config;
