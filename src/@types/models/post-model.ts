export type PostModel = {
	id: string;
	title: string;
	content: string;
	published: boolean;
};

export type Posts = {
	posts: PostModel[];
};
