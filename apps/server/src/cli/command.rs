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
    /// Run an MCP server over stdio (all servers if none given)
    Serve {
        /// Server ids or names, for example git:github or jira
        servers: Vec<String>,
        /// Internal: run as the worker of a supervising serve. The server always does; the flag is accepted because
        /// the runner starts every worker with it.
        #[arg(long)]
        worker: bool,
    },
    /// Internal: show a local credentials page in a native window until it closes
    Window {
        /// The loopback URL of the page
        url: String,
    },
}
