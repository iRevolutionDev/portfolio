import type { PostModel, Posts } from "@/@types/models/post-model";
import { apiFetch } from "@/lib/api-fetch";
import { isHydrateAction } from "@/lib/hydrate-action-ssr";
import {
	type CombinedState,
	type EndpointDefinitions,
	createApi,
} from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
	reducerPath: "postApi",
	baseQuery: apiFetch({
		path: "/posts",
	}),
	extractRehydrationInfo(
		action,
		{ reducerPath },
	): CombinedState<EndpointDefinitions, never, "postApi"> | undefined {
		if (isHydrateAction(action)) {
			return action.payload[reducerPath];
		}
	},
	endpoints: (builder) => ({
		listPost: builder.query<Posts, void>({
			query: () => ({ url: "/list" }),
		}),
		createPost: builder.mutation<PostModel, Omit<PostModel, "id">>({
			query: (post) => ({
				url: "/create",
				options: {
					method: "POST",
					body: post,
					headers: {
						"Content-Type": "application/json",
					},
				},
			}),
		}),
		updatePost: builder.mutation<PostModel, PostModel>({
			query: (post) => ({
				url: `/update/${post.id}`,
				options: {
					method: "POST",
					body: post,
					headers: {
						"Content-Type": "application/json",
					},
				},
			}),
		}),
		deletePost: builder.mutation<void, string>({
			query: (id) => ({
				url: `/delete/${id}`,
				options: {
					method: "POST",
				},
			}),
		}),
		getPost: builder.query<PostModel, string>({
			query: (id) => ({ url: `/get/${id}` }),
		}),
	}),
});

export const {
	useListPostQuery,
	useCreatePostMutation,
	useUpdatePostMutation,
	useDeletePostMutation,
	useGetPostQuery,
} = postApi;
