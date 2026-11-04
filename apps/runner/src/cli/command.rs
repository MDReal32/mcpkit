use clap::{Parser, Subcommand};
use std::path::PathBuf;

#[derive(Debug, Parser)]
#[command(name = "mcpkit", version, about = "Many MCP servers in one tool")]
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
        /// The server binary to run and watch, instead of mcpkit-server next to this binary
        #[arg(long, env = crate::cli::consts::SERVER_BINARY_ENV)]
        server: Option<PathBuf>,
        /// Internal: run as the worker of a supervising serve, which an older mcpkit that already runs starts when this
        /// binary replaces it
        #[arg(long, hide = true)]
        worker: bool,
    },
}
