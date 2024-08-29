use crate::domain::models::authentication::AuthError;
use crate::handlers::authentication::{LoginRequest, LoginResponse};
use crate::infra::repositories::{authentication_repository, user_repository};
use crate::utils::extractors::json_transformer::JsonExtractor;
use crate::AppState;
use axum::extract::State;
use axum::Json;

pub async fn login(
    State(state): State<AppState>,
    JsonExtractor(body): JsonExtractor<LoginRequest>,
) -> Result<Json<LoginResponse>, AuthError> {
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

    let token = authentication_repository::generate_token(user.clone())?;
    
    Ok(Json(LoginResponse {
        id: user.id.unwrap(),
        username: user.username,
        email: user.email,
        access_token: token,
        token_type: "Bearer".to_string(),
    }))
}