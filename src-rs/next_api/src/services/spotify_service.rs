use crate::models::spotify::{AccessToken, CurrentPlaying, SpotifyError};
use base64::engine::general_purpose::STANDARD;
use base64::Engine;
use once_cell::sync::OnceCell;
use tokio::sync::Mutex;
use vercel_runtime::Error;

const SPOTIFY_TOKEN_ENDPOINT: &str = "https://accounts.spotify.com/api/token";
const SPOTIFY_CURRENT_PLAYING_ENDPOINT: &str = "https://api.spotify.com/v1/me/player/currently-playing";

#[derive(Debug)]
pub struct TokenCache {
    pub access_token: String,
    pub expires_at: i64,
}

#[derive(Debug, Clone)]
pub struct CurrentPlayingCache {
    pub current_playing: Option<CurrentPlaying>,
    pub expires_at: i64,
}

#[derive(Debug)]
pub struct SpotifyService {
    token_endpoint: String,
    refresh_token: String,
    client_id: String,
    secret_key: String,
    encoded_client_id: Option<String>,
    token_cache: Option<TokenCache>,
    current_playing_cache: Option<CurrentPlayingCache>,
}


impl Default for SpotifyService {
    fn default() -> Self {
        Self::new()
    }
}

impl SpotifyService {
    pub fn new() -> Self {
        SpotifyService {
            token_endpoint: SPOTIFY_TOKEN_ENDPOINT.to_string(),
            refresh_token: std::env::var("SPOTIFY_REFRESH_TOKEN").unwrap(),
            client_id: std::env::var("SPOTIFY_CLIENT_ID").unwrap(),
            secret_key: std::env::var("SPOTIFY_SECRET_KEY").unwrap(),
            encoded_client_id: None,
            token_cache: None,
            current_playing_cache: None,
        }
    }

    pub async fn get_access_token(&mut self) -> Result<String, Error> {
        if let Some(token_cache) = &self.token_cache {
            if token_cache.expires_at > chrono::Utc::now().timestamp() {
                return Ok(token_cache.access_token.clone());
            }
        }

        let encoded_client_id = match &self.encoded_client_id {
            Some(encoded_client_id) => encoded_client_id.clone(),
            None => STANDARD.encode(format!("{}:{}", self.client_id, self.secret_key))
        };

        let client = reqwest::Client::new();
        let res = client
            .post(&self.token_endpoint)
            .header("Content-Type", "application/x-www-form-urlencoded")
            .header("Authorization", format!("Basic {}", encoded_client_id))
            .form(&[
                ("grant_type", "refresh_token"),
                ("refresh_token", &self.refresh_token),
            ])
            .send()
            .await
            .unwrap();

        if res.status().is_client_error() {
            let body = res.text().await.unwrap();
            let error: SpotifyError = serde_json::from_str(&body).unwrap();

            return Err(Error::from(error.error));
        }

        let body = res.text().await.unwrap();
        let token: AccessToken = serde_json::from_str(&body).unwrap();

        self.token_cache = Some(TokenCache {
            access_token: token.access_token.clone(),
            expires_at: chrono::Utc::now().timestamp() + token.expires_in,
        });

        Ok(token.access_token)
    }

    pub async fn get_current_playing(&mut self) -> CurrentPlaying {
        if let Some(current_playing_cache) = &self.current_playing_cache {
            if current_playing_cache.expires_at > chrono::Utc::now().timestamp() {
                return current_playing_cache.current_playing.clone().unwrap();
            }
        }

        let access_token = self.get_access_token().await.unwrap();

        let client = reqwest::Client::new();
        let res = client
            .get(SPOTIFY_CURRENT_PLAYING_ENDPOINT)
            .header("Authorization", format!("Bearer {}", access_token))
            .send()
            .await
            .unwrap();

        if res.status().is_client_error() {
            return CurrentPlaying {
                item: None,
                progress_ms: None,
                is_playing: Option::from(false),
            };
        }

        let body = res.text().await.unwrap();
        let current_playing: CurrentPlaying = serde_json::from_str(&body)
            .map_or(CurrentPlaying {
                item: None,
                progress_ms: None,
                is_playing: Option::from(false),
            }, |v| v);

        self.current_playing_cache = Some(CurrentPlayingCache {
            current_playing: Some(current_playing.clone()),
            expires_at: chrono::Utc::now().timestamp() + 60,
        });

        current_playing
    }
}

pub static SPOTIFY_SERVICE: OnceCell<Mutex<SpotifyService>> = OnceCell::new();