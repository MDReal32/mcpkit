//! The registry as the CLI keeps it: a light `index.json` synced into `~/.usemcpkit/manifests`, and manifests and parts
//! downloaded only when a server or group is opened, each verified by the sha256 its index or shell lists. Opening a
//! server never asks the registry; only a download that fails its checksum fetches the index again, once.

mod cache;
mod catalog;
mod consts;
mod ids;
mod local;
mod open_registry_context;
mod registry_context;
mod registry_error;
mod registry_source;
mod remote;
mod sync;
mod warn_on_stderr;

pub use catalog::{load_group_manifest, load_groups, load_manifest};
pub use consts::{
    DEFAULT_REGISTRY_URL, EMBEDDED_REGISTRY_URL, REGISTRY_ENV, REGISTRY_VERSION_DIR, TOOL_NAME_SEPARATOR,
};
pub use local::{read_cached_index, resolve_user_dir};
pub use open_registry_context::open_registry_context;
pub use registry_context::RegistryContext;
pub use registry_error::RegistryError;
pub use registry_source::RegistrySource;
pub use remote::{EmbeddedRegistry, Fetch, HttpFetcher, RegistryFetcher, resolve_registry_url};
pub use sync::{SyncFailure, SyncReport, ensure_manifest_index, sync_registry};
pub use warn_on_stderr::warn_on_stderr;
