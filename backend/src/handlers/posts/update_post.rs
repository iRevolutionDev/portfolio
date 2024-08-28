use axum::extract::State;
use axum::Json;
use crate::AppState;
use crate::domain::models::authentication::Claims;
use crate::domain::models::post::PostError;
use crate::handlers::posts::{PostResponse, UpdatePostRequest};
use crate::infra::repositories::post_repository;
use crate::infra::repositories::post_repository::NewDbPost;
use crate::utils::extractors::json_transformer::JsonExtractor;
use crate::utils::extractors::path_extractor::PathExtractor;

pub async fn update_post(
    claims: Claims,
    State(state): State<AppState>,
    PathExtractor(post_id): PathExtractor<i32>,
    JsonExtractor(post): JsonExtractor<UpdatePostRequest>,
) -> Result<Json<PostResponse>, PostError> {
    let updated_post = post_repository::update(&state.pool, post_id, NewDbPost {
        title: post.title,
        content: post.content,
        user_id: claims.id,
        published: post.published.unwrap_or(false),
    })
        .await
        .map_err(|_| PostError::InternalServerError)?;

    let response = PostResponse {
        id: updated_post.id,
        title: updated_post.title,
        content: updated_post.content,
        user_id: updated_post.user_id,
        published: updated_post.published,
        created_at: updated_post.created_at,
        updated_at: updated_post.updated_at,
    };

    Ok(Json(response))
}