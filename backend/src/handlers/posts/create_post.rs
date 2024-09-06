use crate::domain::models::authentication::Claims;
use crate::domain::models::post::PostError;
use crate::handlers::posts::{CreatePostRequest, PostResponse};
use crate::infra::repositories::post_repository::NewDbPost;
use crate::infra::repositories::{post_repository, user_repository};
use crate::utils::extractors::json_transformer::JsonExtractor;
use crate::AppState;
use axum::extract::State;
use axum::Json;

pub async fn create_post(
    claims: Claims,
    State(state): State<AppState>,
    JsonExtractor(post): JsonExtractor<CreatePostRequest>,
) -> Result<Json<PostResponse>, PostError> {
    let created_post = post_repository::create(&state.pool, NewDbPost {
        title: post.title,
        content: post.content,
        user_id: claims.id,
        published: false,
    })
        .await
        .map_err(|_| PostError::InternalServerError)?;

    let user = user_repository::get(&state.pool, created_post.user_id)
        .await
        .map_err(|_| PostError::NotFound("User not found".to_string()))?;

    let response = PostResponse {
        id: created_post.id,
        title: created_post.title,
        content: created_post.content,
        author: user.username,
        published: created_post.published,
        created_at: created_post.created_at,
        updated_at: created_post.updated_at,
    };

    Ok(Json(response))
}