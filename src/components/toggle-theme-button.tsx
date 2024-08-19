"use client";
import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton, useColorScheme } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

const containerVariants = {
	hidden: { opacity: 0, scale: 0 },
	visible: { opacity: 1, scale: 1 },
};

const iconVariants = {
	hidden: { opacity: 0, scale: 0 },
	visible: { opacity: 1, scale: 1, rotate: [0, 20, -20, 20, -20, 0] },
};

export const ToggleThemeButton = () => {
	const { mode, setMode } = useColorScheme();

	return (
		<IconButton
			className="w-10 h-10"
			onClick={() => setMode(mode === "dark" ? "light" : "dark")}
		>
			<AnimatePresence>
				<motion.div
					className="w-full h-full"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					layout
				>
					{mode !== "dark" ? (
						<motion.div
							className="w-full h-full flex items-center justify-center"
							variants={iconVariants}
							initial="hidden"
							animate="visible"
							exit="hidden"
							key="dark"
							layout
						>
							<DarkMode />
						</motion.div>
					) : (
						<motion.div
							className="w-full h-full flex items-center justify-center"
							variants={iconVariants}
							initial="hidden"
							animate="visible"
							exit="hidden"
							key="light"
							layout
						>
							<LightMode />
						</motion.div>
					)}
				</motion.div>
			</AnimatePresence>
		</IconButton>
	);
};
