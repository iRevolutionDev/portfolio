import './globals.css'
import React from "react";
import ThemeRegistry from "@/theme/theme-registry";
import {Providers} from "@/redux/provider";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <ThemeRegistry>
            <Providers>
                {children}
            </Providers>
        </ThemeRegistry>
        </body>
        </html>
    )
}
