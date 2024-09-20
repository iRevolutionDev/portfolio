import { auth } from "@/auth";
import { SignInForm } from "@/components/signin-form";
import { DASHBOARD_HOME_PATH } from "@/constants/routes";
import { Card } from "@mui/material";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { RedirectType, redirect } from "next/navigation";

export default async function SignIn({
	params: { locale },
}: { params: { locale: string } }) {
	unstable_setRequestLocale(locale);

	const t = await getTranslations("pages.dashboard.signIn");
	const session = await auth();

	if (session) redirect(DASHBOARD_HOME_PATH, RedirectType.replace);

	return (
		<div className="flex items-center justify-center w-full h-screen">
			<Card className="flex flex-col items-center justify-center w-full h-full p-4 max-w-xl max-h-96 space-y-4 m-2">
				<h1 className="text-2xl font-bold">{t("title")}</h1>
				<SignInForm />
			</Card>
		</div>
	);
}
