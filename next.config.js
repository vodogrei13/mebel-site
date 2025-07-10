/** @type {import('next').NextConfig} */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

module.exports = {
  output: 'export',
  basePath,
  assetPrefix: basePath + '/',
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  poweredByHeader: false,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  }
};