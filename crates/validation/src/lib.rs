//! What a manifest must hold beyond its JSON shape, checked on the JSON itself because a manifest can be downloaded:
//! every error message and its order are those of the TypeScript `validateManifest` of `0.9.0`.

mod auth;
mod find_duplicates;
mod guards;
mod is_strictly_equal;
mod is_valid_manifest;
mod openapi;
mod server;
mod tool;
mod ui;
mod validate_manifest;

pub use is_valid_manifest::is_valid_manifest;
pub use validate_manifest::validate_manifest;
