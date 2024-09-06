import { Typography } from "@mui/material";
import type { TypographyProps } from "@mui/system";
import type { FC, PropsWithChildren } from "react";

export const Paragraph: FC<PropsWithChildren<TypographyProps>> = (
	{ children },
	props,
) => {
	return (
		<Typography
			component="p"
			variant="body1"
			sx={{
				"&:not(:last-child)": {
					mb: 2,
				},
			}}
			{...props}
		>
			{children}
		</Typography>
	);
};
