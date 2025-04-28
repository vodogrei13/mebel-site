
/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/mebel-site',
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    poweredByHeader: false,
    images: {
        domains: ['localhost'],
        unoptimized: true,
    },
    api: {
        bodyParser: {
          sizeLimit: '10mb' // Увеличиваем лимит до 10 МБ
        }
    },
    // experimental: {
    //     optimizePackageImports: { 
            // *ДЛЯ ОПТИМИЗАЦИИ МОДУЛЕЙ*
    //     }
    // }
};

export default nextConfig;
