"use client";

import type { PostModel } from "@/@types/models/post-model";
import { Link } from "@/components/link";
import { useDeletePostMutation } from "@/redux/services/post-api";
import { Delete, Edit } from "@mui/icons-material";
import { Chip, IconButton, Paper } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { enqueueSnackbar } from "notistack";
import type { FC } from "react";
import { FaEye } from "react-icons/fa";

type PostsGridProps = {
	posts: PostModel[];
};

export const PostsGrid: FC<PostsGridProps> = ({ posts }) => {
	const [deletePost] = useDeletePostMutation();

	const columns: GridColDef<PostModel>[] = [
		{ field: "title", headerName: "Title", flex: 1 },
		{ field: "author", headerName: "Author", flex: 1 },
		{
			field: "created_at",
			headerName: "Published At",
			renderCell: (params) => new Date(params.value).toLocaleDateString(),
			flex: 1,
		},
		{
			field: "updated_at",
			headerName: "Updated At",
			renderCell: (params) => new Date(params.value).toLocaleDateString(),
			flex: 1,
		},
		{
			field: "published",
			headerName: "Status",
			renderCell: (params) => {
				return (
					<Chip
						label={params.value ? "Published" : "Draft"}
						color={params.value ? "primary" : "default"}
					/>
				);
			},
			minWidth: 130,
		},
		{
			field: "actions",
			headerName: "Actions",
			width: 150,
			renderCell: (params) => {
				return (
					<div className="flex h-full items-center space-x-2">
						<IconButton>
							<Link href={`/dashboard/posts/${params.id}`}>
								<FaEye />
							</Link>
						</IconButton>
						<IconButton
							component={Link}
							href={`/dashboard/posts/${params.id}/edit`}
							sx={{ color: "primary.main" }}
						>
							<Edit />
						</IconButton>
						<IconButton
							sx={{ color: "error.main" }}
							onClick={() => {
								deletePost(params.id.toString())
									.unwrap()
									.then(() => {
										enqueueSnackbar("Post deleted successfully", {
											variant: "success",
										});
									});
							}}
						>
							<Delete />
						</IconButton>
					</div>
				);
			},
		},
	];

	return (
		<Paper className="h-full">
			<DataGrid
				rows={posts}
				columns={columns}
				autosizeOptions={{
					expand: true,
				}}
			/>
		</Paper>
	);
};
