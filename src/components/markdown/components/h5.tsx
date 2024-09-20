import { Typography } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

export const H5: FC<PropsWithChildren> = ({ children }, props) => {
	return (
		<Typography variant="h5" {...props}>
			{children}
		</Typography>
	);
};
