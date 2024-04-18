"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

export const PageWrapper = ({ children }: PropsWithChildren) => {
	const pathname = usePathname();

	return (
		<motion.div
			initial={{ opacity: 0, translateY: 20 }}
			animate={{ opacity: 1, translateY: 0 }}
			exit={{ opacity: 0, translateY: -20 }}
			transition={{ duration: 0.2 }}
			key={pathname}
		>
			{children}
		</motion.div>
	);
};
