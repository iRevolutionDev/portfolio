import type { FC, PropsWithChildren } from "react";

export const Ul: FC<PropsWithChildren> = ({ children }, props) => {
	return (
		<ul className="list-disc pl-4" {...props}>
			{children}
		</ul>
	);
};
