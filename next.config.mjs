import createNextIntlPlugin from 'next-intl/plugin';
import {fileURLToPath} from "node:url";
import createJiti from "jiti";

const jiti = createJiti(fileURLToPath(import.meta.url));
const withNextIntl = createNextIntlPlugin();

if (process.env.NODE_ENV !== "test") jiti("./src/env");

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
            },
            {
                hostname: "fastly.picsum.photos",
                protocol: "https",
            }
        ]
    }
}

export default withNextIntl(nextConfig);
