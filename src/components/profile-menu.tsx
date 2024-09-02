"use client";

import { signOutAction } from "@/app/[locale]/dashboard/(main)/actions";
import { stringAvatar } from "@/helpers/text-to-avatar";
import { Logout } from "@mui/icons-material";
import {
	Avatar,
	IconButton,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Menu,
} from "@mui/material";
import type { Session } from "next-auth";
import { useTranslations } from "next-intl";
import { type FC, useState } from "react";

export const ProfileMenu: FC<{ session: Session | null }> = ({ session }) => {
	const t = useTranslations("pages.dashboard.profile");

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	return (
		<>
			<IconButton
				onClick={(event) => setAnchorEl(event.currentTarget)}
				size="small"
			>
				<Avatar
					{...stringAvatar(session?.user.username ?? "Unknown")}
					sx={{ width: 32, height: 32 }}
				/>
			</IconButton>

			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={() => setAnchorEl(null)}
			>
				<ListItemButton>
					<Avatar
						{...stringAvatar(session?.user.username ?? "Unknown")}
						sx={{ width: 32, height: 32 }}
					/>
					<div className="flex flex-col ml-2" style={{ minWidth: 160 }}>
						<span>{session?.user.username}</span>
						<span className="text-sm text-gray-400">{session?.user.email}</span>
					</div>
				</ListItemButton>
				<ListItemButton
					onClick={async () => {
						await signOutAction();
					}}
				>
					<ListItemIcon>
						<Logout />
					</ListItemIcon>
					<ListItemText primary={t("logout")} />
				</ListItemButton>
			</Menu>
		</>
	);
};
