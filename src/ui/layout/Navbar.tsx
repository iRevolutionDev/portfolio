'use client';

import React, {useEffect, useState} from "react";
import {Squash as Hamburger} from 'hamburger-react';
import {SiSpotify} from "react-icons/all";
import Link from "next/link";

const Mobile: React.FC = () => {
    const [isOpen, setOpen] = useState(false);
    const [onTop, setOnTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setOnTop(window.scrollY > 0);
        }

        window.addEventListener('scroll', handleScroll, {passive: true});

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {isOpen ? (<div className="fixed inset-0 z-10 space-y-2 py-24 px-8 sm:hidden bg-dark-100">
                <h1 className="text-2xl font-bold text-white">Pages</h1>
                <ul className="grid grid-cols-1 gap-2">
                    <li className="shrink-0">
                        <Link href="/" className="block py-3 font-mono text-lg hover:text-ctp-text no-underline sm:hover:bg-ctp-text/20 rounded-md sm:inline-block
                                           sm:px-5 sm:text-sm sm:font-normal sm:hover:bg-ctp-text/20 sm:rounded-full">
                            Home
                        </Link>
                    </li>
                    <li className="shrink-0">
                        <Link href="/about" className="block py-3 font-mono text-lg hover:text-ctp-text no-underline sm:hover:bg-ctp-text/20 rounded-md sm:inline-block
                                             sm:px-5 sm:text-sm sm:font-normal sm:hover:bg-ctp-text/20 sm:rounded-full">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/blog" className="block py-3 font-mono text-lg hover:text-ctp-text no-underline sm:hover:bg-ctp-text/20 rounded-md sm:inline-block
                                                  sm:px-5 sm:text-sm sm:font-normal sm:hover:bg-ctp-text/20 sm:rounded-full">
                            Blog
                        </Link>
                    </li>
                </ul>
            </div>) : null}

            <div className="sticky top-0 z-20 h-32 overflow-hidden transition-all sm:hidden">
                <div className={onTop || isOpen ? "mt-0 relative transition-all bg-ctp-surface0 rounded-none" : "mx-5 mt-10 relative transition-all bg-ctp-surface0 rounded-lg"}>
                    <div className="flex justify-between space-x-2 pr-5 transition-colors bg-transparent">
                        <button className="relative z-50 block px-2 text-neutral-500 transition-all focus:ring">
                            <Hamburger size={24} onToggle={toggled => setOpen(toggled)} />
                        </button>
                        <div className="overflow-hidden py-2 px-1">
                            <p className="text-right select-none sm:select-text w-full inline-flex text-lg rounded-sm focus:outline-none focus:opacity-100
                                      focus:ring items-center space-x-2 no-underline opacity-50 hover:opacity-100 h-12 mt-0.5">
                                <span>Not playing anything</span>
                                <span>
                                <SiSpotify/>
                            </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
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