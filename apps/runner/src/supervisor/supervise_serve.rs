use crate::supervisor::output_message::OutputMessage;
use crate::supervisor::supervise_options::SuperviseOptions;
use crate::supervisor::supervisor_event::SupervisorEvent;
use crate::supervisor::supervisor_state::SupervisorState;
use crate::supervisor::watch_binary_file::watch_binary_file;
use crate::supervisor::worker_launch::WorkerLaunch;
use crate::supervisor::write_output::write_output;
use tokio::io::{AsyncBufReadExt, AsyncRead, BufReader};
use tokio::sync::{mpsc, oneshot};

/// Owns the client's stdio and runs the real server as a child, swapping it when `watch_path` changes. Resolves to the
/// exit code of the current worker once it is gone and everything it printed has been written.
pub async fn supervise_serve(launch: WorkerLaunch, options: SuperviseOptions) -> i32 {
    let (events_tx, mut events) = mpsc::unbounded_channel();
    let (output_tx, output_rx) = mpsc::unbounded_channel();
    let writer = tokio::spawn(write_output(options.output, output_rx, options.wire_log.clone()));
    let watcher = match options.watch_path {
        Some(path) => match watch_binary_file(path.clone(), options.poll_interval, events_tx.clone()).await {
            Ok(watcher) => Some(watcher),
            Err(error) => {
                eprintln!("mcpkit: cannot read {}: {error}", path.display());
                return 1;
            }
        },
        None => None,
    };
    let mut supervisor =
        SupervisorState::start(launch, events_tx.clone(), output_tx.clone(), options.wire_log, watcher);
    tokio::spawn(read_client_input(options.input, events_tx.clone()));
    if let Some(stop) = options.stop {
        let events = events_tx.clone();
        tokio::spawn(async move {
            if stop.await.is_ok() && events.send(SupervisorEvent::ClientClosed).is_err() {
                eprintln!("mcpkit: stopped after the supervisor ended");
            }
        });
    }
    let code = loop {
        let Some(event) = events.recv().await else {
            break 1;
        };
        if let Some(code) = supervisor.handle(event) {
            break code;
        }
    };
    let (flushed_tx, flushed) = oneshot::channel();
    if output_tx.send(OutputMessage::Flush(flushed_tx)).is_ok() && flushed.await.is_err() {
        eprintln!("mcpkit: the client output closed before it was flushed");
    }
    drop(output_tx);
    drop(supervisor);
    writer.abort();
    code
}

async fn read_client_input(input: Box<dyn AsyncRead + Unpin + Send>, events: mpsc::UnboundedSender<SupervisorEvent>) {
    let mut lines = BufReader::new(input).lines();
    loop {
        match lines.next_line().await {
            Ok(Some(line)) => {
                if events.send(SupervisorEvent::ClientLine(line)).is_err() {
                    return;
                }
            }
            Ok(None) => break,
            Err(error) => {
                eprintln!("mcpkit: cannot read the client's input: {error}");
                break;
            }
        }
    }
    if events.send(SupervisorEvent::ClientClosed).is_err() {
        eprintln!("mcpkit: the client closed its input after the supervisor ended");
    }
}
