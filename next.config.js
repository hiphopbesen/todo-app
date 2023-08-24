/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['pocketbase.jandj-media.de', "127.0.0.1", "api.campware.io"]
    },
    typescript: {
        ignoreBuildErrors: true,
     },
}

module.exports = nextConfig

