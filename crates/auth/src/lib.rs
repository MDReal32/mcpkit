//! The Rust port of `@usemcpkit/core` `auth/`: every file it reads and writes stays readable by the TypeScript CLI.

pub mod config;
pub mod domain;
pub mod oauth;
pub mod project;
pub mod resolve;
pub mod secret_file;
pub mod token_store;
pub mod ui;

mod auth_context;
mod auth_error;
mod auth_resolution;
mod auth_state;
mod consts;
mod files;
mod json;
mod resolved_auth;
mod secret_owner;
mod secret_store;
mod server_key;

pub use auth_context::AuthContext;
pub use auth_error::AuthError;
pub use auth_resolution::AuthResolution;
pub use auth_state::AuthState;
pub use consts::DEFAULT_HOST_KEY;
pub use resolved_auth::ResolvedAuth;
pub use secret_owner::SecretOwner;
pub use secret_store::SecretStore;
pub use server_key::ServerKey;
