//! The Node.js addon of `@usemcpkit/native`: what `usemcpkit-validation` checks, for the TypeScript build of the
//! registry.

mod is_valid_manifest;
mod validate_manifest;

pub use is_valid_manifest::is_valid_manifest;
pub use validate_manifest::validate_manifest;
