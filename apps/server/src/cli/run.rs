use crate::cli::command::{Cli, Command};
use crate::cli::window_command::window_command;

pub fn run(cli: Cli) -> i32 {
    match cli.command {
        Command::Window { url } => window_command(&url),
    }
}
