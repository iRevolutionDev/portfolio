import { Typography } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

export const H3: FC<PropsWithChildren> = ({ children }, props) => {
	return (
		<Typography variant="h3" {...props}>
			{children}
		</Typography>
	);
};
