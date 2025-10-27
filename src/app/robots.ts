import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/"],
                disallow: ["/dashboard/", "/api/"],
            },
        ],
        sitemap: "https://revolution.software/sitemap.xml",
        host: "https://revolution.software",
    };
}
