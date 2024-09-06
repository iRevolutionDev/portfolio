"use client";

import { PostForm, type PostFormData } from "@/components/post-form";
import { useCreatePostMutation } from "@/redux/services/post-api";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import type { SubmitHandler } from "react-hook-form";

export default function NewPostPage() {
	const t = useTranslations("pages.dashboard.posts.new");

	const [createPost] = useCreatePostMutation();
	const router = useRouter();

	const onSubmit: SubmitHandler<PostFormData> = async ({
		title,
		content,
		published,
	}) => {
		createPost({
			title,
			content,
			published,
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		})
			.unwrap()
			.then(() => {
				enqueueSnackbar("Post created successfully", { variant: "success" });
				router.replace("/dashboard/posts");
			})
			.catch(() => {
				enqueueSnackbar("Failed to create post", { variant: "error" });
			});
	};

	return (
		<main className="flex flex-col flex-1 overflow-y-auto space-y-5 h-full">
			<PostForm
				title={t("title")}
				submitText={t("submit")}
				onSubmit={onSubmit}
			/>
		</main>
	);
}
