
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: '/mebel-site',
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
