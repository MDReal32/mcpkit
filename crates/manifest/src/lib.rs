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
mod domain_discovery;
mod domain_spec;
mod edition_spec;
mod env_port_source;
mod log_port_source;
mod manifest;
mod manifest_document;
mod port_source;

pub use applies::Applies;
pub use consts::ORGANIZATION_CATEGORY_PREFIX;
pub use domain_discovery::DomainDiscovery;
pub use domain_spec::DomainSpec;
pub use edition_spec::EditionSpec;
pub use env_port_source::EnvPortSource;
pub use log_port_source::LogPortSource;
pub use manifest::Manifest;
pub use manifest_document::ManifestDocument;
pub use port_source::PortSource;
