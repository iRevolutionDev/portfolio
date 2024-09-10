use crate::domain::models::post::PostError;
use crate::handlers::posts::{ListPostsResponse, PostResponse};
use crate::infra::repositories::post_repository::PostFilter;
use crate::infra::repositories::{post_repository, user_repository};
use crate::AppState;
use axum::extract::{Query, State};
use axum::Json;

pub async fn list_posts(
    State(state): State<AppState>,
    Query(query): Query<PostFilter>,
) -> Result<Json<ListPostsResponse>, PostError> {
    let posts = post_repository::get_all(&state.pool, query)
        .await
        .map_err(|_| PostError::InternalServerError)?;

    let mut posts_response = vec![];

    for post in posts {
        let user = user_repository::get(&state.pool, post.user_id)
            .await
            .map_err(|_| PostError::NotFound("User not found".to_string()))?;

        let post_response = PostResponse {
            id: post.id,
            title: post.title,
            content: post.content,
            author: user.username,
            image_url: post.image_url,
            published: post.published,
            created_at: post.created_at,
            updated_at: post.updated_at,
        };

        posts_response.push(post_response);
    }

    let response = ListPostsResponse {
        posts: posts_response,
    };

    Ok(Json(response))
}