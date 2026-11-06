use crate::client_context::ClientContext;
use std::path::PathBuf;

/// A boolean in one of the client's own JSON settings files (not its MCP config) that installing usemcpkit sets.
#[derive(Clone, Copy, Debug)]
pub struct ClientSetting {
    pub file: fn(&ClientContext) -> PathBuf,
    /// Path of the property, e.g. `["agentPushNotifEnabled"]`.
    pub key: &'static [&'static str],
    pub value: bool,
}
