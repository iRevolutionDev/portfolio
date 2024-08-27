use crate::domain::models::user::User;
use sqlx::Error;

pub async fn find_by_email(pool: &sqlx::PgPool, email: &str) -> Result<Option<User>, Error> {
    let user = sqlx::query_as!(
        User,
        r#"
        SELECT * FROM users WHERE email = $1
        "#,
        email
    )
        .fetch_optional(pool)
        .await?;

    Ok(user)
}

pub async fn create(pool: &sqlx::PgPool, username: String, email: String, password: String) -> Result<User, Error> {
    let mut user = User {
        id: None,
        username,
        email,
        password,
        created_at: None,
        updated_at: None,
    };
    
    user.hash_password()
        .expect("Failed to hash password");
    
    let user = sqlx::query_as!(
        User,
        r#"
        INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *
        "#,
        user.username,
        user.email,
        user.password
    )
        .fetch_one(pool)
        .await?;
    
    Ok(user)
}