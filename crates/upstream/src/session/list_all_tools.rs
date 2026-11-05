use crate::session::read_tool_page::read_tool_page;
use crate::transport::McpTransport;
use crate::upstream_error::UpstreamError;
use serde_json::{Value, json};

/// Every tool of every `tools/list` page, following `nextCursor`.
pub async fn list_all_tools(transport: &dyn McpTransport) -> Result<Vec<Value>, UpstreamError> {
    let mut tools = Vec::new();
    let mut cursor: Option<String> = None;
    loop {
        let params = match &cursor {
            Some(cursor) => json!({ "cursor": cursor }),
            None => json!({}),
        };
        let (page, next_cursor) = read_tool_page(transport.request("tools/list", Some(params)).await?);
        tools.extend(page);
        cursor = next_cursor;
        if cursor.is_none() {
            return Ok(tools);
        }
    }
}
