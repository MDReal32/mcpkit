use clap::Parser;
use usemcpkit_runner::cli::{Cli, Distribution, run};

fn main() {
    let code = run(Cli::parse(), Distribution::RELEASE);
    std::process::exit(code);
}
