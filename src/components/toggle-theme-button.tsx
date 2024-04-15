"use client";
import { useTheme } from "@/hooks/useTheme";
import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export const ToggleThemeButton = () => {
	const { toggleTheme, theme } = useTheme();

	return (
		<IconButton onClick={toggleTheme}>
			{theme !== "dark" ? <DarkMode /> : <LightMode />}
		</IconButton>
	);
};
