use crate::cli::command::{Cli, Command};
use crate::cli::commands::{
    install_command, list_command, serve_command, serve_worker_command, uninstall_command, update_command,
    upgrade_command,
};

pub fn run(cli: Cli) -> i32 {
    let Some(command) = cli.command else {
        return install_command(cli.install);
    };
    match command {
        Command::Install(args) => install_command(args),
        Command::Uninstall(selection) => uninstall_command(selection),
        Command::Upgrade => upgrade_command(),
        Command::Serve {
            servers,
            server,
            worker: true,
        } => serve_worker_command(servers, server),
        Command::Serve { servers, server, .. } => serve_command(servers, server),
        Command::List => list_command(),
        Command::Update { registry } => update_command(registry),
    }
}
