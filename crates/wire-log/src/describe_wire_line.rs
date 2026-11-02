use serde_json::{Map, Value, json};

/// What the wire log keeps of one JSON-RPC line: its size, method and id, and the client's name on `initialize`.
pub fn describe_wire_line(line: &str) -> Value {
    let mut details = Map::new();
    details.insert("bytes".into(), json!(line.len()));
    let Ok(Value::Object(data)) = serde_json::from_str::<Value>(line) else {
        details.insert("parsed".into(), json!(false));
        return Value::Object(details);
    };
    if let Some(id) = data.get("id") {
        details.insert("id".into(), id.clone());
    }
    if let Some(Value::String(method)) = data.get("method") {
        details.insert("method".into(), json!(method));
    }
    if let Some(Value::Object(params)) = data.get("params") {
        if let Some(Value::Object(client_info)) = params.get("clientInfo") {
            details.insert("client".into(), client_info.get("name").cloned().unwrap_or(Value::Null));
        }
        if let Some(Value::String(name)) = params.get("name") {
            details.insert("tool".into(), json!(name));
        }
    }
    if data.contains_key("error") {
        details.insert("error".into(), json!(true));
    }
    Value::Object(details)
}

#[cfg(test)]
mod tests {
    use super::describe_wire_line;
    use serde_json::json;

    #[test]
    fn keeps_metadata_of_a_tool_call() {
        let line = r#"{"jsonrpc":"2.0","id":7,"method":"tools/call","params":{"name":"git_github","arguments":{"token":"x"}}}"#;

        assert_eq!(
            describe_wire_line(line),
            json!({ "bytes": line.len(), "id": 7, "method": "tools/call", "tool": "git_github" })
        );
    }

    #[test]
    fn names_the_client_on_initialize() {
        let line = r#"{"id":0,"method":"initialize","params":{"clientInfo":{"name":"claude-code"}}}"#;

        assert_eq!(describe_wire_line(line)["client"], json!("claude-code"));
    }

    #[test]
    fn marks_errors_and_unparsed_lines() {
        assert_eq!(describe_wire_line(r#"{"id":1,"error":{}}"#)["error"], json!(true));
        assert_eq!(describe_wire_line("not json"), json!({ "bytes": 8, "parsed": false }));
    }
}
