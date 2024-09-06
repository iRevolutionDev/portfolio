import { Typography } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

export const H4: FC<PropsWithChildren> = ({ children }, props) => {
	return (
		<Typography variant="h4" {...props}>
			{children}
		</Typography>
	);
};
