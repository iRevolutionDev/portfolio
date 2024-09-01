import type { PostModel } from "@/@types/models/post-model";
import { PostForm } from "@/components/post-form";
import { env } from "@/env";

type PostPreviewViewPageProps = {
	params: {
		id: string;
	};
};

export default async function PostPreviewViewPage({
	params: { id },
}: PostPreviewViewPageProps) {
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
			<PostForm title="Preview" post={post} />
		</main>
	);
}
