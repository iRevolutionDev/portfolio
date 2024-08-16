import { type Locale, locales } from "@/i18n/i18n.config";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export default getRequestConfig(async ({ locale }) => {
	if (!locales.includes(locale as Locale)) notFound();

	return {
		messages: (await import(`../locales/${locale}.json`)).default,
	};
});
