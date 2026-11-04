use clap::Parser;
use usemcpkit_server::cli::{Cli, run};

fn main() {
    let code = run(Cli::parse());
    std::process::exit(code);
}
