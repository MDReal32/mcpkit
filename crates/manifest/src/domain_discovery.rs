use crate::port_source::PortSource;
use serde::{Deserialize, Serialize};

/// Finds the domain of a program that picks its port when it starts, such as an IDE's MCP server, so the host needs
/// no question: the domain is `host:port` with the first port a source yields.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct DomainDiscovery {
    /// The host the port belongs to, such as `127.0.0.1`.
    pub host: String,
    /// Tried in order.
    pub ports: Vec<PortSource>,
}
