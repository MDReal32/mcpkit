use serde_json::Value;

/// The tools of one `tools/list` result as the upstream wrote them (none when it has no `tools` array), and the cursor
/// of the next page when there is one.
pub fn read_tool_page(result: Value) -> (Vec<Value>, Option<String>) {
    let Value::Object(mut page) = result else {
        return (Vec::new(), None);
    };
    let tools = match page.remove("tools") {
        Some(Value::Array(tools)) => tools,
        _ => Vec::new(),
    };
    let next_cursor = match page.remove("nextCursor") {
        Some(Value::String(cursor)) if !cursor.is_empty() => Some(cursor),
        _ => None,
    };
    (tools, next_cursor)
}
