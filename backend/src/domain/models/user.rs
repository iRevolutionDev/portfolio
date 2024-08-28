use crate::infra::errors::InfraError;
use argon2::password_hash::rand_core::OsRng;
use argon2::password_hash::SaltString;
use argon2::{Argon2, PasswordHash, PasswordHasher, PasswordVerifier};
use axum::body::Body;
use axum::response::IntoResponse;
use axum::Json;
use serde::{Deserialize, Serialize};
use serde_json::json;
use sqlx::types::chrono::{DateTime, Utc};
use sqlx::FromRow;
use std::fmt;
use std::fmt::{Debug, Formatter};

#[derive(Debug, Serialize, Deserialize, FromRow, PartialEq, Clone)]
pub struct User {
    pub id: Option<i32>,
    pub username: String,
    pub email: String,
    pub password: String,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

pub enum UserError {
    NotFound(String),
    InternalServerError,
    InfraError(InfraError),
}

impl Debug for UserError {
    fn fmt(&self, f: &mut Formatter<'_>) -> fmt::Result {
        match self {
            UserError::NotFound(message) => write!(f, "UserError::NotFound({})", message),
            UserError::InternalServerError => write!(f, "UserError::InternalServerError"),
            UserError::InfraError(error) => write!(f, "UserError::InfraError({:?})", error),
        }
    }
}

impl IntoResponse for UserError {
    fn into_response(self) -> axum::http::Response<Body> {
        let (status, message) = match self {
            UserError::NotFound(message) => (axum::http::StatusCode::NOT_FOUND, message),
            UserError::InternalServerError => (axum::http::StatusCode::INTERNAL_SERVER_ERROR, "Internal server error".to_string()),
            UserError::InfraError(error) => match error {
                InfraError::NotFound => (axum::http::StatusCode::NOT_FOUND, "Not found".to_string()),
                InfraError::InternalServerError => (axum::http::StatusCode::INTERNAL_SERVER_ERROR, "Internal server error".to_string()),
            }
        };

        (status, Json(json!({
            "message": message
        }))).into_response()
    }
}

impl User {
    pub fn hash_password(&mut self) -> Result<String, UserError> {
        let salt = SaltString::generate(&mut OsRng);
        let argon2 = Argon2::default();

        let password_hash = argon2.hash_password(self.password.as_ref(), &salt).map_err(|_| UserError::InternalServerError)?;

        self.password = password_hash.to_string();

        Ok(self.password.clone())
    }

    pub fn verify_password(&self, password: &str) -> bool {
        let parsed_hash = PasswordHash::new(&self.password)
            .expect("Failed to parse password hash");
        
        Argon2::default().verify_password(password.as_ref(), &parsed_hash).is_ok()
    }
}