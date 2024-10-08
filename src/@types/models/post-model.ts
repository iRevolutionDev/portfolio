export type PostModel = {
	id: string;
	title: string;
	content: string;
	author: string;
	image_url?: string;
	published: boolean;
	created_at: string;
	updated_at: string;
};

export type Posts = {
	posts: PostModel[];
};
