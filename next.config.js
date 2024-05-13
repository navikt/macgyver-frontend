/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    experimental: {
        serverComponentsExternalPackages: ['@navikt/next-logger', 'next-logger'],
        serverActions: true,
            optimizePackageImports: ['@navikt/ds-react', '@navikt/aksel-icons'],
    },
}

module.exports = nextConfig
