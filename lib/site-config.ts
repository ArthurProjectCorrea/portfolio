// Site-wide constants used to build absolute URLs (canonical addresses,
// language alternates and social preview cards). The public origin is an
// environment value so the same build works locally and on the deployed host.

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Fallback social preview image — no project ships an asset of its own. */
export const defaultOgImage = "/photo.svg";
