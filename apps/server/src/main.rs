use clap::Parser;
use usemcpkit_servers::cli::{Cli, run};

fn main() {
    let code = run(Cli::parse());
    std::process::exit(code);
}
