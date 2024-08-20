use app::services::spotify_service::{SpotifyService, SPOTIFY_SERVICE};
use tokio::sync::Mutex;
use vercel_runtime::{process_request, process_response, run_service, service_fn, Body, Error, Request, Response, ServiceBuilder};

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::DEBUG)
        .with_target(false)
        .init();

    let handler = ServiceBuilder::new()
        .map_request(process_request)
        .map_response(process_response)
        .service(service_fn(handler));

    run_service(handler).await
}

pub async fn handler(_req: Request) -> Result<Response<Body>, Error> {
    let mut spotify_service = SPOTIFY_SERVICE.get_or_init(|| {
        Mutex::new(SpotifyService::new())
    }).lock().await;

    let player_info = spotify_service.get_current_playing().await;

    Ok(Response::builder()
        .header("Content-Type", "application/json")
        .body(serde_json::to_string(&player_info).unwrap().into())
        .unwrap())
}