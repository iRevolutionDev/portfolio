"use client";

import { createOverrides } from "@/components/markdown/overrides";
import MarkdownToJSX from "markdown-to-jsx";
import type { FC } from "react";

export type MarkdownProps = {
	children: string;
};

export const Markdown: FC<MarkdownProps> = ({ children }) => {
	return (
		<MarkdownToJSX
			options={{
				overrides: createOverrides(),
				wrapper: "article",
			}}
		>
			{children}
		</MarkdownToJSX>
	);
};
