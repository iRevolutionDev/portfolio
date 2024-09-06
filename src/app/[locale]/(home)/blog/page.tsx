import type { Posts } from "@/@types/models/post-model";
import { env } from "@/env";
import {
	Button,
	ButtonBase,
	Card,
	CardActions,
	Typography,
} from "@mui/material";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

export default async function BlogMainPage() {
	const t = await getTranslations("pages.blog");

	const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/v1/posts/list`, {
		next: {
			revalidate: 1,
		},
	});

	const { posts } = (await response.json()) as Posts;

	return (
		<main className="flex flex-col items-center justify-center w-full h-full">
			<h1 className="text-4xl font-bold">{t("title")}</h1>

			{posts.length === 0 && (
				<Typography variant="body1" component="p" className="mt-4">
					{t("noPosts")}
				</Typography>
			)}

			<div className="grid grid-cols-1 gap-4 p-4 mt-4 md:grid-cols-2 lg:grid-cols-3 w-full">
				{posts.map((post) => (
					<ButtonBase
						component={Link}
						key={post.id}
						href={`/blog/${post.id}`}
						className="h-full"
						sx={{
							borderRadius: "1rem",
						}}
					>
						<Card key={post.id} className="w-full h-full flex flex-col">
							<Image
								src="https://random-image-pepebigotes.vercel.app/api/random-image"
								alt="Random image"
								key={post.id}
								className="h-48 w-full object-cover"
								width={500}
								height={300}
							/>
							<div className="p-4 space-y-2">
								<Typography
									variant="h6"
									component="h2"
									className="text-ellipsis line-clamp-2 font-bold"
								>
									{post.title}
								</Typography>
								<Typography
									variant="body2"
									component="p"
									className="text-ellipsis line-clamp-3 opacity-70"
								>
									{post.content}
								</Typography>
							</div>
							<CardActions className="flex justify-end p-4 mt-auto">
								<Button
									component={Link}
									href={`/blog/${post.id}`}
									sx={{
										borderRadius: "2rem",
									}}
									size="small"
									variant="outlined"
								>
									{t("readMore")} <BsArrowRight className="ml-2" />
								</Button>
							</CardActions>
						</Card>
					</ButtonBase>
				))}
			</div>
		</main>
	);
}
