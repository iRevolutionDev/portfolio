"use client";

import { useAppSelector } from "@/redux/hooks";
import { LinearProgress } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

export const LoadingWidget = () => {
	const { transition } = useAppSelector((state) => state.page);

	return (
		<AnimatePresence mode="wait" initial={false}>
			{transition && (
				<motion.div
					key="loading-widget"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed z-50 w-full h-1 md:inset-0 bottom-0 left-0 right-0 md:bottom-auto md:left-auto"
				>
					<LinearProgress color="secondary" />
				</motion.div>
			)}
		</AnimatePresence>
	);
};
