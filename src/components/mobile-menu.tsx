"use client";

import { LanguageSwitch } from "@/components/language-switch";
import { ToggleThemeButton } from "@/components/toggle-theme-button";
import { useAppSelector } from "@/redux/hooks";
import { Stack } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import type { FC, PropsWithChildren } from "react";

const MobileMenu: FC<PropsWithChildren> = ({ children }) => {
	const { open } = useAppSelector((state) => state.menu);

	return (
		<AnimatePresence mode="wait">
			{open && (
				<motion.div
					className="fixed inset-0 bg-black z-40 backdrop-blur-md"
					style={{
						backgroundColor:
							"rgba(from var(--mui-palette-background-paper) r g b / 90%)",
					}}
					initial={{ y: "-100%" }}
					animate={{ y: 0 }}
					exit={{ y: "-100%" }}
					transition={{ duration: 0.3 }}
				>
					<div className="flex flex-col w-full h-full my-20 relative">
						<ul className="list-none w-full">{children}</ul>
						<div className="relative w-full h-full">
							<div className="absolute right-4 bottom-[6rem]">
								<Stack direction="column" spacing={2}>
									<LanguageSwitch />
									<ToggleThemeButton />
								</Stack>
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default MobileMenu;
