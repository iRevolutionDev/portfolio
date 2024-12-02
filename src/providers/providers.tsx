import { ReduxProvider } from "@/providers/redux-provider";
import { SessionProvider } from "@/providers/session-provider";
import { SnackbarProvider } from "@/providers/snackbar-provider";
import ThemeRegistry from "@/theme/theme-registry";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import type { FC, PropsWithChildren } from "react";

export const Providers: FC<PropsWithChildren> = async ({ children }) => {
	const messages = await getMessages();

	return (
		<NextIntlClientProvider messages={messages}>
			<ReduxProvider>
				<ThemeRegistry>
					<SnackbarProvider>
						<SessionProvider>{children}</SessionProvider>
					</SnackbarProvider>
				</ThemeRegistry>
			</ReduxProvider>
		</NextIntlClientProvider>
	);
};
