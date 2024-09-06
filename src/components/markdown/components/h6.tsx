import { Typography } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

export const H6: FC<PropsWithChildren> = ({ children }, props) => {
	return (
		<Typography variant="h6" {...props}>
			{children}
		</Typography>
	);
};
