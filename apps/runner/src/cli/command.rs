use crate::cli::output::describe_program;
use clap::{Args, Parser, Subcommand};
use std::path::PathBuf;

#[derive(Debug, Parser)]
#[command(
    name = "usemcpkit",
    version,
    about = "Many MCP servers in one tool (no command means install)",
    after_help = describe_program(),
    args_conflicts_with_subcommands = true
)]
pub struct Cli {
    #[command(subcommand)]
    pub command: Option<Command>,
    #[command(flatten)]
    pub install: InstallArgs,
}

#[derive(Debug, Subcommand)]
pub enum Command {
    /// Add usemcpkit to the AI clients found on this computer (asks which)
    Install(InstallArgs),
    /// Remove the usemcpkit entry from clients
    Uninstall(ClientSelection),
    /// Update the cached manifests, then replace the installed binary with the latest release
    Upgrade,
    /// Run an MCP server over stdio (all servers if none given)
    Serve {
        /// Server ids or names, for example git:github or jira
        servers: Vec<String>,
        /// The server binary to run and watch, instead of usemcpkit-servers next to this binary
        #[arg(long, env = crate::cli::consts::SERVER_BINARY_ENV)]
        server: Option<PathBuf>,
        /// Internal: run as the worker of a supervising serve, which an older usemcpkit that already runs starts when this
        /// binary replaces it
        #[arg(long, hide = true)]
        worker: bool,
    },
    /// List available servers; their tools are listed when the client opens them
    List,
    /// Refresh the registry index and the manifests already cached; servers you have not used are not downloaded
    Update {
        /// Registry base URL (default: USEMCPKIT_REGISTRY, else the usemcpkit registry)
        #[arg(long)]
        registry: Option<String>,
    },
}

/// How `install` and `uninstall` pick clients: `clients` is a comma-separated id list.
#[derive(Debug, Default, Args)]
pub struct ClientSelection {
    /// Every detected client, no questions
    #[arg(long)]
    pub all: bool,
    /// Only these clients, comma-separated ids
    #[arg(long)]
    pub clients: Option<String>,
}

#[derive(Debug, Default, Args)]
pub struct InstallArgs {
    #[command(flatten)]
    pub selection: ClientSelection,
    /// Install this usemcpkit binary (with usemcpkit-servers next to it) instead of the running one
    #[arg(long)]
    pub binary: Option<PathBuf>,
    /// Beta: list one tool per server and load its tools when the model opens it (`--partial-loading=false` lists every
    /// tool, the default); without it install asks
    #[arg(long, num_args = 0..=1, default_missing_value = "true", require_equals = true)]
    pub partial_loading: Option<bool>,
}
