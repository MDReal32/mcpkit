mod cli;
mod window;

use crate::cli::Cli;
use crate::window::{read_form_launch, run_form_window};
use clap::Parser;
use std::io::stdin;
use std::process::ExitCode;

fn main() -> ExitCode {
    let cli = Cli::parse();
    let opened = read_form_launch(&cli.url, stdin()).and_then(run_form_window);
    match opened {
        Ok(()) => ExitCode::SUCCESS,
        Err(error) => {
            eprintln!("usemcpkit: cannot open the form window: {error}");
            ExitCode::FAILURE
        }
    }
}
