import React, {useEffect, useState} from 'react';
import {FiMoon, FiSun} from "react-icons/fi";
import {useTheme} from "next-themes";

const Desktop: React.FC = () => {
    return (
        <nav className="hidden md:block">

        </nav>
    )
}

const Mobile: React.FC = () => {
    return (
        <nav className="hidden md:hidden">

        </nav>
    )
}

type HeaderExports = {
    Desktop: typeof Desktop
    Mobile: typeof Mobile
}

const Header: React.FC = () => {
    const { resolvedTheme, setTheme } = useTheme();

     return (
          <header className="relative z-50 px-4 lg:px-20 py-8">
               <div className="flex justify-between items-center">
                    <nav className="hidden md:block">
                        <ul className="flex gap-8 text-lg">
                            <li className="mr-8">
                                <a href="#" className="font-medium text-grey-700 md:text-grey-500 hover:text-off-black dark:hover:text-off-white md:underlined transition relative block whitespace-nowrap text-2xl md:text-lg">
                                    Home
                                </a>
                            </li>
                            <li className="mr-8">
                                <a href="#" className="font-medium text-grey-700 md:text-grey-500 hover:text-off-black dark:hover:text-off-white md:underlined transition relative block whitespace-nowrap text-2xl md:text-lg">
                                    About
                                </a>
                            </li>
                            <li className="mr-8">
                                <a href="#" className="font-medium text-grey-700 md:text-grey-500 hover:text-off-black dark:hover:text-off-white md:underlined transition relative block whitespace-nowrap text-2xl md:text-lg">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </nav>
                   <div className="hidden md:block">
                       <button
                           type="button"
                           className="rounded-full nm-flat-gray-200 hover:nm-flat-gray-200-lg leading-5 p-4 uppercase font-bold tracking-widest transition duration-200 ease-in-out transform hover:scale-110 dark:nm-flat-gray-900 dark:hover:nm-flat-gray-900-lg"
                           onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                       >
                           {resolvedTheme === 'dark' ? (
                               <FiSun className="w-5 h-5 text-grey-800 dark:text-grey-200"/>
                           ) : (
                               <FiMoon className="w-5 h-5 text-grey-800 dark:text-grey-200"/>
                           )}
                       </button>
                   </div>
               </div>
          </header>
     );
};

export { Header };