/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack(config) {
    config.resolve.alias["next-intl/config"] = require.resolve("./i18n.tsx");
    return config;
  },
};

module.exports = nextConfig;
