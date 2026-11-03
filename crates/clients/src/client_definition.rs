use crate::client_context::ClientContext;
use crate::config_format::ConfigFormat;
use crate::launch_command::LaunchCommand;
use serde_json::{Map, Value};
use std::path::PathBuf;

/// One AI client: how to tell it is installed, where its MCP config lives and the entry shape it reads.
#[derive(Clone, Copy, Debug)]
pub struct ClientDefinition {
    pub id: &'static str,
    pub name: &'static str,
    pub format: ConfigFormat,
    /// Paths whose existence means the client is installed for this user.
    pub detect_paths: fn(&ClientContext) -> Vec<PathBuf>,
    pub config_path: fn(&ClientContext) -> PathBuf,
    /// Path of the object that maps server names to entries, e.g. `["mcpServers"]`.
    pub servers_path: &'static [&'static str],
    pub create_entry: fn(&LaunchCommand) -> Map<String, Value>,
}
