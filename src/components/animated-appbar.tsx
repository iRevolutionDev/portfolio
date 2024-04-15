"use client";

import { HideOnScroll } from "@/components/hide-on-scroll";
import { useAppSelector } from "@/redux/hooks";
import { AppBar, useScrollTrigger } from "@mui/material";
import type { FC, PropsWithChildren } from "react";

interface Props {
	window?: () => Window;
}

export const AnimatedAppBar: FC<PropsWithChildren<Props>> = ({
	children,
	window,
}) => {
	const { open } = useAppSelector((state) => state.menu);

	const trigger =
		useScrollTrigger({
			target: window ? window() : undefined,
			disableHysteresis: true,
			threshold: 0,
		}) || open;

	return (
		<HideOnScroll disable={open}>
			<AppBar
				className="!transition-all"
				sx={{
					m: trigger ? 0 : 2,
					borderRadius: trigger ? 0 : "1rem",
					width: trigger ? "100%" : "unset",
				}}
				position={trigger ? "fixed" : "static"}
			>
				{children}
			</AppBar>
		</HideOnScroll>
	);
};
