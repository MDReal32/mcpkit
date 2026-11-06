use clap::Parser;
use usemcpkit_registry::RegistrySource;
use usemcpkit_servers::cli::{Cli, run};

fn main() {
    let code = run(Cli::parse(), RegistrySource::Published);
    std::process::exit(code);
}
