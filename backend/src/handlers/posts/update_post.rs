use crate::domain::models::authentication::Claims;
use crate::domain::models::post::PostError;
use crate::handlers::posts::{PostResponse, UpdatePostRequest};
use crate::infra::repositories::post_repository::NewDbPost;
use crate::infra::repositories::{post_repository, user_repository};
use crate::utils::extractors::json_transformer::JsonExtractor;
use crate::utils::extractors::path_extractor::PathExtractor;
use crate::AppState;
use axum::extract::State;
use axum::Json;

pub async fn update_post(
    claims: Claims,
    State(state): State<AppState>,
    PathExtractor(post_id): PathExtractor<i32>,
    JsonExtractor(post): JsonExtractor<UpdatePostRequest>,
) -> Result<Json<PostResponse>, PostError> {
    let updated_post = post_repository::update(&state.pool, post_id, NewDbPost {
        title: post.title,
        content: post.content,
        image_url: post.image_url,
        user_id: claims.id,
        published: post.published.unwrap_or(false),
    })
        .await
        .map_err(|_| PostError::InternalServerError)?;

    let user = user_repository::get(&state.pool, updated_post.user_id)
        .await
        .map_err(|_| PostError::NotFound("User not found".to_string()))?;

    let response = PostResponse {
        id: updated_post.id,
        title: updated_post.title,
        content: updated_post.content,
        author: user.username,
        image_url: updated_post.image_url,
        published: updated_post.published,
        created_at: updated_post.created_at,
        updated_at: updated_post.updated_at,
    };

    Ok(Json(response))
}