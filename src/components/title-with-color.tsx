"use client";
import { useTheme } from "@mui/material/styles";
import type { PropsWithChildren } from "react";

export const TitleWithColor = ({ children, ...props }: PropsWithChildren) => {
	const theme = useTheme();

	return (
		<span
			className="text-4xl md:text-6xl font-bold"
			{...props}
			style={{
				color: theme.palette.primary.main,
			}}
		>
			{children}
		</span>
	);
};
