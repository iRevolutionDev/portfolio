type LocaleIcons = {
	[key in Locale]: string;
};

export const locales = ["en", "pt-br"] as const;
export type Locale = (typeof locales)[number];
export const LocalesIcons: LocaleIcons = {
	en: "us",
	"pt-br": "br",
} as const;
