import { Typography } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

export const H1: FC<PropsWithChildren> = ({ children }, props) => {
	return (
		<Typography variant="h1" {...props}>
			{children}
		</Typography>
	);
};
