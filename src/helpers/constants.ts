export const {
    NEXT_PUBLIC_SPOTIFY_CLIENT_ID: CLIENT_ID,
    NEXT_PUBLIC_SPOTIFY_SECRET_KEY: SECRET_KEY,
    NEXT_PUBLIC_SPOTIFY_REFRESH_TOKEN: REFRESH_TOKEN,
    NEXT_PUBLIC_URL: WEBSITE_URL,
} = process.env;

export const BASIC = Buffer.from(`${CLIENT_ID}:${SECRET_KEY}`).toString('base64');
export const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
export const PLAYER_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
export const GRANT_TYPE = 'refresh_token';
export const HOUR_REVALIDATE = 60 * 60;
export const SHORT_REVALIDATE = 60;
export const USER = 'revolution';