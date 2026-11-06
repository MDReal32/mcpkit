use std::collections::BTreeMap;

/// The program a client starts usemcpkit with.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct LaunchCommand {
    pub command: String,
    pub args: Vec<String>,
    /// Environment variables the client sets for it; an empty map writes no `env` key.
    pub env: BTreeMap<String, String>,
}
