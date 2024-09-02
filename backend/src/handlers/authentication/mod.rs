use crate::domain::models::user::User;

pub use login::login;
pub use register::register;

use serde::{Deserialize, Serialize};

pub mod login;
pub mod token;
pub mod register;

#[derive(Debug, Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize)]
pub struct LoginResponse {
    pub id: i32,
    pub username: String,
    pub email: String,
    pub access_token: String,
    pub token_type: String,
}

#[derive(Debug, Deserialize)]
pub struct RegisterRequest {
    pub username: String,
    pub email: String,
    pub password: String,
    pub key: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RegisterResponse {
    pub user: User,
}