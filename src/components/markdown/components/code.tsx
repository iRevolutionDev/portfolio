import type { FC, PropsWithChildren } from "react";

export const Code: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="bg-gray-800 p-1 rounded text-white text-sm overflow-auto">
			{children}
		</div>
	);
};
