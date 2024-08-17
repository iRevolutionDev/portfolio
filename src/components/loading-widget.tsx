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
					className="fixed inset-0 z-50 w-full h-2"
				>
					<LinearProgress color="secondary" />
				</motion.div>
			)}
		</AnimatePresence>
	);
};
