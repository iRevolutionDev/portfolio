use crate::infra::errors::InfraError;
use axum::body::Body;
use axum::response::IntoResponse;
use axum::Json;
use serde_json::json;
use sqlx::types::chrono::{DateTime, Utc};
use sqlx::FromRow;

#[derive(Debug, Clone, FromRow)]
pub struct Post {
    pub id: i32,
    pub title: String,
    pub content: String,
    pub user_id: i32,
    pub published: Option<bool>,
    pub created_at: Option<DateTime<Utc>>,
    pub updated_at: Option<DateTime<Utc>>,
}

#[derive(Debug)]
pub enum PostError {
    NotFound(String),
    InternalServerError,
    InfraError(InfraError),
}

impl IntoResponse for PostError {
    fn into_response(self) -> axum::http::Response<Body> {
        let (status, message) = match self {
            PostError::NotFound(message) => (axum::http::StatusCode::NOT_FOUND, message),
            PostError::InternalServerError => (axum::http::StatusCode::INTERNAL_SERVER_ERROR, "Internal server error".to_string()),
            PostError::InfraError(error) => match error {
                InfraError::NotFound => (axum::http::StatusCode::NOT_FOUND, "Not found".to_string()),
                InfraError::InternalServerError => (axum::http::StatusCode::INTERNAL_SERVER_ERROR, "Internal server error".to_string()),
            }
        };

        (status, Json(json!({
            "message": message
        }))).into_response()
    }
}