import { Anchor } from "@/components/markdown/components/anchor";
import { Blockquote } from "@/components/markdown/components/blockquote";
import { Code } from "@/components/markdown/components/code";
import { Divider } from "@/components/markdown/components/divider";
import { H1 } from "@/components/markdown/components/h1";
import { H2 } from "@/components/markdown/components/h2";
import { H3 } from "@/components/markdown/components/h3";
import { H4 } from "@/components/markdown/components/h4";
import { H5 } from "@/components/markdown/components/h5";
import { H6 } from "@/components/markdown/components/h6";
import { OrderedList } from "@/components/markdown/components/ordered-list";
import { Paragraph } from "@/components/markdown/components/paragraph";
import { Ul } from "@/components/markdown/components/ul";
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
	ul: Ul,
	a: Anchor,
	ol: OrderedList,
	blockquote: Blockquote,
	code: Code,
};

export const createOverrides = (): Overrides => ({
	...defaultOverrides,
});
