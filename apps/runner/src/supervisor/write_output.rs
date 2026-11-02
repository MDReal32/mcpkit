use crate::supervisor::output_message::OutputMessage;
use mcpkit_wire_log::{WireLog, describe_wire_line};
use serde_json::json;
use std::sync::Arc;
use tokio::io::{AsyncWrite, AsyncWriteExt};
use tokio::sync::mpsc;

/// The one writer of the client's stdout, so lines from the current and the retired workers never interleave.
pub async fn write_output(
    mut output: Box<dyn AsyncWrite + Unpin + Send>,
    mut messages: mpsc::UnboundedReceiver<OutputMessage>,
    wire_log: Arc<WireLog>,
) {
    while let Some(message) = messages.recv().await {
        match message {
            OutputMessage::Line(line) => {
                wire_log.record("forward-out", describe_wire_line(&line));
                let written = async {
                    output.write_all(line.as_bytes()).await?;
                    output.write_all(b"\n").await?;
                    output.flush().await
                };
                if let Err(error) = written.await {
                    wire_log.record("write-error", json!({ "message": error.to_string() }));
                }
            }
            OutputMessage::Flush(done) => {
                if let Err(error) = output.flush().await {
                    wire_log.record("write-error", json!({ "message": error.to_string() }));
                }
                if done.send(()).is_err() {
                    return;
                }
            }
        }
    }
}
