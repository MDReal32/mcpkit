use crate::cli::consts::WORKER_FLAG;
use crate::cli::resolve_server_binary::resolve_server_binary;
use crate::supervisor::{SuperviseOptions, WorkerLaunch, supervise_serve};
use mcpkit_wire_log::{WireLog, WireLogRole};
use std::path::PathBuf;
use std::sync::Arc;
use tokio::sync::oneshot;

/// The process the client starts: it keeps the connection, runs the server as a worker and swaps it when the server
/// binary changes. Ctrl-C stops it the way closing stdin does.
pub fn serve_command(servers: Vec<String>, server: Option<PathBuf>) -> i32 {
    let command = match resolve_server_binary(server) {
        Ok(command) => command,
        Err(error) => {
            eprintln!("mcpkit: cannot find the server binary: {error}");
            return 1;
        }
    };
    eprintln!(
        "mcpkit {}: supervising {}, it reloads when that binary is replaced",
        env!("CARGO_PKG_VERSION"),
        command.display()
    );
    let mut args = vec!["serve".to_string()];
    args.extend(servers);
    args.push(WORKER_FLAG.to_string());
    let launch = WorkerLaunch {
        command: command.clone(),
        args,
    };
    let runtime = match tokio::runtime::Builder::new_current_thread().enable_all().build() {
        Ok(runtime) => runtime,
        Err(error) => {
            eprintln!("mcpkit: cannot start the runtime: {error}");
            return 1;
        }
    };
    let code = runtime.block_on(async {
        let (stop_tx, stop) = oneshot::channel();
        tokio::spawn(async move {
            match tokio::signal::ctrl_c().await {
                Ok(()) => {
                    if stop_tx.send(()).is_err() {
                        eprintln!("mcpkit: interrupted after the supervisor ended");
                    }
                }
                Err(error) => eprintln!("mcpkit: cannot listen for Ctrl-C: {error}"),
            }
        });
        let options = SuperviseOptions {
            watch_path: Some(command),
            wire_log: Arc::new(WireLog::from_env(WireLogRole::Supervisor)),
            stop: Some(stop),
            ..SuperviseOptions::default()
        };
        supervise_serve(launch, options).await
    });
    runtime.shutdown_background();
    code
}
