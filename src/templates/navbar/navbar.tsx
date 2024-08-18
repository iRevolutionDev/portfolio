import { AnimatedAppBar } from "@/components/animated-appbar";
import MenuButton from "@/components/menu-button";
import MobileMenu from "@/components/mobile-menu";
import { NavButton } from "@/components/nav-button";
import { SpotifyWatcher } from "@/components/spotify-watcher";
import { ToggleThemeButton } from "@/components/toggle-theme-button";
import { Grid, Stack, Toolbar } from "@mui/material";
import { useTranslations } from "next-intl";
import type { FC, PropsWithChildren } from "react";

interface ItemProps {
	href: string;
}

const Item = ({ children, href }: PropsWithChildren<ItemProps>) => {
	return (
		<div className="text-white list-none w-full md:w-auto">
			<NavButton href={href}>{children}</NavButton>
		</div>
	);
};

type Extensions = {
	Item: typeof Item;
};

const Navbar: FC<PropsWithChildren> & Extensions = ({ children }) => {
	const t = useTranslations("layout.navbar");

	return (
		<>
			<nav className="my-5 hidden md:block">
				<Stack direction="row">
					<Stack direction="row" spacing={2}>
						{children}
					</Stack>

					<Grid container justifyContent="flex-end" spacing={2}>
						<Grid item>
							<SpotifyWatcher />
						</Grid>
						<Grid item>
							<ToggleThemeButton />
						</Grid>
					</Grid>
				</Stack>
			</nav>
			<nav className="md:hidden">
				<MobileMenu>{children}</MobileMenu>
				<AnimatedAppBar>
					<Toolbar>
						<MenuButton />
						<Grid container justifyContent="flex-end">
							<Grid item>
								<SpotifyWatcher />
							</Grid>
						</Grid>
					</Toolbar>
				</AnimatedAppBar>
			</nav>
		</>
	);
};

Navbar.Item = Item;
export default Navbar;
