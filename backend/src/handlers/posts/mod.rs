use serde::{Deserialize, Serialize};
use sqlx::types::chrono::{DateTime, Utc};

pub use create_post::create_post;
pub use delete_post::delete_post;
pub use get_post::get_post;
pub use list_posts::list_posts;
pub use update_post::update_post;

mod create_post;
mod get_post;
mod delete_post;
mod list_posts;
mod update_post;

#[derive(Debug, Deserialize)]
pub struct CreatePostRequest {
    title: String,
    content: String,
}

#[derive(Debug, Deserialize)]
pub struct UpdatePostRequest {
    title: String,
    content: String,
    published: Option<bool>,
}

#[derive(Debug, Serialize)]
pub struct DeletePostResponse {
    message: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PostResponse {
    id: i32,
    title: String,
    content: String,
    user_id: i32,
    published: Option<bool>,
    created_at: Option<DateTime<Utc>>,
    updated_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ListPostsResponse {
    posts: Vec<PostResponse>,
}