use crate::cli::consts::{EXIT_FAILURE, VERSION, WORKER_FLAG};
use crate::cli::run_local::run_local;
use crate::cli::serve::prepare_server_binary;
use crate::cli::update::{create_binary_context, start_auto_update, start_upgrade_schedule};
use crate::supervisor::{SuperviseOptions, WorkerLaunch, supervise_serve};
use std::path::PathBuf;
use std::sync::Arc;
use tokio::sync::oneshot;
use usemcpkit_wire_log::{WireLog, WireLogRole};

/// The process the client starts: it keeps the connection, runs the server as a worker and swaps it when the server
/// binary changes. Ctrl-C stops it the way closing stdin does.
pub fn serve_command(servers: Vec<String>, server: Option<PathBuf>) -> i32 {
    run_local(async move {
        let command = match prepare_server_binary(server).await {
            Ok(command) => command,
            Err(error) => {
                eprintln!("usemcpkit: {error}");
                return EXIT_FAILURE;
            }
        };
        eprintln!(
            "usemcpkit {VERSION}: supervising {}, it reloads when that binary is replaced",
            command.display()
        );
        match create_binary_context() {
            Ok(context) => {
                start_auto_update(context.clone());
                start_upgrade_schedule(context);
            }
            Err(error) => eprintln!("usemcpkit: no update checks: {error}"),
        }
        let mut args = vec!["serve".to_string()];
        args.extend(servers);
        args.push(WORKER_FLAG.to_string());
        let launch = WorkerLaunch {
            command: command.clone(),
            args,
            env: Vec::new(),
        };
        let (stop_tx, stop) = oneshot::channel();
        tokio::spawn(async move {
            match tokio::signal::ctrl_c().await {
                Ok(()) => {
                    if stop_tx.send(()).is_err() {
                        eprintln!("usemcpkit: interrupted after the supervisor ended");
                    }
                }
                Err(error) => eprintln!("usemcpkit: cannot listen for Ctrl-C: {error}"),
            }
        });
        let options = SuperviseOptions {
            watch_path: Some(command),
            wire_log: Arc::new(WireLog::from_env(WireLogRole::Supervisor)),
            stop: Some(stop),
            ..SuperviseOptions::default()
        };
        supervise_serve(launch, options).await
    })
}
