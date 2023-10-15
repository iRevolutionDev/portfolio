import {PropsWithChildren} from "react";
import {Container} from "@mui/material";
import Navbar from "@/templates/navbar/navbar";
import {Metadata} from "next";
import {SEO} from "@/constants/seo";

export const metadata: Metadata = {
    metadataBase: SEO.metadataBase,
    keywords: SEO.keywords,
    openGraph: SEO.openGraph,
}

export default function Layout({children}: PropsWithChildren<{}>) {
    return (
        <>
            <Navbar>
                <Navbar.Item href="/">
                    /
                </Navbar.Item>
                <Navbar.Item href="/projects">
                    ~/projects
                </Navbar.Item>
                <Navbar.Item href="/terminal">
                    ~/terminal
                </Navbar.Item>
            </Navbar>
            <Container maxWidth="md">
                <main className="mx-auto max-w-3xl space-y-12 py-12 md:py-24">
                    {children}
                </main>
            </Container>
        </>
    );
}