export type PostModel = {
	id: string;
	title: string;
	content: string;
	published: boolean;
	created_at: string;
	updated_at: string;
};

export type Posts = {
	posts: PostModel[];
};
