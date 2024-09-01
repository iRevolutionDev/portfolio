"use client";

import type { PostModel } from "@/@types/models/post-model";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, Switch, TextField, Typography } from "@mui/material";
import Markdown from "markdown-to-jsx";
import type { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type PostFormProps = {
	title?: string;
	submitText?: string;
	onSubmit?: (data: PostFormData) => void;
	post?: PostModel;
};

const schema = z.object({
	title: z.string().min(5),
	content: z.string().min(10),
	published: z.boolean(),
});

export type PostFormData = z.infer<typeof schema>;

export const PostForm: FC<PostFormProps> = ({
	title,
	submitText,
	onSubmit,
	post,
}) => {
	const {
		control,
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
	} = useForm<PostFormData>({
		resolver: zodResolver(schema),
		mode: "onBlur",
		defaultValues: {
			title: post?.title,
			content: post?.content,
			published: post?.published,
		},
	});

	return (
		<div className="grid grid-cols-2 gap-4 h-full">
			<Card className="p-4 space-y-4 h-full">
				<form
					className="space-y-4 h-full flex flex-col justify-between"
					onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}
				>
					<div className="space-y-4">
						<Typography variant="h5">{title}</Typography>
						<Controller
							render={({ field }) => {
								return (
									<TextField
										label="Title"
										variant="outlined"
										fullWidth
										placeholder="Enter the title of the post"
										{...field}
										disabled={!onSubmit}
										error={!!errors.title}
										helperText={errors.title?.message}
									/>
								);
							}}
							name="title"
							control={control}
						/>

						<Controller
							render={({ field }) => {
								return (
									<TextField
										label="Content"
										variant="outlined"
										fullWidth
										multiline
										rows={10}
										placeholder="Enter the content of the post"
										{...field}
										disabled={!onSubmit}
										error={!!errors.content}
										helperText={errors.content?.message}
									/>
								);
							}}
							name="content"
							control={control}
						/>

						<div className="flex items-center space-x-4">
							<Typography variant="body1">Published</Typography>
							<Switch
								{...register("published")}
								checked={watch("published")}
								disabled={!onSubmit}
							/>
						</div>
					</div>
					<div className="flex justify-end">
						{onSubmit && (
							<Button
								variant="contained"
								disabled={!isValid}
								onClick={handleSubmit(onSubmit)}
							>
								{submitText || "Submit"}
							</Button>
						)}
					</div>
				</form>
			</Card>
			<div className="space-y-4 h-full">
				<Card className="p-4 h-full">
					<Typography variant="h6">{watch("title")}</Typography>
					<div className="w-full h-full text-wrap">
						<Markdown options={{ wrapper: "article" }}>
							{watch("content")}
						</Markdown>
					</div>
				</Card>
			</div>
		</div>
	);
};
