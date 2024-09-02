import type { PostModel } from "@/@types/models/post-model";
import { PostForm } from "@/components/post-form";
import { env } from "@/env";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

type PostPreviewViewPageProps = {
	params: {
		id: string;
		locale: string;
	};
};

export default async function PostPreviewViewPage({
	params: { id, locale },
}: PostPreviewViewPageProps) {
	unstable_setRequestLocale(locale);

	const t = await getTranslations("pages.dashboard.posts.preview");

	const response = await fetch(
		`${env.NEXT_PUBLIC_API_URL}/v1/posts/get/${id}`,
		{
			next: {
				revalidate: 1,
			},
		},
	);

	const post = (await response.json()) as PostModel;

	return (
		<main className="flex flex-col flex-1 overflow-y-auto space-y-5 h-full">
			<PostForm title={t("title")} post={post} />
		</main>
	);
}
