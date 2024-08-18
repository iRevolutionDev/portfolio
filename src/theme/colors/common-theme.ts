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
	},
};
