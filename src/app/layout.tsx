import { Providers } from "@/redux/provider";
import ThemeRegistry from "@/theme/theme-registry";
import type React from "react";
import "./globals.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<ThemeRegistry>{children}</ThemeRegistry>
				</Providers>
			</body>
		</html>
	);
}
