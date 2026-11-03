//! The Rust port of `@usemcpkit/core` `auth/`: every file it reads and writes stays readable by the TypeScript CLI.

mod auth_error;
mod resolved_auth;

pub use auth_error::AuthError;
pub use resolved_auth::ResolvedAuth;
