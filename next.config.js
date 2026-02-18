/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports if needed
  // output: 'export',
  
  // Image optimization
  images: {
    domains: ['cdn.sanity.io'],
    unoptimized: false,
  },
  
  // Strict mode for better development experience
  reactStrictMode: true,
  
  // Disable powered by header
  poweredByHeader: false,
};

module.exports = nextConfig;
