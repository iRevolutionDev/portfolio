import { env } from "@/env";

export const BASIC = Buffer.from(
	`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_SECRET_KEY}`,
).toString("base64");
export const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
export const PLAYER_ENDPOINT =
	"https://api.spotify.com/v1/me/player/currently-playing";
export const GRANT_TYPE = "refresh_token";
export const HOUR_REVALIDATE = 60 * 60;
export const SHORT_REVALIDATE = 60;

// Terminal constants
export const HOST = "revolution";
export const WELCOME_MESSAGE = `
$$$$$$$\\                                $$\\             $$\\     $$\\                     
$$  __$$\\                               $$ |            $$ |    \\__|                    
$$ |  $$ | $$$$$$\\ $$\\    $$\\  $$$$$$\\  $$ |$$\\   $$\\ $$$$$$\\   $$\\  $$$$$$\\  $$$$$$$\\  
$$$$$$$  |$$  __$$\\\\$$\\  $$  |$$  __$$\\ $$ |$$ |  $$ |\\_$$  _|  $$ |$$  __$$\\ $$  __$$\\ 
$$  __$$< $$$$$$$$ |\\$$\\$$  / $$ /  $$ |$$ |$$ |  $$ |  $$ |    $$ |$$ /  $$ |$$ |  $$ |
$$ |  $$ |$$   ____| \\$$$  /  $$ |  $$ |$$ |$$ |  $$ |  $$ |$$\\ $$ |$$ |  $$ |$$ |  $$ |
$$ |  $$ |\\$$$$$$$\\   \\$  /   \\$$$$$$  |$$ |\\$$$$$$  |  \\$$$$  |$$ |\\$$$$$$  |$$ |  $$ |
\\__|  \\__| \\_______|   \\_/     \\______/ \\__| \\______/    \\____/ \\__| \\______/ \\__|  \\__|
 \n
Welcome to my website! Type 'help' to get started.
`;
