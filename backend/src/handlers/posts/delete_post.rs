use axum::extract::State;
use axum::Json;
use crate::AppState;
use crate::domain::models::authentication::Claims;
use crate::domain::models::post::PostError;
use crate::handlers::posts::{DeletePostResponse};
use crate::infra::repositories::post_repository;
use crate::utils::extractors::path_extractor::PathExtractor;

pub async fn delete_post(
    _: Claims,
    State(state): State<AppState>,
    PathExtractor(post_id): PathExtractor<i32>,
) -> Result<Json<DeletePostResponse>, PostError> {
    post_repository::delete(&state.pool, post_id)
        .await
        .map_err(|_| PostError::InternalServerError)?;
    
    let response = DeletePostResponse {
        message: "Post deleted successfully".to_string(),
    };
    
    Ok(Json(response))
}