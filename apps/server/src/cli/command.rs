use clap::{Parser, Subcommand};

#[derive(Debug, Parser)]
#[command(
    name = "mcpkit-server",
    version,
    about = "The mcpkit MCP server, run by the mcpkit runner"
)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Command,
}

#[derive(Debug, Subcommand)]
pub enum Command {
    /// Internal: show a local credentials page in a native window until it closes
    Window {
        /// The loopback URL of the page
        url: String,
    },
}
