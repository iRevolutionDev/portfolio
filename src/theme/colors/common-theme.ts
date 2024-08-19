import type { ThemeOptions } from "@mui/material";

export const commonTheme: ThemeOptions = {
	components: {
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: "0.8rem",
				},
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					borderRadius: "0.4rem",
					fontSize: "0.8rem",
					boxShadow: "0 0 0.4rem rgba(0, 0, 0, 0.2)",
				},
			},
		},
	},
};
