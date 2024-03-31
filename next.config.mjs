/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'pbs.twimg.com',
          },
          {
            protocol: 'https',
            hostname: 'upload.wikimedia.org',
          },
          {
            protocol :'https',
            hostname : 'geekflare.com',
          }
        ],
      },
};

export default nextConfig;
