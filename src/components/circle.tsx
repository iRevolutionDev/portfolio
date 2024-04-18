"use client";

import { useTheme } from "@mui/material/styles";

export const Circle = () => {
	const theme = useTheme();

	return (
		<span
			className="w-2 h-2 rounded-full"
			style={{ backgroundColor: theme.palette.primary.main }}
		/>
	);
};
