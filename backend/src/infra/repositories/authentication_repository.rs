use crate::domain::models::authentication::{AuthError, Claims};
use crate::domain::models::user::User;
use axum::extract::FromRequestParts;
use axum::http::request::Parts;
use axum::{async_trait, RequestPartsExt};
use axum_extra::headers::authorization::Bearer;
use axum_extra::headers::Authorization;
use axum_extra::TypedHeader;
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use once_cell::sync::Lazy;
use std::time::SystemTime;

static KEYS: Lazy<Keys> = Lazy::new(|| {
    let secret = std::env::var("JWT_SECRET").expect("JWT_SECRET must be set");
    Keys::new(secret.as_bytes())
});

pub struct Keys {
    pub encoding: EncodingKey,
    pub decoding: DecodingKey,
}

impl Keys {
    pub fn new(secret: &[u8]) -> Self {
        Self {
            encoding: EncodingKey::from_secret(secret),
            decoding: DecodingKey::from_secret(secret),
        }
    }
}

#[async_trait]
impl<S> FromRequestParts<S> for Claims
where
    S: Send + Sync,
{
    type Rejection = AuthError;

    async fn from_request_parts(parts: &mut Parts, _state: &S) -> Result<Self, Self::Rejection> {
        let TypedHeader(Authorization(bearer)) = parts
            .extract::<TypedHeader<Authorization<Bearer>>>()
            .await
            .map_err(|_| AuthError::InvalidToken)?;

        let token_data = decode::<Claims>(bearer.token(), &KEYS.decoding, &Validation::default())
            .map_err(|_| AuthError::InvalidToken)?;

        Ok(token_data.claims)
    }
}

pub fn get_keys() -> &'static Keys {
    &KEYS
}

pub fn generate_token(user: User) -> Result<String, AuthError> {
    let exp = SystemTime::now()
        .duration_since(SystemTime::UNIX_EPOCH)
        .unwrap()
        .as_secs()
        + 60 * 60 * 24 * 7;

    let claims = Claims {
        id: user.id.unwrap(),
        username: user.username,
        email: user.email,
        exp: usize::try_from(exp).unwrap(),
    };

    encode(&Header::default(), &claims, &get_keys().encoding)
        .map_err(|_| AuthError::TokenCreation)
}