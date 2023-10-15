"use client";
import {IconButton} from "@mui/material";
import {DarkMode, LightMode} from "@mui/icons-material";
import {useTheme} from "@/hooks/useTheme";

export const ToggleThemeButton = () => {
    const {toggleTheme, theme} = useTheme();

    return (
        <IconButton
            onClick={toggleTheme}
        >
            {theme !== "dark" ? <DarkMode/> : <LightMode/>}
        </IconButton>
    )
}