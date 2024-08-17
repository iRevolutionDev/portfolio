"use client";

import { formatUrl } from "@/helpers/format-url";
import { setTransition } from "@/redux/features/page-slice";
import { useAppDispatch } from "@/redux/hooks";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";
import {
	// @ts-ignore This export exists on react@canary
	useOptimistic,
} from "react";
import { useEffect } from "react";
import { startTransition } from "react";

// Copied from  https://github.com/vercel/next.js/blob/canary/packages/next/src/client/link.tsx#L180-L191
function isModifiedEvent(event: React.MouseEvent): boolean {
	const eventTarget = event.currentTarget as HTMLAnchorElement | SVGAElement;
	const target = eventTarget.getAttribute("target");
	return (
		(target && target !== "_self") ||
		event.metaKey ||
		event.ctrlKey ||
		event.shiftKey ||
		event.altKey || // triggers resource download
		(event.nativeEvent && event.nativeEvent.which === 2)
	);
}

/**
 * A custom Link component that wraps Next.js's next/link component.
 */
export function Link({
	href,
	children,
	replace,
	scroll,
	onClick,
	...rest
}: Parameters<typeof NextLink>[0]) {
	const router = useRouter();
	const dispatch = useAppDispatch();

	// The magic happens here
	const [loading, setLoading] = useOptimistic(false);

	useEffect(() => {
		dispatch(setTransition(loading));
	}, [loading, dispatch]);

	return (
		<NextLink
			href={href}
			onClick={(e) => {
				onClick?.(e);

				if (isModifiedEvent(e)) return;
				e.preventDefault();
				startTransition(() => {
					setLoading(true);
					const url =
						typeof href === "string" ? href : formatUrl(href as never);
					if (replace) {
						router.replace(url, { scroll });
					} else {
						router.push(url, { scroll });
					}
				});
			}}
			{...rest}
		>
			{children}
		</NextLink>
	);
}
