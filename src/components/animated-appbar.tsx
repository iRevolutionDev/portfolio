"use client";
import { useAppSelector } from "@/redux/hooks";
import { Paper, Toolbar } from "@mui/material";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { type FC, type PropsWithChildren, useState } from "react";

export const AnimatedAppBar: FC<PropsWithChildren> = ({ children }) => {
	const { open } = useAppSelector((state) => state.menu);

	const { scrollY } = useScroll();
	const [hidden, setHidden] = useState(false);
	const [prevScroll, setPrevScroll] = useState(0);

	const isOnTop = scrollY.get() < 100;

	function update(latest: number, prev: number): void {
		if (latest < prev) {
			setHidden(false);
		} else if (latest > 100 && latest > prev) {
			setHidden(true);
		}
	}

	useMotionValueEvent(scrollY, "change", (latest: number) => {
		update(latest, prevScroll);
		setPrevScroll(latest);
	});

	return (
		<>
			<Toolbar />
			<Paper
				component={motion.nav}
				initial={{
					y: 0,
					position: "fixed",
				}}
				animate={{
					y: hidden && !open ? "-100%" : 0,
					margin: !isOnTop || open ? "0" : "1rem",
					borderRadius: !isOnTop || open ? "0" : "1rem",
				}}
				transition={{
					ease: [0.1, 0.25, 0.3, 1],
					duration: 0.6,
				}}
				sx={{
					backgroundColor:
						"rgba(from var(--mui-palette-background-paper) r g b / 70%)",
					boxShadow: 10,
				}}
				className="top-0 left-0 right-0 z-50 backdrop-blur-md"
			>
				{children}
			</Paper>
		</>
	);
};
