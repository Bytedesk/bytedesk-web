/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@bytedesk/web': require('path').resolve(__dirname, '../../src')
    };
    return config;
  }
};

module.exports = nextConfig; 