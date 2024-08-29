mod domain;
mod routes;
mod infra;
mod handlers;
mod utils;
mod errors;

use crate::routes::app_router;
use shuttle_runtime::SecretStore;
use sqlx::PgPool;

#[derive(Clone)]
pub struct AppState {
    pool: PgPool,
}

#[shuttle_runtime::main]
async fn main(
    #[shuttle_shared_db::Postgres()] pool: PgPool,
    #[shuttle_runtime::Secrets()] secrets: SecretStore,
) -> shuttle_axum::ShuttleAxum {
    // init_tracing();

    init_vars(secrets);

    run_migrations(&pool).await;

    let state = AppState { pool };

    let app = app_router(state.clone()).with_state(state);

    Ok(app.into())
}

fn init_tracing() {
    use tracing_subscriber::prelude::*;
    use tracing_subscriber::fmt::format::FmtSpan;

    let fmt_layer = tracing_subscriber::fmt::layer()
        .with_target(false)
        .with_span_events(FmtSpan::CLOSE)
        .with_ansi(false);

    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::from_default_env())
        .with(fmt_layer)
        .init();
}

async fn run_migrations(pool: &PgPool) {
    sqlx::migrate!()
        .run(pool)
        .await
        .expect("Failed to run migrations");
}

fn init_vars(secrets: SecretStore) {
    let jwt_secret = secrets.get("JWT_SECRET").expect("JWT_SECRET not found");

    std::env::set_var("JWT_SECRET", jwt_secret);
}