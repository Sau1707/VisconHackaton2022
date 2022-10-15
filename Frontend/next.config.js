/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    async rewrites() {
        return [
            {
                source: '/asvz_api/:path*',
                destination: 'https://www.asvz.ch/asvz_api/:path*',
            },
        ]
    },
}

module.exports = nextConfig
