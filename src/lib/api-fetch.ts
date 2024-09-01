import { env } from "@/env";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { getSession } from "next-auth/react";

type ApiFetchParameters = {
	baseUrl?: string;
	path?: string;
};

interface Meta {
	response: Response;
}

type RequestInitWithBody<T> = Omit<RequestInit, "body"> & {
	body?: T;
};

export const apiFetch: ({ baseUrl, path }: ApiFetchParameters) => BaseQueryFn<
	{
		url: string;
		options?: RequestInitWithBody<unknown>;
	},
	unknown,
	unknown,
	NonNullable<unknown>,
	Meta
> =
	({
		baseUrl = `${env.NEXT_PUBLIC_API_URL}/v1`,
		path = "",
	}): BaseQueryFn<
		{
			url: string;
			options?: RequestInitWithBody<unknown>;
		},
		unknown,
		unknown,
		NonNullable<unknown>,
		Meta
	> =>
	async ({ url, options }) => {
		try {
			const session = await getSession();

			const response = await fetch(`${baseUrl}${path}${url}`, {
				...options,
				body: options?.body ? JSON.stringify(options.body) : undefined,
				headers: {
					...options?.headers,
					Authorization: `Bearer ${session?.user.access_token}`,
				},
			});

			if (!response.ok) {
				const data = await response.json();

				return {
					error: { status: response.status, data },
					meta: {
						response,
					},
				};
			}

			const data = await response.json();

			return {
				data,
				meta: {
					response,
				},
			};
		} catch (error) {
			if (error instanceof Error) {
				return {
					error: { status: 0, data: error.message },
				};
			}

			return {
				error: { status: 0, data: "Unknown error" },
			};
		}
	};
