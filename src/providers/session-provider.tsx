"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import type { FC, PropsWithChildren } from "react";

export const SessionProvider: FC<PropsWithChildren> = ({ children }) => {
	return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};
