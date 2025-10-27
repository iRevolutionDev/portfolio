import type { MetadataRoute } from "next";
import { env } from "@/env";
import { locales } from "@/i18n/i18n.config";

const baseUrl = "https://revolution.software";

async function fetchBlogPosts() {
    try {
        const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/v1/posts/list`, {
            cache: "no-store",
        });

        if (!response.ok) {
            console.error("Failed to fetch blog posts for sitemap");
            return [];
        }

        const posts = await response.json();
        return posts as Array<{ id: string; updated_at?: string }>;
    } catch (error) {
        console.error("Error fetching blog posts for sitemap:", error);
        return [];
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await fetchBlogPosts();

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1.0,
            alternates: {
                languages: {
                    en: `${baseUrl}`,
                    "pt-br": `${baseUrl}`,
                },
            },
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
            alternates: {
                languages: {
                    en: `${baseUrl}/blog`,
                    "pt-br": `${baseUrl}/blog`,
                },
            },
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
            alternates: {
                languages: {
                    en: `${baseUrl}/projects`,
                    "pt-br": `${baseUrl}/projects`,
                },
            },
        },
        {
            url: `${baseUrl}/terminal`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.5,
            alternates: {
                languages: {
                    en: `${baseUrl}/terminal`,
                    "pt-br": `${baseUrl}/terminal`,
                },
            },
        },
    ];

    const blogPostRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
        alternates: {
            languages: locales.reduce((acc, locale) => {
                acc[locale] = `${baseUrl}/${locale === "en" ? "" : `${locale}/`}blog/${post.id}`;
                return acc;
            }, {} as Record<string, string>),
        },
    }));

    return [...staticRoutes, ...blogPostRoutes];
}
