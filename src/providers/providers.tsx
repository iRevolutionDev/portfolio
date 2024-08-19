import { ReduxProvider } from "@/providers/redux-provider";
import ThemeRegistry from "@/theme/theme-registry";
import { NextIntlClientProvider, useMessages } from "next-intl";
import type { FC, PropsWithChildren } from "react";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
	const messages = useMessages();

	return (
		<NextIntlClientProvider messages={messages}>
			<ReduxProvider>
				<ThemeRegistry>{children}</ThemeRegistry>
			</ReduxProvider>
		</NextIntlClientProvider>
	);
};
