/** @type {import('next').NextConfig} */
const nextConfig = {
    modularizeImports: {
        '@mui/icons-material': {
            transform: '@mui/icons-material/{{member}}',
        },
    },
    images: {
        remotePatterns: [
            {
                hostname: 'i.scdn.co',
                protocol: 'https',
            }
        ]
    }
}

module.exports = nextConfig
