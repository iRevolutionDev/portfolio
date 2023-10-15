'use client';

import * as React from 'react';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from '@/theme/emotion-cache';
import {darkTheme} from "@/theme/colors/dark-theme";
import {useAppSelector} from "@/redux/hooks";
import {lightTheme} from "@/theme/colors/light-theme";

export default function ThemeRegistry({children}: { children: React.ReactNode }) {
    const {theme} = useAppSelector(state => state.theme);

    return (
        <NextAppDirEmotionCacheProvider options={{key: 'mui'}}>
            <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
}