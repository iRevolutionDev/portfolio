import Link from "next/link";
import type { FC, PropsWithChildren } from "react";

type AnchorProps = {
	href: string;
};

export const Anchor: FC<PropsWithChildren<AnchorProps>> = (
	{ children, href },
	props,
) => {
	return (
		<Link href={href} className="text-primary underline" {...props}>
			{children}
		</Link>
	);
};
