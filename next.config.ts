import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // Lets the dev server be reached through a Cloudflare quick tunnel for
  // remote preview — dev-only, no effect on the production build.
  allowedDevOrigins: ["*.trycloudflare.com"],
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
