use crate::transport::pending_requests::PendingRequests;
use crate::upstream_error::UpstreamError;
use serde_json::Value;
use std::sync::Arc;
use tokio::io::{AsyncBufReadExt, BufReader};
use tokio::process::{Child, ChildStdout};
use tokio::sync::oneshot;

/// Settles replies line by line until the child exits, then fails whatever is still waiting with how it exited. A kill
/// asked for by `close` (or by dropping the transport) is honoured at any point, even while waiting for a child that
/// closed its stdout. Lines that are not JSON objects are skipped.
pub async fn read_until_exit(
    command: String,
    mut child: Child,
    stdout: ChildStdout,
    pending: Arc<PendingRequests>,
    mut killed: oneshot::Receiver<()>,
) {
    let mut lines = BufReader::new(stdout);
    let mut line = Vec::new();
    let mut reading = true;
    let reason = loop {
        line.clear();
        tokio::select! {
            read = lines.read_until(b'\n', &mut line), if reading => match read {
                Ok(0) => reading = false,
                Ok(_) => {
                    if let Ok(message @ Value::Object(_)) = serde_json::from_slice::<Value>(&line) {
                        pending.settle(&message);
                    }
                }
                Err(error) => break format!("reading from \"{command}\" failed: {error}"),
            },
            status = child.wait(), if !reading => break match status {
                Ok(status) => match status.code() {
                    Some(code) => format!("\"{command}\" exited with code {code}"),
                    None => format!("\"{command}\" exited with code unknown"),
                },
                Err(error) => format!("\"{command}\" could not be waited for: {error}"),
            },
            _ = &mut killed => break format!("\"{command}\" was stopped"),
        }
    };
    pending.close_with(UpstreamError::new(reason));
    if let Err(error) = child.kill().await {
        eprintln!("usemcpkit: could not stop \"{command}\": {error}");
    }
}
