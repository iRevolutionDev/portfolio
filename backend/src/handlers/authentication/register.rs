use crate::domain::models::user::UserError;
use crate::handlers::authentication::{RegisterRequest, RegisterResponse};
use crate::infra::repositories::user_repository;
use crate::utils::extractors::json_transformer::JsonExtractor;
use crate::AppState;
use axum::extract::State;
use axum::Json;

pub async fn register(State(state): State<AppState>, JsonExtractor(body): JsonExtractor<RegisterRequest>) -> Result<Json<RegisterResponse>, UserError> {
    if body.key != state.secrets.get("REGISTER_KEY").unwrap() {
        return Err(UserError::NotFound("Invalid key".to_string()));
    }

    if body.email.is_empty() || body.password.is_empty() {
        return Err(UserError::NotFound("Email and password are required".to_string()));
    }

    if user_repository::find_by_email(&state.pool, &body.email).await.unwrap().is_some() {
        return Err(UserError::NotFound("User already exists".to_string()));
    }

    let user = user_repository::create(&state.pool, body.username, body.email, body.password).await.unwrap();

    Ok(Json(RegisterResponse {
        user
    }))
}