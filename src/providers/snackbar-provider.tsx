"use client";

import { SnackbarProvider as NotistackSnackbarProvider } from "notistack";
import type { FC, PropsWithChildren } from "react";

export const SnackbarProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<NotistackSnackbarProvider maxSnack={3}>
			{children}
		</NotistackSnackbarProvider>
	);
};
