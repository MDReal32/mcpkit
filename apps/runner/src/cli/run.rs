use crate::cli::command::{Cli, Command};
use crate::cli::commands::{
    install_command, list_command, serve_command, serve_worker_command, uninstall_command, update_command,
    upgrade_command,
};
use crate::cli::distribution::Distribution;

pub fn run(cli: Cli, distribution: Distribution) -> i32 {
    let Some(command) = cli.command else {
        return install_command(cli.install, distribution);
    };
    match command {
        Command::Install(args) => install_command(args, distribution),
        Command::Uninstall(selection) => uninstall_command(selection, distribution),
        Command::Upgrade => upgrade_command(distribution),
        Command::Serve {
            servers,
            server,
            worker: true,
        } => serve_worker_command(servers, server, distribution),
        Command::Serve { servers, server, .. } => serve_command(servers, server, distribution),
        Command::List => list_command(distribution),
        Command::Update { registry } => update_command(registry, distribution),
    }
}
