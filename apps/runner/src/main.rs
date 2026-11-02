use clap::Parser;
use mcpkit_runner::cli::{Cli, run};

fn main() {
    let code = run(Cli::parse());
    std::process::exit(code);
}
