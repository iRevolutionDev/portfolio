import type { FC, PropsWithChildren } from "react";

export const Blockquote: FC<PropsWithChildren> = ({ children }, props) => {
	return (
		<blockquote className="border-l-4 border-primary pl-5" {...props}>
			{children}
		</blockquote>
	);
};
