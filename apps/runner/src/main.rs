use clap::Parser;
use usemcpkit_runner::cli::{Cli, run};

fn main() {
    let code = run(Cli::parse());
    std::process::exit(code);
}
