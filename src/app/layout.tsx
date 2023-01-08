'use client';

import '@/styles/globals.css';
import React from "react";
import Navbar from "@/ui/layout/Navbar";

type Props = {
    children: React.ReactNode;
}

const RootLayout: React.FC<Props> = ({children}) => {

    return (
        <html>
        <head>
            <title>Revolution</title>
        </head>
        <body className="bg-dark-100">
        <Navbar>
            <Navbar.Mobile/>
            <div className="mx-auto max-w-4xl py-10 px-5">
                <Navbar.Desktop>
                    {children}
                </Navbar.Desktop>
            </div>
        </Navbar>
        </body>
        </html>
    )
}

export default RootLayout;