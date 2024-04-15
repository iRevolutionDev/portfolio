"use client";

import { useAppSelector } from "@/redux/hooks";
import { darkTheme } from "@/theme/colors/dark-theme";
import { lightTheme } from "@/theme/colors/light-theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type * as React from "react";

export default function ThemeRegistry({
	children,
}: { children: React.ReactNode }) {
	const { theme } = useAppSelector((state) => state.theme);

	return (
		<AppRouterCacheProvider options={{ key: "mui" }}>
			<ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				{children}
			</ThemeProvider>
		</AppRouterCacheProvider>
	);
}
