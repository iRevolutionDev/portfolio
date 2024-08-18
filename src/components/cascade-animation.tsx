"use client";
import { motion } from "framer-motion";
import type { FC, PropsWithChildren } from "react";

export const CascadeItem: FC<PropsWithChildren> = ({ children }) => {
	const variants = {
		hidden: {
			opacity: 0,
			scale: 0.8,
			x: -10,
		},
		visible: {
			opacity: 1,
			scale: 1,
			x: 0,
		},
	};

	return (
		<motion.div
			className="w-full h-full"
			variants={variants}
			key="cascade-item"
		>
			{children}
		</motion.div>
	);
};

export const CascadeContainer: FC<PropsWithChildren> = ({ children }) => {
	const variants = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	return (
		<motion.div
			className="w-full h-full"
			variants={variants}
			initial="hidden"
			animate="visible"
			key="cascade-container"
		>
			{children}
		</motion.div>
	);
};
