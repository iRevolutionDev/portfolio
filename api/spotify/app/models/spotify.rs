use serde_derive::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct CurrentPlaying {
    pub item: Option<Item>,
    pub progress_ms: Option<i64>,
    pub is_playing: Option<bool>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Item {
    pub name: String,
    pub artists: Vec<Artist>,
    pub album: Album,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Artist {
    pub name: String,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Album {
    pub name: String,
    pub images: Vec<Image>,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Image {
    pub url: String,
    pub width: i64,
    pub height: i64,
}

#[derive(Serialize, Deserialize, Clone)]
pub struct AccessToken {
    pub access_token: String,
    pub token_type: String,
    pub expires_in: i64,
    pub scope: String,
}

#[derive(Serialize, Deserialize)]
pub struct SpotifyError {
    pub error: String,
}