use serde_json::{Value, json};
use usemcpkit_registry::Fetch;
use usemcpkit_servers::mcp::McpServer;

/// The result of a `search` or `execute` call that runs `code`.
pub async fn run_code<F: Fetch + 'static>(server: &McpServer<F>, tool: &str, code: &str) -> Value {
    let message = json!({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "tools/call",
        "params": { "name": tool, "arguments": { "code": code } },
    });
    server.handle_line(&message.to_string()).await.response.unwrap()["result"].clone()
}
