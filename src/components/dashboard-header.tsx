import { auth } from "@/auth";
import { ProfileMenu } from "@/components/profile-menu";
import { Toolbar } from "@mui/material";
import { getTranslations } from "next-intl/server";
import type { FC } from "react";

export const DashboardHeader: FC = async () => {
	const t = await getTranslations("pages.dashboard.header");
	const session = await auth();

	return (
		<Toolbar className="flex justify-between">
			<h1>{t("title")}</h1>

			<div className="flex items-center">
				<ProfileMenu session={session} />
			</div>
		</Toolbar>
	);
};
