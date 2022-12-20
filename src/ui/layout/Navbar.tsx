'use client';

import React, {useState} from "react";
import {Cross as Hamburger} from 'hamburger-react';
import Link from "next/link";

const Mobile: React.FC = () => {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className="sticky top-0 z-20 h-32 overflow-hidden transition-all sm:hidden">
            <div className="mx-5 mt-10 relative transition-all bg-ctp-surface0 rounded-lg bg-dark-50 backdrop-blur-xl opacity-40">
                <div className="flex justify-between space-x-2 pr-5 transition-colors">
                    <button className="relative z-50 block px-2 text-neutral-500 transition-all focus:ring">
                        <Hamburger onToggle={toggled => setOpen(toggled)} />
                    </button>
                </div>
            </div>
        </div>
    )
}

type DesktopProps = {
    children: React.ReactNode;
}

const Desktop: React.FC<DesktopProps> = ({ children }) => {
    return (
        <>
            <div className="hidden items-center space-x-2 sm:flex sm:mb-8">
                <nav className="flex space-x-4">
                    <ul className="flex space-x-4">
                        <li className="shrink-0">
                            <Link href="/" className="block py-3 text-small hover:bg-dark-50 no-underline sm:hover:bg-ctp-text/20 rounded-md sm:inline-block sm:px-5 sm:hover:bg-ctp-text/20 sm:rounded-full">/</Link>
                        </li>
                        <li className="shrink-0">
                            <Link href="/about" className="block py-3 text-small hover:bg-dark-50 no-underline sm:hover:bg-ctp-text/20 rounded-md sm:inline-block sm:px-5 sm:hover:bg-ctp-text/20 sm:rounded-full">~/about</Link>
                        </li>
                        <li className="shrink-0">
                            <Link href="/blog" className="block py-3 text-small hover:bg-dark-50 no-underline sm:hover:bg-ctp-text/20 rounded-md sm:inline-block sm:px-5 sm:hover:bg-ctp-text/20 sm:rounded-full">~/blog</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            {children}
        </>
    )
}

type NavbarDefines = {
    Mobile: typeof Mobile;
    Desktop: typeof Desktop;
}

type NavbarProps = {
    children: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> & NavbarDefines = ({ children }) => {
    return (
        <>
            {children}
        </>
    )
}

Navbar.Mobile = Mobile;
Navbar.Desktop = Desktop;

export default Navbar;