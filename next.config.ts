import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL('https://6t1huswj455z8hvl.public.blob.vercel-storage.com/**')],
    minimumCacheTTL: 2592000, // 30 days
  },
};

export default nextConfig;
