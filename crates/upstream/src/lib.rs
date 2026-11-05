//! Speaks MCP to the server an upstream manifest fronts: starts it (cloning and setting up its repository first when it
//! runs from one) or reaches it over Streamable HTTP, runs the handshake, and lists and calls its tools.

mod connect_upstream;
mod consts;
mod current_time_millis;
mod session;
mod transport;
mod upstream_connection;
mod upstream_error;
mod upstream_options;
mod warn_on_stderr;

pub mod repo;

pub use connect_upstream::connect_upstream;
pub use upstream_connection::UpstreamConnection;
pub use upstream_error::UpstreamError;
pub use upstream_options::UpstreamOptions;
