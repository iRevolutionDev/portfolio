import { PageWrapper } from "@/app/[locale]/(home)/page-wrapper";
import { LoadingWidget } from "@/components/loading-widget";
import { Routes } from "@/constants/routes";
import { SEO } from "@/constants/seo";
import Navbar from "@/templates/navbar/navbar";
import { Container } from "@mui/material";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import type { PropsWithChildren } from "react";

export const metadata: Metadata = {
	metadataBase: SEO.metadataBase,
	keywords: SEO.keywords,
	openGraph: SEO.openGraph,
};

export default function Layout({
	children,
	params: { locale },
}: PropsWithChildren<{ params: { locale: string } }>) {
	unstable_setRequestLocale(locale);

	const t = useTranslations("layout.navbar");

	return (
		<Container className="w-full h-full max-w-5xl mx-auto">
			<LoadingWidget />
			<Navbar>
				{Routes.map((route) => (
					<Navbar.Item key="route" href={route.path}>
						{t(route.name as never)}
					</Navbar.Item>
				))}
			</Navbar>
			<main className="space-y-12 py-12 md:py-24">
				<PageWrapper>{children}</PageWrapper>
			</main>
		</Container>
	);
}
