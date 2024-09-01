export type PostModel = {
	id: string;
	title: string;
	content: string;
};

export type Posts = {
	posts: PostModel[];
};
