/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    webpack: (config) => {
        // Ignore optional peer dependencies from @wagmi/connectors
        config.externals.push('pino-pretty', 'lokijs', 'encoding')
        config.resolve.fallback = { fs: false, net: false, tls: false }
        return config
    },
}

module.exports = nextConfig
