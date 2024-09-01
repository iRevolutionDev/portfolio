"use client";

import { PostForm, type PostFormData } from "@/components/post-form";
import {
	useGetPostQuery,
	useUpdatePostMutation,
} from "@/redux/services/post-api";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";

type EditPostPageProps = {
	params: {
		id: string;
	};
};

const EditPostPage: FC<EditPostPageProps> = ({ params: { id } }) => {
	const [editPost] = useUpdatePostMutation();
	const { data, isLoading } = useGetPostQuery(id);
	const router = useRouter();

	const onSubmit: SubmitHandler<PostFormData> = async ({ title, content }) => {
		editPost({ id, title, content })
			.unwrap()
			.then(() => {
				enqueueSnackbar("Post updated successfully", { variant: "success" });
				router.replace("/dashboard/posts");
			})
			.catch(() => {
				enqueueSnackbar("Failed to update post", { variant: "error" });
			});
	};

	return (
		<main className="flex flex-col flex-1 overflow-y-auto space-y-5 h-full">
			{isLoading ? (
				<div className="flex justify-center items-center h-full">
					<CircularProgress />
				</div>
			) : (
				<PostForm
					title="Edit Post"
					submitText="Edit Post"
					onSubmit={onSubmit}
					post={data}
				/>
			)}
		</main>
	);
};

export default EditPostPage;
