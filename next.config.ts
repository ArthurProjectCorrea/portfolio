import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // These load native/binary assets relative to their own package directory
  // at runtime (app/api/screenshot) — bundling them breaks that lookup, so
  // they must stay external instead of going through webpack/Turbopack.
  serverExternalPackages: ["@sparticuz/chromium", "puppeteer-core"],
  images: {
    localPatterns: [
      // The screenshot route is keyed by its ?url= query string — every
      // other local asset keeps the default "no query string" restriction.
      { pathname: "/api/screenshot" },
      { pathname: "**", search: "" },
    ],
  },
};

export default nextConfig;
