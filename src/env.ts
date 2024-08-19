import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		SPOTIFY_CLIENT_ID: z.string().min(1),
		SPOTIFY_SECRET_KEY: z.string().min(1),
		SPOTIFY_REFRESH_TOKEN: z.string().min(1),
	},
	client: {},
	runtimeEnv: {
		SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
		SPOTIFY_SECRET_KEY: process.env.SPOTIFY_SECRET_KEY,
		SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
	},
});
