import { Button, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function NotFoundPage() {
	const t = useTranslations("notFound");

	return (
		<Stack
			direction="column"
			spacing={2}
			alignItems="center"
			justifyContent="center"
			className="h-screen"
		>
			<Typography variant="h4" fontWeight={700}>
				{t("title")}
			</Typography>
			<Typography>{t("description")}</Typography>
			<Button variant="contained" color="primary" href="/">
				{t("back")}
			</Button>
		</Stack>
	);
}
