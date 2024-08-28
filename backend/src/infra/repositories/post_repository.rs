use crate::domain::models::post::{Post, PostError};
use serde::Deserialize;

pub struct NewDbPost {
    pub title: String,
    pub content: String,
    pub user_id: i32,
    pub published: bool,
}

#[derive(Deserialize)]
pub struct PostFilter {
    pub title: Option<String>,
    pub content: Option<String>,
    pub max_results: Option<i64>,
    pub offset: Option<i64>,
}

pub async fn create(pool: &sqlx::PgPool, post: NewDbPost) -> Result<Post, PostError> {
    let post = sqlx::query_as!(
        Post,
        r#"
        INSERT INTO posts (title, content, user_id, published) VALUES ($1, $2, $3, $4) RETURNING *
        "#,
        post.title,
        post.content,
        post.user_id,
        post.published
    )
        .fetch_one(pool)
        .await
        .map_err(|_| PostError::InternalServerError)?;

    Ok(post)
}

pub async fn get(pool: &sqlx::PgPool, post_id: i32) -> Result<Post, PostError> {
    let post = sqlx::query_as!(
        Post,
        r#"
        SELECT * FROM posts WHERE id = $1
        "#,
        post_id
    )
        .fetch_one(pool)
        .await
        .map_err(|_| PostError::NotFound("Post not found".to_string()))?;

    Ok(post)
}

pub async fn update(pool: &sqlx::PgPool, post_id: i32, post: NewDbPost) -> Result<Post, PostError> {
    let post = sqlx::query_as!(
        Post,
        r#"
        UPDATE posts SET title = $1, content = $2, user_id = $3, published = $4 WHERE id = $5 RETURNING *
        "#,
        post.title,
        post.content,
        post.user_id,
        post.published,
        post_id
    )
        .fetch_one(pool)
        .await
        .map_err(|_| PostError::NotFound("Post not found".to_string()))?;

    Ok(post)
}

pub async fn delete(pool: &sqlx::PgPool, post_id: i32) -> Result<(), PostError> {
    sqlx::query!(
        r#"
        DELETE FROM posts WHERE id = $1
        "#,
        post_id
    )
        .execute(pool)
        .await
        .map_err(|_| PostError::NotFound("Post not found".to_string()))?;

    Ok(())
}

pub async fn get_all(pool: &sqlx::PgPool, filter: PostFilter) -> Result<Vec<Post>, PostError> {
    let posts = sqlx::query_as!(
        Post,
        r#"
        SELECT * FROM posts
        WHERE ($1::text IS NULL OR title ILIKE $1)
        AND ($2::text IS NULL OR content ILIKE $2)
        LIMIT $3 OFFSET $4
        "#,
        filter.title,
        filter.content,
        filter.max_results.unwrap_or(10),
        filter.offset.unwrap_or(0)
    )
        .fetch_all(pool)
        .await
        .map_err(|_| PostError::InternalServerError)?;

    Ok(posts)
}