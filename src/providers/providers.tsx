import { ReduxProvider } from "@/providers/redux-provider";
import { SnackbarProvider } from "@/providers/snackbar-provider";
import ThemeRegistry from "@/theme/theme-registry";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider, useMessages } from "next-intl";
import type { FC, PropsWithChildren } from "react";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
	const messages = useMessages();

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
