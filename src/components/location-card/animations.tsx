"use client";

import { Paper } from "@mui/material";
import { motion } from "framer-motion";
import type { FC, PropsWithChildren } from "react";

export const AnimatedCard: FC<PropsWithChildren> = ({ children }) => {
	const cardVariants = {
		hidden: { width: 0 },
		visible: {
			width: "100%",
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.3,
				duration: 0.7,
			},
		},
	};

	return (
		<Paper
			className="p-2"
			elevation={0}
			sx={{
				borderRadius: 10,
				overflow: "hidden",
			}}
			variant="outlined"
			component={motion.div}
			variants={cardVariants}
			initial="hidden"
			animate="visible"
			exit="hidden"
		>
			{children}
		</Paper>
	);
};

export const AnimatedItem: FC<PropsWithChildren> = ({ children }) => {
	const itemVariants = {
		hidden: { opacity: 0, x: -10 },
		visible: { opacity: 1, x: 0 },
	};

	return <motion.div variants={itemVariants}>{children}</motion.div>;
};
