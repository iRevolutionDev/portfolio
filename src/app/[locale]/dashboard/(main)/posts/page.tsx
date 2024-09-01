import type { Posts } from "@/@types/models/post-model";
import { Link } from "@/components/link";
import { PostsGrid } from "@/components/posts-grid";
import { env } from "@/env";
import { Button, Paper, Typography } from "@mui/material";

export default async function PostsPage() {
	const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/v1/posts/list`, {
		next: {
			revalidate: 1,
		},
	});
	const { posts } = (await response.json()) as Posts;

	return (
		<main className="flex flex-col flex-1 overflow-y-auto space-y-5 h-full">
			<Paper className="p-4 space-y-4">
				<div className="flex items-center justify-between">
					<div className="flex flex-col">
						<Typography variant="h4">Posts</Typography>
						<Typography variant="body1">
							All posts will be displayed here
						</Typography>
					</div>
					<div className="flex items-center space-x-2">
						<Button
							component={Link}
							variant="contained"
							href="/dashboard/posts/new"
						>
							Create New Post
						</Button>
					</div>
				</div>
			</Paper>
			<PostsGrid posts={posts} />
		</main>
	);
}
