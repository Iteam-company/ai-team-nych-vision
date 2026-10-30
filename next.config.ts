import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Needed for a site-wide 404: there is one root layout per language.
    globalNotFound: true,
  },
};

export default nextConfig;
