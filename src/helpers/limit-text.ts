export const limitText = (text: string, limit: number, end = "...") => {
	if (text.length <= limit) return text;
	return text.slice(0, limit) + end;
};
