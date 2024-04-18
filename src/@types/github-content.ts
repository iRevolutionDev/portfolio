interface GitHubFile {
	message?: string;
	name: string;
	path: string;
	sha: string;
	size: number;
	url: string;
	html_url: string;
	git_url: string;
	download_url: string | null;
	type: "file" | "dir"; // Assuming type can only be "file" or "dir"
	_links: {
		self: string;
		git: string;
		html: string;
	};
}
