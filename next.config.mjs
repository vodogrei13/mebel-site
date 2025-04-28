
/** @type {import('next').NextConfig} */
const nextConfig = {
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
