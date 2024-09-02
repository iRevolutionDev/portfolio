"use client";

import { DashboardRoutes } from "@/constants/routes";
import {
	Divider,
	Drawer,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Toolbar,
} from "@mui/material";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC, PropsWithChildren } from "react";

export const DashboardNavbar: FC<PropsWithChildren> = ({ children }) => {
	const t = useTranslations("layout.dashboard");
	const pathname = usePathname();

	return (
		<Drawer
			variant="persistent"
			sx={{
				width: {
					xs: 60,
					md: 240,
				},
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: {
						xs: 60,
						md: 240,
					},
					boxSizing: "border-box",
					borderRadius: "0 1rem 1rem 0",
					overflow: "hidden",
				},
			}}
			open
		>
			{children}
			<Toolbar />
			<Divider />
			<List>
				{DashboardRoutes.map((route) => {
					const isActive = pathname === `/dashboard${route.path}`;
					return (
						<ListItemButton
							key={route.path}
							selected={isActive}
							component={Link}
							href={`/dashboard/${route.path}`}
						>
							{isActive && (
								<motion.div
									layoutId="indicator"
									transition={{ duration: 0.3 }}
									className="absolute top-0 right-0 w-1 h-full rounded-full py-3"
								>
									<div className="w-full h-full bg-primary rounded-full" />
								</motion.div>
							)}
							<ListItemIcon>{route.icon}</ListItemIcon>
							<ListItemText
								primary={t(route.name as never)}
								className="text-nowrap"
							/>
						</ListItemButton>
					);
				})}
				<div className="flex-grow" />
				<Divider />
			</List>
		</Drawer>
	);
};
