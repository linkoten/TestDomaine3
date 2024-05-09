
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.schema.io' },
      { protocol: 'https', hostname: 'cdn.swell.store' },
      { protocol: 'https', hostname: 'media.graphassets.com' },
    ],
  },
};

export default nextConfig;