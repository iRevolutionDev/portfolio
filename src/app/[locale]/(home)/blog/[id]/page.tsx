import type { PostModel } from "@/@types/models/post-model";
import { Markdown } from "@/components/markdown/markdown";
import { env } from "@/env";
import { Chip } from "@mui/material";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export const generateMetadata = async ({
	params: { id },
}: {
	params: { id: string };
}): Promise<Metadata> => {
	const response = await fetch(
		`${env.NEXT_PUBLIC_API_URL}/v1/posts/get/${id}`,
		{
			next: {
				revalidate: 1,
			},
		},
	);

	const post = (await response.json()) as PostModel;

	return {
		title: post.title,
		description: post.content,
		openGraph: {
			type: "article",
			title: post.title,
			description: post.content,
			publishedTime: post.created_at,
			modifiedTime: post.updated_at,
			authors: [post.author],
			images: [
				{
					url: "https://random-image-pepebigotes.vercel.app/api/random-image",
					width: 500,
					height: 500,
					alt: post.title,
				},
			],
		},
	};
};

export default async function BlogPage({
	params: { id },
}: { params: { id: string } }) {
	const t = await getTranslations("pages.blog");

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
		<main className="flex flex-col items-center justify-center w-full h-full">
			<div className="flex flex-col w-full h-full">
				<div className="h-96 w-full rounded-2xl mb-4 overflow-hidden relative">
					<Image
						src="https://random-image-pepebigotes.vercel.app/api/random-image"
						alt="Random image"
						key={post.id}
						className="h-full w-full object-cover absolute top-0 left-0"
						width={500}
						height={500}
					/>

					<div className="absolute bottom-0 left-0 p-4 w-full">
						<div className="bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-40 p-4 rounded-xl">
							<h1 className="text-4xl font-bold">{post.title}</h1>
						</div>
					</div>
				</div>

				<div className="w-full flex items-center justify-between">
					<p className="text-ellipsis line-clamp-2 font-bold">
						<Chip
							label={`${t("timeToRead")}: ${Math.ceil(
								post.content.split(" ").length / 200,
							)} min`}
							color="primary"
							variant="outlined"
							size="small"
						/>
					</p>
					<p className="text-sm opacity-70">
						{new Date(post.created_at).toLocaleDateString()}
					</p>
				</div>

				<hr className="w-full my-4" />
			</div>

			<Markdown>{post.content}</Markdown>
		</main>
	);
}
