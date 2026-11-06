use crate::cli::consts::{EXIT_FAILURE, WORKER_FLAG};
use crate::cli::run_local::run_local;
use crate::cli::serve::prepare_server_binary;
use std::path::PathBuf;
use std::process::Command;

/// An older supervisor that already runs swaps its worker for whatever binary replaced its own, which is now this
/// runner; such a worker hands the connection on to the server, as its worker on the same stdio, and ends with it.
pub fn serve_worker_command(servers: Vec<String>, server: Option<PathBuf>) -> i32 {
    run_local(async move {
        let command = match prepare_server_binary(server).await {
            Ok(command) => command,
            Err(error) => {
                eprintln!("usemcpkit: {error}");
                return EXIT_FAILURE;
            }
        };
        match Command::new(&command)
            .arg("serve")
            .args(&servers)
            .arg(WORKER_FLAG)
            .status()
        {
            Ok(status) => status.code().unwrap_or(EXIT_FAILURE),
            Err(error) => {
                eprintln!("usemcpkit: cannot run {}: {error}", command.display());
                EXIT_FAILURE
            }
        }
    })
}
