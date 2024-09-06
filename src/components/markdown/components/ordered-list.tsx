import type { FC, PropsWithChildren } from "react";

export const OrderedList: FC<PropsWithChildren> = ({ children }, props) => {
	return (
		<ol className="list-decimal pl-4" {...props}>
			{children}
		</ol>
	);
};
