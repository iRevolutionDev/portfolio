'use client';

import {FC, PropsWithChildren} from "react";
import {useAppSelector} from "@/redux/hooks";
import {motion} from "framer-motion";
import {useTheme} from "@mui/material/styles";
import {ToggleThemeButton} from "@/components/toggle-theme-button";

const MobileMenu: FC<PropsWithChildren> = ({children}) => {
    const {open} = useAppSelector(state => state.menu);
    const theme = useTheme();

    return (
        <>
            {open && (
                <motion.div className="fixed inset-0 bg-black z-50"
                            style={{backgroundColor: theme.palette.background.default, opacity: 0.5}}
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.2}}>
                    <motion.div className="fixed inset-0 z-50"
                                initial={{y: "-100%"}}
                                animate={{y: 0}}
                                exit={{y: "100%"}}
                                transition={{duration: 0.2}}>

                        <div className="flex flex-col w-full h-full my-20 relative">
                            <ul className="list-none w-full">
                                {children}
                            </ul>
                            <div className="relative w-full h-full">
                                <div className="absolute right-4 bottom-[6rem]">
                                    <ToggleThemeButton/>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    )
}

export default MobileMenu;