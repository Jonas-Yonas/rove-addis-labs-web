/**
 * Absolute base URL of the deployed site — used for canonical / Open Graph URLs.
 * Override with NEXT_PUBLIC_SITE_URL; otherwise Vercel's production domain;
 * otherwise localhost for dev.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
