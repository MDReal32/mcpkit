mod consts;
mod detect_process_role;
mod process_role;

use crate::consts::REGISTRY_FILES;
use crate::detect_process_role::detect_process_role;
use crate::process_role::ProcessRole;
use clap::Parser;
use std::ffi::OsString;
use usemcpkit_registry::{EmbeddedRegistry, RegistrySource};
use usemcpkit_runner::cli::Distribution;

fn main() {
    let registry = EmbeddedRegistry::new(REGISTRY_FILES);
    let args: Vec<OsString> = std::env::args_os().collect();
    let code = match detect_process_role(&args) {
        ProcessRole::Server => usemcpkit_servers::cli::run(
            usemcpkit_servers::cli::Cli::parse_from(args),
            RegistrySource::Embedded(registry),
        ),
        ProcessRole::Runner => usemcpkit_runner::cli::run(
            usemcpkit_runner::cli::Cli::parse_from(args),
            Distribution::dev(registry),
        ),
    };
    std::process::exit(code);
}
