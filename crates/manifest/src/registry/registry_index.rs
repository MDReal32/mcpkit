use crate::registry::RegistryServer;
use serde::{Deserialize, Serialize};

/// The registry's `index.json`: every server with the link and checksum of its manifest, and no tools.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct RegistryIndex {
    pub servers: Vec<RegistryServer>,
}
