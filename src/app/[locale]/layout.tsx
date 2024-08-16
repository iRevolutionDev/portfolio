import { locales } from "@/i18n/i18n.config";
import { Providers } from "@/providers/providers";
import { ReduxProvider } from "@/providers/redux-provider";
import ThemeRegistry from "@/theme/theme-registry";
import { unstable_setRequestLocale } from "next-intl/server";
import type React from "react";
import "./globals.css";

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export default function IntlRootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode;
	params: { locale: string };
}) {
	unstable_setRequestLocale(locale);

	return (
		<html lang={locale}>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
