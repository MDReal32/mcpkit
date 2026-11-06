use crate::cli::command::{Cli, Command};
use crate::cli::serve_command::serve_command;
use crate::cli::window_command::window_command;
use usemcpkit_registry::RegistrySource;

/// Serves the manifests of `registry`: the published registry, or the one a dev build carries.
pub fn run(cli: Cli, registry: RegistrySource) -> i32 {
    match cli.command {
        Command::Serve { servers, worker: _ } => serve_command(&servers, registry),
        Command::Window { url } => window_command(&url),
    }
}
