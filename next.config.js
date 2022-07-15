const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
    prependData: `@import "variables.scss";`,
  },
  images: {
    domains: ['media.graphassets.com'],
  },
  env: {
    ALGOLIA_APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID,
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
  },
  pageExtensions: ['page.tsx', 'page.ts'],
}

module.exports = nextConfig
