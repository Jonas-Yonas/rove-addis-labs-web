import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      // Cover-image uploads allow files up to 5 MB; the extra space covers
      // multipart form-data boundaries and the other project fields.
      bodySizeLimit: "6mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "apobenpjagkfprzfgtjj.supabase.co",
        // pathname: "/storage/v1/object/public/rove-labs-project-covers/**",
      },
    ],
  },
};

export default nextConfig;
