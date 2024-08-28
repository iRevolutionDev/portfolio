use crate::domain::models::post::PostError;
use crate::handlers::posts::PostResponse;
use crate::infra::repositories::post_repository;
use crate::utils::extractors::path_extractor::PathExtractor;
use crate::AppState;
use axum::extract::State;
use axum::Json;

pub async fn get_post(
    State(state): State<AppState>,
    PathExtractor(post_id): PathExtractor<i32>,
) -> Result<Json<PostResponse>, PostError> {
    let post = post_repository::get(&state.pool, post_id)
        .await
        .map_err(|_| PostError::NotFound("Post not found".to_string()))?;

    let response = PostResponse {
        id: post.id,
        title: post.title,
        content: post.content,
        user_id: post.user_id,
        published: post.published,
        created_at: post.created_at,
        updated_at: post.updated_at,
    };

    Ok(Json(response))
}