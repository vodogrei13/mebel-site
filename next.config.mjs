
/** @type {import('next').NextConfig} */

// Проверяем окружение: если это продакшен на GitHub, используем basePath
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath + '/',
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  poweredByHeader: false,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
    // experimental: {
    //     optimizePackageImports: { 
            // *ДЛЯ ОПТИМИЗАЦИИ МОДУЛЕЙ*
    //     }
    // }
};

export default nextConfig;
