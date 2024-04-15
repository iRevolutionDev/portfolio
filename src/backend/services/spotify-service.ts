import querystring from "querystring";
import {
	BASIC,
	GRANT_TYPE,
	HOUR_REVALIDATE,
	PLAYER_ENDPOINT,
	REFRESH_TOKEN,
	SHORT_REVALIDATE,
	TOKEN_ENDPOINT,
} from "@/helpers/constants";

export class SpotifyService {
	static async retrieveAuthToken(data: { [k: string]: any }): Promise<any> {
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
	}

	static async getAccessToken(): Promise<any> {
		return await this.retrieveAuthToken({
			grant_type: GRANT_TYPE,
			refresh_token: REFRESH_TOKEN,
		});
	}

	static async getPlayerInformation(access_token: string): Promise<any> {
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
	}
}
