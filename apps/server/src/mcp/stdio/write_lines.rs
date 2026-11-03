use crate::mcp::stdio::outgoing_line::OutgoingLine;
use mcpkit_wire_log::{WireLog, describe_wire_line};
use serde_json::json;
use std::rc::Rc;
use tokio::io::{AsyncWrite, AsyncWriteExt};
use tokio::sync::mpsc::UnboundedReceiver;

/// The only writer of `output`, so lines never interleave and each one keeps the order it was queued in. A line that
/// cannot be written is recorded and the next one is still tried, as the client may only have been slow.
pub async fn write_lines<W: AsyncWrite + Unpin>(
    mut output: W,
    mut outgoing: UnboundedReceiver<OutgoingLine>,
    wire_log: Rc<WireLog>,
) {
    while let Some(OutgoingLine { text, event }) = outgoing.recv().await {
        wire_log.record(event, describe_wire_line(&text));
        let mut bytes = text.into_bytes();
        bytes.push(b'\n');
        let written = match output.write_all(&bytes).await {
            Ok(()) => output.flush().await,
            Err(error) => Err(error),
        };
        if let Err(error) = written {
            wire_log.record("write-error", json!({ "event": event, "message": error.to_string() }));
        }
    }
}
