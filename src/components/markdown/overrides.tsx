import { Divider } from "@/components/markdown/components/divider";
import { H1 } from "@/components/markdown/components/h1";
import { H2 } from "@/components/markdown/components/h2";
import { H3 } from "@/components/markdown/components/h3";
import { H4 } from "@/components/markdown/components/h4";
import { H5 } from "@/components/markdown/components/h5";
import { H6 } from "@/components/markdown/components/h6";
import { Paragraph } from "@/components/markdown/components/paragraph";
import { MarkdownToJSX } from "markdown-to-jsx";
import Overrides = MarkdownToJSX.Overrides;

export const defaultOverrides: Overrides = {
	h1: H1,
	h2: H2,
	h3: H3,
	h4: H4,
	h5: H5,
	h6: H6,
	hr: Divider,
	p: Paragraph,
};

export const createOverrides = (): Overrides => ({
	...defaultOverrides,
});
