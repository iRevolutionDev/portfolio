import type { Position } from "@/@types/position";
import { JobDetailsCard } from "@/components/job-details-card";
import { Location } from "@/components/location-card/location-card";
import { SocialLinks } from "@/components/social-links";
import { TechnologyList } from "@/components/technology-list";
import { TitleWithColor } from "@/components/title-with-color";
import { LocationOn } from "@mui/icons-material";
import { Divider, Stack, Typography } from "@mui/material";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export const generateMetadata = async ({
	params: { locale },
}: { params: { locale: string } }): Promise<Metadata> => {
	const t = await getTranslations({ locale, namespace: "metadata" });

	return {
		title: `Revolution @ ${t("pages.home.title")}`,
		description: t("pages.home.description"),
		openGraph: {
			title: t("pages.home.title"),
			description: t("pages.home.description"),
		},
	};
};

export default function Page({
	params: { locale },
}: { params: { locale: string } }) {
	unstable_setRequestLocale(locale);

	const t = useTranslations("pages.home");

	return (
		<Stack direction="column" spacing={4}>
			<Stack direction="column" spacing={2}>
				<Stack
					direction={{ xs: "column", sm: "row" }}
					spacing={2}
					alignContent="center"
					alignItems="center"
				>
					<SocialLinks />
					<Location.Root href="https://www.google.com/maps/place/S%C3%A3o+Paulo,+State+of+S%C3%A3o+Paulo/">
						<LocationOn fontSize="small" />
						<Typography variant="body1">{t("location")}</Typography>
						<Location.Ping />
					</Location.Root>
				</Stack>
				<Stack
					direction="row"
					spacing={2}
					alignContent="center"
					alignItems="center"
				>
					<h3 className="text-4xl md:text-6xl font-bold">
						{t("presentation.title")} <br />
						<TitleWithColor>Revolution</TitleWithColor>.
					</h3>
					<h2 className="text-4xl md:text-6xl font-bold">👋</h2>
				</Stack>
				<Typography variant="body1" className="opacity-60">
					{t("presentation.description")}
				</Typography>
			</Stack>
			<Stack direction="column" spacing={2}>
				<Typography variant="h4" fontWeight={700}>
					{t("technologies.title")} 💻
				</Typography>
				<Typography variant="body1" className="opacity-60">
					{t("technologies.description")}
				</Typography>
				<TechnologyList />
			</Stack>
			<Stack direction="column" spacing={2}>
				<Typography variant="h4" fontWeight={700}>
					{t("currentPositions.title")} 💼
				</Typography>
				<JobDetailsCard.Root>
					{t
						.raw("currentPositions.positions")
						.map((position: Position, index: number) => (
							<JobDetailsCard.Item
								key={`${position.position}-${index}`}
								title={position.company}
								position={position.position}
							>
								{position.description}
							</JobDetailsCard.Item>
						))}
				</JobDetailsCard.Root>
			</Stack>
			<footer className="w-full">
				<Divider className="w-full" sx={{ marginBottom: 2 }} />
				<Typography
					variant="h5"
					className="opacity-60"
					sx={{ marginBottom: 1 }}
				>
					Revolution
				</Typography>
				<Typography variant="body1" className="opacity-60">
					{t("footer", {
						year: new Date().getFullYear(),
					})}
				</Typography>
			</footer>
		</Stack>
	);
}
