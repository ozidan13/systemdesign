/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['cdnjs.cloudflare.com'],
        formats: ['image/avif', 'image/webp'],
    },
    poweredByHeader: false,
};

module.exports = nextConfig;
