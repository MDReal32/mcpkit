//! Shared test fixtures, like `@usemcpkit/testing` and `packages/core/test/fixtures`.

mod approve_sign_in;
mod consts;
mod demo_manifest;
mod fixed_client;
mod json_response;
mod ping_manifest;
mod recording_client;
mod route_client;
mod token_checking_client;
mod updates_goldens;
mod write_golden;

pub use approve_sign_in::approve_sign_in;
pub use consts::{DEMO_TOKEN_URL, PING_URL, UPDATE_GOLDENS_ENV};
pub use demo_manifest::{demo_manifest, demo_oauth};
pub use fixed_client::FixedClient;
pub use json_response::json_response;
pub use ping_manifest::ping_manifest;
pub use recording_client::RecordingClient;
pub use route_client::RouteClient;
pub use token_checking_client::TokenCheckingClient;
pub use updates_goldens::updates_goldens;
pub use write_golden::write_golden;
