import { theme } from "@/theme/theme-colors";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import InitColorSchemeScript from "@mui/system/InitColorSchemeScript";
import type * as React from "react";

export default function ThemeRegistry({
	children,
}: { children: React.ReactNode }) {
	return (
		<AppRouterCacheProvider options={{ key: "mui" }}>
			<CssVarsProvider theme={theme} defaultMode="system">
				<InitColorSchemeScript />
				{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
				<CssBaseline />
				{children}
			</CssVarsProvider>
		</AppRouterCacheProvider>
	);
}
