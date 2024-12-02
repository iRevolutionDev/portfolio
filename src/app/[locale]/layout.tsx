import { Providers } from "@/providers/providers";
import type { ReactNode } from "react";
import "./globals.css";
import type { Locale } from "@/i18n/i18n.config";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

type Props = {
	children: ReactNode;
	params: Promise<{ locale: string }>;
};

export default async function IntlRootLayout(props: Props) {
	const params = await props.params;

	const { children } = props;

	if (!routing.locales.includes(params.locale as Locale)) {
		notFound();
	}

	return (
		<html lang={params.locale}>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
