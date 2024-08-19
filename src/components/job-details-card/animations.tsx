"use client";

import { type Variants, motion } from "framer-motion";
import type { FC, PropsWithChildren } from "react";

export const JobItem: FC<PropsWithChildren> = ({ children }) => {
	const itemVariants: Variants = {
		hidden: {
			opacity: 0,
			y: -10,
		},
		visible: {
			opacity: 1,
			y: 0,
		},
	};

	return <motion.div variants={itemVariants}>{children}</motion.div>;
};

export const JobContainer: FC<PropsWithChildren> = ({ children }) => {
	const containerVariants: Variants = {
		visible: {
			transition: {
				staggerChildren: 0.3,
			},
		},
	};

	return (
		<motion.div
			className="grid grid-cols-1 gap-2 md:grid-cols-2"
			variants={containerVariants}
			initial="hidden"
			whileInView="visible"
			viewport={{
				once: true,
			}}
			exit="hidden"
		>
			{children}
		</motion.div>
	);
};
