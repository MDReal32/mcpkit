//! Shared test fixtures, like `@usemcpkit/testing` and `packages/core/test/fixtures`.

mod consts;
mod demo_manifest;
mod fixed_client;
mod json_response;
mod ping_manifest;
mod recording_client;
mod token_checking_client;

pub use consts::{DEMO_TOKEN_URL, PING_URL};
pub use demo_manifest::{demo_manifest, demo_oauth};
pub use fixed_client::FixedClient;
pub use json_response::json_response;
pub use ping_manifest::ping_manifest;
pub use recording_client::RecordingClient;
pub use token_checking_client::TokenCheckingClient;
