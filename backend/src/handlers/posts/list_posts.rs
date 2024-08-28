use crate::domain::models::post::PostError;
use crate::handlers::posts::{ListPostsResponse, PostResponse};
use crate::infra::repositories::post_repository;
use crate::AppState;
use axum::extract::{Query, State};
use axum::Json;
use crate::infra::repositories::post_repository::PostFilter;

pub async fn list_posts(
    State(state): State<AppState>,
    Query(query): Query<PostFilter>,
) -> Result<Json<ListPostsResponse>, PostError> {
    let posts = post_repository::get_all(&state.pool, query)
        .await
        .map_err(|_| PostError::InternalServerError)?;
    
    let response = ListPostsResponse {
        posts: posts.into_iter().map(|post| {
            PostResponse {
                id: post.id,
                title: post.title,
                content: post.content,
                user_id: post.user_id,
                published: post.published,
                created_at: post.created_at,
                updated_at: post.updated_at,
            }
        }).collect(),
    };
    
    Ok(Json(response))
}