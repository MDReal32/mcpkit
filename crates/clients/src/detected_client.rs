use crate::client_definition::ClientDefinition;
use std::path::PathBuf;

#[derive(Clone, Debug)]
pub struct DetectedClient {
    pub definition: ClientDefinition,
    pub config_path: PathBuf,
    pub has_entry: bool,
    /// Why the config file could not be read; such a client is shown but cannot be changed.
    pub problem: Option<String>,
}
