use crate::cli::command::{Cli, Command};
use crate::cli::serve_command::serve_command;

pub fn run(cli: Cli) -> i32 {
    match cli.command {
        Command::Serve { servers, server } => serve_command(servers, server),
    }
}
