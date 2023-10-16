import {Metadata} from "next";

export const SEO: Metadata = {
    metadataBase: new URL("https://revolution.software"),
    keywords: [
        "Revolution", "Revolution Software", "Software", "Engineer",
        "Developer", "Web", "Web Developer", "Web Engineer", "Software Engineer",
        "Software Developer", "Full Stack", "Full Stack Engineer", "Full Stack Developer",
        "Projects", "Portfolio", "Portfolio Projects", "Github", "Github Projects", "Open Source",
        "Next.js", "TypeScript", "Rust", "React", "Node.js", "C++", "C", "C#"
    ],
    openGraph: {
        url: "https://revolution.software",
        images: [
            {
                url: "/assets/profile.png",
                width: 512,
                height: 512,
            }
        ]
    }
}