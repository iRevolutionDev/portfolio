use crate::domain::models::authentication::AuthError;
use crate::handlers::authentication::{AuthBody, LoginRequest};
use crate::infra::repositories::{authentication_repository, user_repository};
use crate::utils::extractors::json_transformer::JsonExtractor;
use crate::AppState;
use axum::extract::State;
use axum::Json;

pub async fn login(
    State(state): State<AppState>,
    JsonExtractor(body): JsonExtractor<LoginRequest>,
) -> Result<Json<AuthBody>, AuthError> {
    if body.email.is_empty() || body.password.is_empty() {
        return Err(AuthError::MissingCredentials);
    }

    let user = user_repository::find_by_email(&state.pool, &body.email).await.unwrap();

    if user.is_none() {
        return Err(AuthError::WrongCredentials);
    }

    let user = user.unwrap();
    
    if !user.verify_password(&body.password) {
        return Err(AuthError::WrongCredentials);
    }

    authentication_repository::generate_token(user.clone())
        .map(|token| Json(AuthBody::new(token)))
}