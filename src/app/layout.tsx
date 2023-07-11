import '@/styles/globals.css';
import React from "react";
import {NavbarDesktop, NavbarMobile} from "@/ui/layout/Navbar";

type Props = {
    children: React.ReactNode;
}

export default function Layout({children} : Props) {
    return (
        <html>
        <head>
            <title>Revolution</title>
        </head>
        <body className="bg-dark-100">
        <NavbarMobile/>
        <div className="mx-auto max-w-4xl py-10 px-5">
            <NavbarDesktop>
                {children}
            </NavbarDesktop>
        </div>
        </body>
        </html>
    )
}