"use client";

import { PostForm, type PostFormData } from "@/components/post-form";
import {
	useGetPostQuery,
	useUpdatePostMutation,
} from "@/redux/services/post-api";
import { CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
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
	const t = useTranslations("pages.dashboard.posts.edit");

	const [editPost] = useUpdatePostMutation();
	const { data, isLoading } = useGetPostQuery(id);
	const router = useRouter();

	const onSubmit: SubmitHandler<PostFormData> = async ({
		title,
		content,
		published,
	}) => {
		editPost({
			id,
			title,
			content,
			published,
			created_at: data?.created_at ?? new Date().toISOString(),
			updated_at: new Date().toISOString(),
		})
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
					title={t("title")}
					submitText={t("submit")}
					onSubmit={onSubmit}
					post={data}
				/>
			)}
		</main>
	);
};

export default EditPostPage;
