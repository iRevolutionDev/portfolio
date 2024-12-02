import { type Locale, locales } from "@/i18n/i18n.config";
import { getUserLocale } from "@/i18n/locale";
import { routing } from "@/i18n/routing";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
	let locale = await requestLocale;

	if (!locale) {
		locale = await getUserLocale();
	}

	if (!locales.includes(locale as Locale)) {
		locale = routing.defaultLocale;
	}

	return {
		locale,
		messages: (
			await (locale === "en"
				? import("../../locales/en.json")
				: import(`../../locales/${locale}.json`))
		).default,
	};
});
