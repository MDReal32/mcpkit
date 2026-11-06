use crate::mcp::mcp_server::McpServer;
use crate::mcp::stdio::read_line_text::read_line_text;
use crate::mcp::stdio::reap_finished_tasks::reap_finished_tasks;
use crate::mcp::stdio::rethrow_task_panic::rethrow_task_panic;
use crate::mcp::stdio::write_lines::write_lines;
use serde_json::json;
use std::rc::Rc;
use tokio::io::{AsyncBufReadExt, AsyncRead, AsyncWrite, BufReader};
use tokio::sync::mpsc;
use tokio::task::JoinSet;
use usemcpkit_registry::Fetch;
use usemcpkit_wire_log::{WireLog, describe_wire_line};

const WRITER_OUTLIVES_SENDERS: &str = "the writer runs until every sender is dropped";

/// Serves newline-delimited JSON-RPC until input closes; `output` carries protocol messages only. Each line is
/// answered on its own task, so a slow tool call never holds up a ping. Once input closed, the requests in flight are
/// answered before it returns. Runs its tasks with `spawn_local`, so it needs a `LocalSet`.
pub async fn serve_stdio<F, R, W>(
    server: Rc<McpServer<F>>,
    input: R,
    output: W,
    wire_log: Rc<WireLog>,
) -> Result<(), String>
where
    F: Fetch + 'static,
    R: AsyncRead + Unpin,
    W: AsyncWrite + Unpin + 'static,
{
    let (queue, outgoing) = mpsc::unbounded_channel();
    let writer = tokio::task::spawn_local(write_lines(output, outgoing, Rc::clone(&wire_log)));
    let mut tasks = JoinSet::new();
    let mut reader = BufReader::new(input);
    let mut buffer = Vec::new();
    let read = loop {
        buffer.clear();
        match reader.read_until(b'\n', &mut buffer).await {
            Ok(0) => break Ok(()),
            Ok(_) => {}
            Err(error) => break Err(format!("cannot read the client's input: {error}")),
        }
        let line = read_line_text(&buffer);
        wire_log.record("line-in", describe_wire_line(&line));
        reap_finished_tasks(&mut tasks);
        let server = Rc::clone(&server);
        let queue = queue.clone();
        tasks.spawn_local(async move {
            let handled = server.handle_line(&line).await;
            if let Some(response) = handled.response {
                queue.send(response.to_string()).expect(WRITER_OUTLIVES_SENDERS);
            }
        });
    };
    reap_finished_tasks(&mut tasks);
    wire_log.record("input-closed", json!({ "inFlight": tasks.len() }));
    while let Some(result) = tasks.join_next().await {
        rethrow_task_panic(result);
    }
    drop(queue);
    rethrow_task_panic(writer.await);
    read
}
