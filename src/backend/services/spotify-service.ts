import querystring from "node:querystring";
import type { SpotifyResponse } from "@/@types/spotify-response";
import type { SpotifyAuthenticationResponse } from "@/backend/models/spotify-authentication-response";
import {
	BASIC,
	GRANT_TYPE,
	HOUR_REVALIDATE,
	PLAYER_ENDPOINT,
	REFRESH_TOKEN,
	SHORT_REVALIDATE,
	TOKEN_ENDPOINT,
} from "@/helpers/constants";

type SpotifyAuthTokenData = {
	grant_type: string;
	refresh_token: string;
};

export const SpotifyService = {
	async retrieveAuthToken(
		data: SpotifyAuthTokenData,
	): Promise<SpotifyAuthenticationResponse> {
		const response = await fetch(TOKEN_ENDPOINT, {
			method: "POST",
			headers: {
				Authorization: `Basic ${BASIC}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: querystring.stringify(data),
			next: {
				revalidate: HOUR_REVALIDATE,
			},
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch token: ${response.statusText}`);
		}

		return await response.json();
	},

	async getAccessToken(): Promise<SpotifyAuthenticationResponse> {
		if (!REFRESH_TOKEN) {
			throw new Error("Refresh token not found");
		}

		return await SpotifyService.retrieveAuthToken({
			grant_type: GRANT_TYPE,
			refresh_token: REFRESH_TOKEN,
		});
	},

	async getPlayerInformation(
		access_token: string,
	): Promise<SpotifyResponse | { is_playing: false }> {
		const response = await fetch(PLAYER_ENDPOINT, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			next: {
				revalidate: SHORT_REVALIDATE,
			},
		});

		if (response.status === 204 || response.status > 400) {
			return { is_playing: false };
		}

		if (!response.ok) {
			throw new Error(`Failed to fetch player data: ${response.statusText}`);
		}

		return await response.json();
	},
};
