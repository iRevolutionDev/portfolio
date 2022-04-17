import React, {useEffect, useState} from 'react';
import {FiMoon, FiSun} from "react-icons/fi";
import {useTheme} from "next-themes";
import Link from "next/link";

type ChildrenProp = {
    children?: React.ReactNode;
}

const Desktop: React.FC<ChildrenProp> = ({children}) => {
    return <nav className="hidden md:block">{children}</nav>;
}

const Mobile: React.FC<ChildrenProp> = ({children}) => {
    return <nav className="hidden md:hidden">{children}</nav>;
}

const Container: React.FC<ChildrenProp> = ({children}) => {
    return <div className="flex justify-between items-center">{children}</div>
}

const ThemeButton: React.FC = () => {
    const {theme, setTheme} = useTheme();

    return (
        <div className="hidden md:block">
            <button
                className="rounded-full nm-flat-gray-200 hover:nm-flat-gray-200-lg leading-5 p-4 uppercase font-bold tracking-widest transition duration-200 ease-in-out transform hover:scale-110 dark:nm-flat-gray-900 dark:hover:nm-flat-gray-900-lg"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                {theme === "dark" ? <FiSun/> : <FiMoon/>}
            </button>
        </div>
    );
}

type ItemProps = {
    path: string;
    title: string;
}

const Item: React.FC<ItemProps> = ({path, title}) => {
    return (
        <li className="mr-8">
            <Link href={path}>
                <a
                    className="font-medium text-grey-700 md:text-grey-500 hover:text-off-black dark:hover:text-off-white md:underlined transition relative block whitespace-nowrap text-2xl md:text-lg">
                    {title}
                </a>
            </Link>
        </li>
    );
}

type NavExports = {
    Item: typeof Item;
}

const Nav: React.FC<ChildrenProp> & NavExports = ({children}) => {
    return <ul className="flex gap-8 text-lg">{children}</ul>
}

Nav.Item = Item;

type HeaderExports = {
    Container: typeof Container;
    Desktop: typeof Desktop;
    Mobile: typeof Mobile;
    Nav: typeof Nav;
    ThemeButton: typeof ThemeButton;
}

const Header: React.FC<ChildrenProp> & HeaderExports = ({children}) => {
     return (
          <header className="relative z-50 px-4 lg:px-20 py-8">
              {children}
          </header>
     );
};

Header.Container = Container;
Header.Desktop = Desktop;
Header.Mobile = Mobile;
Header.Nav = Nav;
Header.ThemeButton = ThemeButton;

export { Header };