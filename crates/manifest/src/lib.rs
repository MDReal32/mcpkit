//! The manifest and registry formats written by `packages/servers`. Every type reads what the TypeScript build writes
//! and writes it back unchanged: optional fields stay absent, and maps keep their order.

pub mod auth;
pub mod condition;
pub mod domain;
pub mod naming;
pub mod openapi;
pub mod registry;
pub mod tool;
pub mod ui;
pub mod upstream;

mod applies;
mod consts;
mod domain_spec;
mod edition_spec;
mod manifest;
mod manifest_document;

pub use applies::Applies;
pub use consts::ORGANIZATION_CATEGORY_PREFIX;
pub use domain_spec::DomainSpec;
pub use edition_spec::EditionSpec;
pub use manifest::Manifest;
pub use manifest_document::ManifestDocument;
