"use client";

import { type Locale, LocalesIcons } from "@/i18n/i18n.config";
import {
	IconButton,
	List,
	ListItemButton,
	ListItemIcon,
	Menu,
	Typography,
} from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LanguageSwitch = () => {
	const t = useTranslations("languages");
	const router = useRouter();

	const currentLocale = useLocale() as Locale;
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [open, setOpen] = useState(false);

	const handleLocaleChange = (locale: string) => {
		if (locale === currentLocale) return;

		document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=Lax`;
		router.refresh();
	};

	return (
		<>
			<IconButton
				className="w-10 h-10"
				onClick={(event) => {
					setAnchorEl(event.currentTarget);
					setOpen(true);
				}}
			>
				<Image
					src={`/assets/flags/${LocalesIcons[currentLocale]}.svg`}
					alt={currentLocale}
					width={24}
					height={24}
					className="w-full h-full rounded-full object-cover"
				/>
			</IconButton>
			<Menu open={open} anchorEl={anchorEl} onClose={() => setOpen(false)}>
				<List>
					{Object.keys(LocalesIcons).map((locale) => (
						<ListItemButton
							key={locale}
							onClick={() => handleLocaleChange(locale)}
						>
							<ListItemIcon>
								<Image
									src={`/assets/flags/${LocalesIcons[locale as keyof typeof LocalesIcons]}.svg`}
									alt={locale}
									width={24}
									height={24}
									className="rounded-md"
								/>
							</ListItemIcon>
							<Typography>{t(locale as keyof typeof LocalesIcons)}</Typography>
						</ListItemButton>
					))}
				</List>
			</Menu>
		</>
	);
};
