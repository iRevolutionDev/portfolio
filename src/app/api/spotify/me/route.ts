import { SpotifyService } from "@/backend/services/spotify-service";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: Response) {
	try {
		const { access_token } = await SpotifyService.getAccessToken();

		if (!access_token) {
			return NextResponse.json(
				{ error: "Invalid access token" },
				{ status: 401 },
			);
		}

		const playerData = await SpotifyService.getPlayerInformation(access_token);

		return NextResponse.json(playerData);
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
