import "@/components/location-card/location-card.css";
import {
	AnimatedCard,
	AnimatedItem,
} from "@/components/location-card/animations";
import { Stack } from "@mui/material";
import Link from "next/link";
import type { FC, PropsWithChildren } from "react";

const Ping = () => {
	return (
		<div className="h-4 w-4 rounded-full bg-[#ffb3b1] relative">
			<span className="w-2 h-2 bg-white location-ping" />
		</div>
	);
};

const Item: FC<PropsWithChildren> = ({ children }) => {
	return <AnimatedItem>{children}</AnimatedItem>;
};

type RootProps = {
	href: string;
};

const Root: FC<PropsWithChildren<RootProps>> = ({ children, href }) => {
	return (
		<Link href={href} rel="noopener noreferrer" target="_blank">
			<AnimatedCard>
				<Stack
					direction="row"
					spacing={2}
					alignContent="center"
					alignItems="center"
					className="text-nowrap"
				>
					{children}
				</Stack>
			</AnimatedCard>
		</Link>
	);
};

export const Location = {
	Root,
	Ping,
	Item,
};
