
/** @type {import('next').NextConfig} */

// Проверяем окружение: если это продакшен на GitHub, используем basePath
const isGithubActions = process.env.GITHUB_ACTIONS || false;

const nextConfig = {
  output: 'export',
  basePath: isGithubActions ? '/mebel-site' : '',
  assetPrefix: isGithubActions ? '/mebel-site/' : '',
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
