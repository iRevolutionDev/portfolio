import { Typography } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

export const H2: FC<PropsWithChildren> = ({ children }, props) => {
	return (
		<Typography variant="h2" {...props}>
			{children}
		</Typography>
	);
};
