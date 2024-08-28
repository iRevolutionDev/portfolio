use crate::handlers::authentication::login;
use crate::handlers::authentication::register::register;
use crate::handlers::posts::{create_post, delete_post, get_post, list_posts, update_post};
use crate::AppState;
use axum::http::StatusCode;
use axum::response::IntoResponse;
use axum::routing::{get, post};
use axum::Router;

pub fn app_router(state: AppState) -> Router<AppState> {
    Router::new()
        .route("/", get(root))
        .nest("/v1/auth", authentication_routes(state.clone()))
        .nest("/v1/posts", posts_routes(state.clone()))
        .fallback(handler_404)
}

async fn root() -> &'static str {
    "Ok :)"
}

async fn handler_404() -> impl IntoResponse {
    (StatusCode::NOT_FOUND, "Not Found")
}

fn authentication_routes(state: AppState) -> Router<AppState> {
    Router::new()
        .route("/login", post(login))
        .route("/register", post(register))
        .with_state(state)
}

fn posts_routes(state: AppState) -> Router<AppState> {
    Router::new()
        .route("/create", post(create_post))
        .route("/delete/:post_id", post(delete_post))
        .route("/update/:post_id", post(update_post))
        .route("/get/:post_id", get(get_post))
        .route("/list", get(list_posts))
        .with_state(state)
}